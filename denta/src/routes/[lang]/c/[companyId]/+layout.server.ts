import db from "$lib/db";
import { getAnotherCompanies } from "$lib/db/another-companies";

export const load = async (event) => {
  const company = await (await db()).collection("companies").findOne(
    {
      id: event.params.companyId,
    },
    {
      projection: {
        _id: 0,
      },
    },
  );

  const country = await (await db()).collection("countries").findOne(
    {
      id: company.mainAddress.country,
    },
    {
      projection: {
        _id: 0,
      },
    },
  );

  const city = await (await db()).collection("cities").findOne(
    {
      id: company.mainAddress.city,
    },
    {
      projection: {
        _id: 0,
      },
    },
  );

  const { anotherCompanies, anotherInfoCompanies } = await getAnotherCompanies(
    company.mainAddress.country,
    company.mainAddress.city,
    company.id,
  );

  return {
    infoCompany: company,
    country: { label: country[event.params.lang], value: country.id },
    city: { label: city[event.params.lang], value: city.id },
    anotherCompanies,
    anotherInfoCompanies,
  };
};
