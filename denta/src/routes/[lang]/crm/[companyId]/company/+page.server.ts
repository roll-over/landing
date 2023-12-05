import db from "$lib/db";
import { availableLanguages } from "$lib/languages";
import type { Company } from "$lib/types/crm";

export const load = async (event) => {
  const session = await event.locals.getSession();
  const countries = (
    await (
      await db()
    )
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

  const company = (await (await db()).collection("companies").findOne(
    {
      owner: session.user.email,
      id: event.params.companyId,
    },
    { projection: { _id: 0 } },
  )) as Company;

  const pickedCountry = countries.find((c) => c.value === company.mainAddress.country) || {};

  const cities = (
    await (
      await db()
    )
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
    languages: availableLanguages,
  };
};
