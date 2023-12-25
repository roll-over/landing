import db from "$lib/db";
import { getAvailableReceptionsLanguages } from "$lib/languages";
import type { Company } from "$lib/types/crm";

export const load = async (event) => {
  const session = await event.locals.getSession();

  const _db = await db();

  if (!_db) {
    throw new Error("No database connection");
  }

  const countries = (
    await _db
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

  const company = await _db.collection("companies").findOne(
    {
      owner: session.user.email,
      id: event.params.companyId,
    },
    { projection: { _id: 0 } },
  );

  if (!company) {
    throw new Error("Company not found");
  }

  const pickedCountry = countries.find((c) => c.value === company.mainAddress.country) || {};

  const cities = (
    await _db
      .collection("cities")
      .find(
        {
          countryId: company.mainAddress.country,
        },
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

  const pickedCity = cities.find((c) => c.value === company.mainAddress.city) || {};

  return {
    countries,
    country: pickedCountry,
    cities,
    city: pickedCity,
    company: {
      ...company,
      mainAddress: {
        ...company.mainAddress,
        country: pickedCountry.label,
        city: pickedCity.label,
      },
    },
    languages: await getAvailableReceptionsLanguages(event.params.lang),
  };
};
