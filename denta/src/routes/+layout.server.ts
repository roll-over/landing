import { isAdmin } from "$lib/backend/is-admin";
import { t } from "$lib/backend/localisation";
import db from "$lib/db";

const localisation = [
  "Система управления юридической компанией",
  "femida-crm - это система управления юридической компанией, которая позволяет вам управлять организацией, а также взаимодействовать с клиентами.",
  "femida-crm - это больше чем crm",
  "femida-crm - это еще и система создания сайтов для стоматологических клиник, которая позволяет вам создать сайт для вашей клиники, а также взаимодействовать с пациентами.",
] as const;

const localisationCache = {};

const getLocalisation = async (lang: string) => {
  if (localisationCache[lang]) {
    return localisationCache[lang];
  }
  const localisationArr = await Promise.all(
    localisation.map(async (item) => {
      return {
        [item]: await t(item, "ru", lang),
      };
    }),
  );
  const localisationObj = localisationArr.reduce((acc, item) => {
    return { ...acc, ...item };
  });
  localisationCache[lang] = localisationObj;
  return localisationObj;
};

const countriesCache = {};

const getCountriesAndCities = async (lang: string) => {
  if (countriesCache[lang]) {
    return countriesCache[lang];
  }

  const _db = await db();

  const countries =
    (await _db
      ?.collection("countries")
      .find(
        {},
        {
          projection: {
            _id: 0,
            id: 1,
            [lang]: 1,
          },
        },
      )
      .toArray()) || [];

  const cities =
    (await _db
      ?.collection("cities")
      .find(
        {},
        {
          projection: {
            _id: 0,
            id: 1,
            [lang]: 1,
          },
        },
      )
      .toArray()) || [];

  countriesCache[lang] = { countries, cities };

  return { countries, cities };
};

export const load = async (event) => {
  const { countries, cities } = await getCountriesAndCities(event.params.lang);

  try {
    const session = await event.locals.getSession();
    const _isAdmin = await isAdmin(session?.user);
    const usersCompanies = session?.user?.email
      ? (await (
          await db()
        )
          ?.collection("companies")
          .find(
            {
              owner: session?.user?.email,
            },
            {
              projection: {
                _id: 0,
                id: 1,
              },
            },
          )
          .toArray()) || []
      : [];

    const localisationObj = await getLocalisation(event.params.lang);

    return {
      session: session,
      isAdmin: _isAdmin,
      countries,
      cities,
      usersCompanies,
      localisation: localisationObj,
    };
  } catch (error) {
    console.error(error);
  }
};
