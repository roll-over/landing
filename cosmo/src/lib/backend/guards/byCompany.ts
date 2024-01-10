import db from "$lib/db";

export const isUsersCompany = async (companyId, session) => {
  const _db = await db();

  if (!_db) {
    throw new Error("No database connection");
  }

  const company = await _db.collection("companies").findOne(
    {
      id: companyId,
    },
    {
      projection: {
        _id: 0,
      },
    },
  );

  return company?.owner === session.user.email;
};

export const usersCompanyGuard = async (event) => {
  const session = await event.locals.getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  if (!(await isUsersCompany(event.params.companyId, session))) {
    throw new Error("Unauthorized");
  }
};
