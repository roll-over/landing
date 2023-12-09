import db from "$lib/db";

export const getAnotherCompanies = async (country, city, id) => {
  const countInPage = 5
  const anotherCompanies = await (
    await db()
  )
    .collection("companies")
    .find(
      {
        "mainAddress.country": country,
        "mainAddress.city": city,
        id: {
          $ne: id,
        },
      },
      {
        projection: {
          _id: 0,
        },
        limit: countInPage,
      },
    )
    .toArray();

  const anotherInfoCompanies = await (
    await db()
  )
    ?.collection("info-companies")
    ?.find(
      {
        country: country,
        city: city,
        _id: {
          $ne: id,
        },
        status: {
          $ne: "inactive",
        },
      },
      {
        projection: {},
        limit: countInPage - anotherCompanies.length,
      },
    )
    .toArray();

  return {
    anotherCompanies,
    anotherInfoCompanies,
  };
};
