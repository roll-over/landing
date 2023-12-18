import db from "$lib/db";
import { error } from "@sveltejs/kit";
import translate from "translate";

export const getCountry = async (countryId: string, lang: string) => {
  const _db = await db();

  if (!_db) {
    throw new Error("DB not found");
  }

  const country = await _db.collection("countries").findOne(
    {
      id: countryId,
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

  if (country[lang]) {
    return country;
  }

  const translated = await translate(countryId, { from: "en", to: lang });

  await _db.collection("countries").updateOne(
    {
      id: countryId,
    },
    {
      $set: {
        [lang]: translated,
      },
    },
    {
      upsert: true,
    },
  );

  return {
    ...country,
    [lang]: translated,
  };
};

export const getCity = async (cityId: string, lang: string) => {
  const _db = await db();

  if (!_db) {
    throw new Error("DB not found");
  }

  const city = await _db.collection("cities").findOne(
    {
      id: cityId,
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

  if (city[lang]) {
    return city;
  }

  const translated = await translate(cityId, { from: "en", to: lang });

  await _db.collection("cities").updateOne(
    {
      id: cityId,
    },
    {
      $set: {
        [lang]: translated,
      },
    },
    {
      upsert: true,
    },
  );

  return {
    ...city,
    [lang]: translated,
  };
};
