import db from "$lib/db";
import { getAnotherCompanies } from "$lib/db/another-companies";

export const load = async (event) => {
  const infoCompany = await (await db()).collection("info-companies").findOne(
    {
      _id: event.params.companyId,
    },
    {
      projection: {},
    },
  );

  const country = await (await db()).collection("countries").findOne(
    {
      id: infoCompany.country,
    },
    {
      projection: {
        _id: 0,
      },
    },
  );

  const city = await (await db()).collection("cities").findOne(
    {
      id: infoCompany.city,
    },
    {
      projection: {
        _id: 0,
      },
    },
  );

  const { anotherCompanies, anotherInfoCompanies } = await getAnotherCompanies(
    infoCompany.country,
    infoCompany.city,
    infoCompany._id,
  );

  return {
    infoCompany,
    country: { label: country[event.params.lang], value: country.id },
    city: { label: city[event.params.lang], value: city.id },
    anotherCompanies,
    anotherInfoCompanies,
  };
};
