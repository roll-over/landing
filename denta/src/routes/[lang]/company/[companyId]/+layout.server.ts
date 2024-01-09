import { t } from "$lib/backend/localisation";
import { getCity, getCountry } from "$lib/backend/location";
import db from "$lib/db";
import { getAnotherCompanies } from "$lib/db/another-companies";
import { error } from "@sveltejs/kit";

export const load = async (event) => {
  const _db = await db();

  if (!_db) {
    throw error(500, "DB not found");
  }

  const infoCompany =
    (await _db.collection("info-companies").findOne(
      {
        publicId: event.params.companyId,
      },
      {
        projection: {},
      },
    )) ||
    (await _db.collection("info-companies").findOne(
      {
        _id: event.params.companyId,
      },
      {
        projection: {},
      },
    ));

  if (!infoCompany) {
    throw error(404, "Company not found");
  }

  if (infoCompany.status === "inactive") {
    throw error(404, "Company not found");
  }

  const country = await getCountry(infoCompany.country, event.params.lang);

  const city = await getCity(infoCompany.city, event.params.lang);

  const { anotherCompanies, anotherInfoCompanies } = await getAnotherCompanies(
    infoCompany.country,
    infoCompany.city,
    infoCompany._id,
    event.params.lang,
  );

  const reviews = await _db
    .collection("reviews")
    .find(
      {
        rootId: `company-${infoCompany._id}`,
      },
      {
        projection: {
          _id: 0,
        },
      },
    )
    .toArray();

  const rating = reviews.length
    ? Math.round((reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length) * 10) /
      10
    : 0;

  const session = await event.locals.getSession();
  const userReview = session
    ? reviews.find((review) => review.email === session.user?.email && !review.entityId)?.reviewId
    : "";

  const allUserReviews = session
    ? reviews
        .filter((review) => review.email === session.user?.email)
        .map((review) => review.reviewId)
    : [];

  await _db.collection("views").insertOne({
    type: "company",
    publicId: infoCompany.publicId || infoCompany._id,
    createdAt: new Date(),
    email: session?.user?.email,
  });

  const views = await _db.collection("views").countDocuments({
    type: "company",
    publicId: infoCompany.publicId || infoCompany._id,
  });

  await _db.collection("info-companies").updateOne(
    {
      _id: infoCompany._id,
    },
    {
      $set: {
        views,
      },
    },
  );

  return {
    infoCompany: {
      ...infoCompany,
      title: await t(infoCompany.title, infoCompany.lang || "ru", event.params.lang),
      description: await t(infoCompany.description, infoCompany.lang || "ru", event.params.lang),
      address: await t(infoCompany.address, infoCompany.lang || "ru", event.params.lang),
    },
    country: { label: country[event.params.lang], value: country.id },
    city: { label: city[event.params.lang], value: city.id },
    anotherCompanies,
    anotherInfoCompanies,
    reviews: reviews,
    rating: rating,
    userReview: userReview,
    allUserReviews: allUserReviews,
  };
};
