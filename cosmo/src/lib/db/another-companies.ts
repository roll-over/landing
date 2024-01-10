import { t } from "$lib/backend/localisation";
import db from "$lib/db";
import { error } from "@sveltejs/kit";

export const getAnotherCompanies = async (country, city, id, lang) => {
  const _db = await db();

  if (!_db) {
    throw error(500, "DB not found");
  }
  const countInPage = 5;
  const anotherCompanies = await _db
    .collection("companies")
    .find(
      {
        "mainAddress.country": country,
        "mainAddress.city": city,
        id: {
          $ne: id,
        },
      },
      {
        projection: {
          _id: 0,
        },
        limit: countInPage,
      },
    )
    .toArray();

  const anotherInfoCompanies = await _db
    .collection("info-companies")
    .find(
      {
        country: country,
        city: city,
        _id: {
          $ne: id,
        },
        status: {
          $ne: "inactive",
        },
      },
      {
        projection: {},
        limit: countInPage - anotherCompanies.length,
      },
    )
    .toArray();

  return {
    anotherCompanies: await Promise.all(
      anotherCompanies.map(async (company) => {
        return {
          ...company,
          name: await t(company.name, company.lang || "ru", lang),
          address: {
            ...company.address,
            street: await t(company.address.street, company.lang || "ru", lang),
          },
        };
      }),
    ),
    anotherInfoCompanies: await Promise.all(
      anotherInfoCompanies.map(async (infoCompany) => {
        return {
          ...infoCompany,
          title: await t(infoCompany.title, infoCompany.lang || "ru", lang),
          address: await t(infoCompany.address, infoCompany.lang || "ru", lang),
        };
      }),
    ),
  };
};
