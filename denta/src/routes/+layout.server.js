import { isAdmin } from "$lib/backend/is-admin";
import db from "$lib/db";

export const load = async (event) => {
  const countries =
    (await db()
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
    (await db()
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
    return {
      session: await event.locals.getSession(),
      isAdmin: await isAdmin((await event.locals.getSession())?.user),
      countries,
      cities,
    };
  } catch (error) {
    console.error(error);
  }
};
