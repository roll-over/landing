import { isAdmin } from "$lib/backend/is-admin";
import db from "$lib/db";

export const load = async (event) => {
  const countries =
    (await (
      await db()
    )
      ?.collection("countries")
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
      .toArray()) || [];

  const cities =
    (await (
      await db()
    )
      ?.collection("cities")
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
      .toArray()) || [];

  try {
    const usersCompanies =
      (await (
        await db()
      )
        ?.collection("companies")
        .find(
          {
            owner: (await event.locals.getSession())?.user?.email,
          },
          {
            projection: {
              _id: 0,
              id: 1,
            },
          },
        )
        .toArray()) || [];

        return {
      session: await event.locals.getSession(),
      isAdmin: await isAdmin((await event.locals.getSession())?.user),
      countries,
      cities,
      usersCompanies,
    };
  } catch (error) {
    console.error(error);
  }
};
