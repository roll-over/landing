import { t } from "$lib/backend/localisation";
import db from "$lib/db";
import { error, redirect } from "@sveltejs/kit";

export const load = async (event) => {
  const _db = await db();

  if (!_db) {
    throw error(500, "DB not found");
  }

  const cabinets = await _db
    .collection("cabinets")
    .find(
      {},
      {
        projection: {
          _id: 0,
          address: 1,
        },
      },
    )
    .toArray();

  const countries = (
    await _db
      .collection("countries")
      .find(
        {
          searchHidden: { $ne: true },
        },
        {
          projection: {
            _id: 0,
            id: 1,
            [event.params.lang]: 1,
          },
          sort: {
            priority: -1,
          },
        },
      )
      .toArray()
  ).map((country) => ({
    value: country.id,
    label: country[event.params.lang] || country.id,
  }));

  const [country, city] = event.params.location.split("/");

  const pickedCountry = countries.find((c) => c.value === country);

  if (!pickedCountry) {
    throw redirect(302, `/${event.params.lang}/search/${decodeURIComponent(countries[0].value)}`);
  }

  const cities = (
    await _db
      .collection("cities")
      .find(
        {
          countryId: pickedCountry.value,
        },
        {
          projection: {
            _id: 0,
            id: 1,
            [event.params.lang]: 1,
          },
          sort: {
            priority: -1,
          },
        },
      )
      .toArray()
  ).map((city) => ({
    value: city.id,
    label: city[event.params.lang] || city.id,
  }));

  const pickedCity = cities.find((c) => c.value === city);

  if (!pickedCity) {
    throw redirect(302, `/${event.params.lang}/search/${pickedCountry.value}/${cities[0].value}`);
  }

  const infoCompanies = await _db
    .collection("info-companies")
    .find(
      {
        country: pickedCountry.value,
        city: pickedCity.value,
        status: {
          $ne: "inactive",
        },
      },
      {
        projection: {},
        sort: {
          views: -1,
        },
      },
    )
    .toArray();

  if (infoCompanies) {
    return {
      type: "info-companies",
      cabinets,
      countries,
      country: pickedCountry,
      cities,
      city: pickedCity,
      lang: event.params.lang,
      infoCompanies: await Promise.all(
        infoCompanies.map(async (infoCompany) => {
          return {
            ...infoCompany,
            title: await t(infoCompany.title, infoCompany.lang || "ru", event.params.lang),
            address: await t(infoCompany.address, infoCompany.lang || "ru", event.params.lang),
          };
        }),
      ),
    };
  }
};
