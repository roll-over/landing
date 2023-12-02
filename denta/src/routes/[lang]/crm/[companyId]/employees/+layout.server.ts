import db from "$lib/db";

export const load = async (event) => {
  const employees = await (await db())
    .collection("employees")
    .find(
      {
        companyId: event.params.companyId,
      },
      { projection: { _id: 0 } },
    )
    .toArray() || [];

  return {
    employees,
  };
};
