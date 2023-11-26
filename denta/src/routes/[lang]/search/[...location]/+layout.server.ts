import db from "$lib/db";
import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
  const cabinets = await db()
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
  const [country, city] = event.params.location.split("/");

  const pickedCountry = countries.find((c) => c.value === country);

  if (!pickedCountry) {
    throw redirect(302, `/${event.params.lang}/search/${decodeURIComponent(countries[0].value)}`);
  }

  const cities = (
    await db()
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

  return {
    cabinets,
    countries,
    country: pickedCountry,
    cities,
    city: pickedCity,
    lang: event.params.lang,
  };
};
