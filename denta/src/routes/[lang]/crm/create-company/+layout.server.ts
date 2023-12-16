import db from "$lib/db";

export const load = async (event) => {
  const countries = (
    await (
      await db()
    )
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
