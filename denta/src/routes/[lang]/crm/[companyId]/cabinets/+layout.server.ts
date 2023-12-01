import db from "$lib/db";

export const load = async (event) => {
  const cabinets =
    (await db()
      .collection("cabinets")
      .find(
        {
          companyId: event.params.companyId,
        },
        { projection: { _id: 0 } },
      )
      .toArray()) || [];

  const countries = (
    await db()
      .collection("countries")
      .find(
        {},
        {
          projection: {
            _id: 0,
            id: 1,
            [event.params.lang]: 1,
          },
        },
      )
      .toArray()
  ).map((country) => ({
    value: country.id,
    label: country[event.params.lang] || country.id,
  }));

  const cities = (
    await db()
      .collection("cities")
      .find(
        {},
        {
          projection: {
            _id: 0,
            id: 1,
            [event.params.lang]: 1,
            countryId: 1,
          },
        },
      )
      .toArray()
  ).map((city) => ({
    value: city.id,
    label: city[event.params.lang] || city.id,
    countryId: city.countryId,
  }));

  return {
    cabinets,
    countries,
    cities,
  };
};
