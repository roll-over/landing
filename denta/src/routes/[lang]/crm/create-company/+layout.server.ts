import db from "$lib/db";
import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
  const session = await event.locals.getSession();

  if(!session) {
    throw redirect(302, "/auth/signin");
  }

  const countries = (
    await (await db())
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

  return {
    countries: countries,

    lang: event.params.lang,
  };
};
