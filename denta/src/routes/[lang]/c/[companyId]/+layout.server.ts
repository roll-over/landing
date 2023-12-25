import db from "$lib/db";
import { getAnotherCompanies } from "$lib/db/another-companies";
import { getAvailableReceptionsLanguages } from "$lib/languages";

export const load = async (event) => {
  const _db = await db();

  if (!_db) {
    throw new Error("No database connection");
  }

  const company = await _db.collection("companies").findOne(
    {
      id: event.params.companyId,
    },
    {
      projection: {
        _id: 0,
      },
    },
  );

  if (!company) {
    throw new Error("Company not found");
  }

  const country = await _db.collection("countries").findOne(
    {
      id: company.mainAddress.country,
    },
    {
      projection: {
        _id: 0,
      },
    },
  );

  if (!country) {
    throw new Error("Country not found");
  }

  const city = await _db.collection("cities").findOne(
    {
      id: company.mainAddress.city,
    },
    {
      projection: {
        _id: 0,
      },
    },
  );

  if (!city) {
    throw new Error("City not found");
  }

  const { anotherCompanies, anotherInfoCompanies } = await getAnotherCompanies(
    company.mainAddress.country,
    company.mainAddress.city,
    company.id,
    event.params.lang,
  );

  return {
    infoCompany: company,
    country: { label: country[event.params.lang], value: country.id },
    city: { label: city[event.params.lang], value: city.id },
    anotherCompanies,
    anotherInfoCompanies,
    languages: await getAvailableReceptionsLanguages(event.params.lang),
  };
};
