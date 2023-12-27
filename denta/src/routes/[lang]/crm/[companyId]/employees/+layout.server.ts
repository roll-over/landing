import { getAppParams } from "$lib/app_name";
import db from "$lib/db";
import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
  if (!getAppParams().availabilities.employees) {
    throw redirect(301, `/${event.params.lang}/crm/`);
  }

  const _db = await db();

  if (!_db) {
    throw new Error("No database connection");
  }

  const employees =
    (await _db
      .collection("employees")
      .find(
        {
          companyId: event.params.companyId,
        },
        { projection: { _id: 0 } },
      )
      .toArray()) || [];

  return {
    employees,
  };
};
