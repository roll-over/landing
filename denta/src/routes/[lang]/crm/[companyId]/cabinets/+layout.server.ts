import db from "$lib/db";

export const load = async (event) => {
  const cabinets = await db()
    .collection("cabinets")
    .find(
      {
        companyId: event.params.companyId,
      },
      { projection: { _id: 0 } },
    )
    .toArray() || [];

  return {
    cabinets,
  };
};
