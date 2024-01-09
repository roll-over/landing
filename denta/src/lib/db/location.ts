import db from "$lib/db";
import { makeTranscribationFromRuToEn } from "$lib/transcribation";

export const upsertCountry = async (_countryId, lang) => {
  const country = await (await db()).collection("countries").findOne({
    id: _countryId,
  });
  const countryId = country?.id || makeTranscribationFromRuToEn(_countryId);
  if (!country) {
    await (await db()).collection("countries").updateOne(
      {
        id: countryId,
      },
      {
        $set: {
          id: countryId,
          [lang]: country?.mainAddress.country || _countryId,
        },
      },
      {
        upsert: true,
      },
    );
  }
  return countryId;
};

export const upsertCity = async (_cityId, countryId, lang) => {
  const city = await (await db()).collection("cities").findOne({
    id: _cityId,
  });
  const cityId = city?.id || makeTranscribationFromRuToEn(_cityId);

  if (!city) {
    await (await db()).collection("cities").updateOne(
      {
        id: cityId,
        countryId: countryId,
      },
      {
        $set: {
          id: cityId,
          [lang]: _cityId,
          countryId: countryId,
        },
      },
      {
        upsert: true,
      },
    );
  }

  return cityId;
};
