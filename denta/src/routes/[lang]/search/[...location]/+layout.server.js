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

  const countries = [
    ...new Set(cabinets.map((cabinet) => cabinet.address.country).filter(Boolean)),
  ];

  const [country, city] = event.params.location.split("/");

  if (!country || !countries.includes(country)) {
    console.log("redirecting to", `/${event.params.lang}/search/${countries[0]}`);
    console.log(event.params);
    console.log(!country, !countries.includes(country));
    throw redirect(302, `/${event.params.lang}/search/${decodeURIComponent(countries[0])}`);
  }

  const cities = [
    ...new Set(
      cabinets
        .filter((cabinet) => cabinet.address.country === country)
        .map((cabinet) => cabinet.address.city)
        .filter(Boolean),
    ),
  ];

  if (!city || !cities.includes(city)) {
    console.log("redirecting to", `/${event.params.lang}/search/${country}/${cities[0]}`);
    console.log(!city, !cities.includes(city));
    throw redirect(302, `/${event.params.lang}/search/${country}/${cities[0]}`);
  }

  return {
    cabinets,
    countries: countries.map((country) => ({
      value: country,
      label: country,
    })),
    country: {
      value: country,
      label: country,
    },
    cities: cities.map((city) => ({
      value: city,
      label: city,
    })),
    city: {
      value: city,
      label: city,
    },
    lang: event.params.lang,
  };
};
