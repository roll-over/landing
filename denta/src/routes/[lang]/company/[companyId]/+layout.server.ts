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

  const country = await _db.collection("countries").findOne(
    {
      id: infoCompany.country,
    },
    {
      projection: {
        _id: 0,
      },
    },
  );

  if (!country) {
    throw error(404, "Country not found");
  }

  const city = await _db.collection("cities").findOne(
    {
      id: infoCompany.city,
    },
    {
      projection: {
        _id: 0,
      },
    },
  );

  if (!city) {
    throw error(404, "City not found");
  }

  const { anotherCompanies, anotherInfoCompanies } = await getAnotherCompanies(
    infoCompany.country,
    infoCompany.city,
    infoCompany._id,
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

  const rating =
    Math.round((reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length) * 10) /
    10;

  const session = await event.locals.getSession();
  const userReview = session
    ? reviews.find((review) => review.email === session.user?.email && !review.entityId)?.reviewId
    : "";

  const allUserReviews = session
    ? reviews
        .filter((review) => review.email === session.user?.email)
        .map((review) => review.reviewId)
    : [];

  return {
    infoCompany,
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
