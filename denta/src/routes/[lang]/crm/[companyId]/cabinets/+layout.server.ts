import { appParams } from "$lib/app_name";
import db from "$lib/db";
import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
  if (!appParams.availabilities.cabinets) {
    throw redirect(301, `/${event.params.lang}/crm/`);
  }

  const _db = await db();

  if (!_db) {
    throw new Error("No database connection");
  }
  const cabinets =
    (await _db
      .collection("cabinets")
      .find(
        {
          companyId: event.params.companyId,
        },
        { projection: { _id: 0 } },
      )
      .toArray()) || [];

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

  const cities = (
    await _db
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
