import db from "$lib/db";

export const load = async (event) => {
  const infoCompany = await db()
    .collection("info-companies")
    .findOne(
      {
        _id: event.params.companyId,
      },
      {
        projection: {
          _id: 0,
        },
      },
    );

  const country = await db()
    .collection("countries")
    .findOne(
      {
        id: infoCompany.country,
      },
      {
        projection: {
          _id: 0,
        },
      },
    );

  const city = await db()
    .collection("cities")
    .findOne(
      {
        id: infoCompany.city,
      },
      {
        projection: {
          _id: 0,
        },
      },
    );

  const anotherCompanies = await db()
    .collection("info-companies")
    .find(
      {
        country: infoCompany.country,
        city: infoCompany.city,
        _id: {
          $ne: infoCompany._id,
        },
      },
      {
        projection: {},
        limit: 10,
      },
    )
    .toArray();

  return {
    infoCompany,
    country: { label: country[event.params.lang], value: country.id },
    city,
    anotherCompanies,
  };
};
