import { isAdmin } from "$lib/backend/is-admin";

export const useAdminGuard = async (event) => {
  const session = await event.locals.getSession();
  if (!session?.user) {
    return new Response("Not logged in", {
      status: 401,
    });
  }

  if (!(await isAdmin(session.user))) {
    return new Response("Not logged in", {
      status: 401,
    });
  }
};
