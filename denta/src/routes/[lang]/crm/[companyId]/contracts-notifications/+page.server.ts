import db from "$lib/db";

export const load = async (event) => {
  const _db = await db();

  if (!_db) {
    throw new Error("No database connection");
  }

  const contractsNotifications = await _db
    .collection("contracts-notifications")
    .find(
      {
        companyId: event.params.companyId,
      },
      {
        projection: {
          _id: 0,
        },
      },
    )
    .toArray();

  return {
    contractsNotifications,
  };
};
