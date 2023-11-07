import { isAdmin } from "$lib/backend/is-admin";

export const load = async (event) => {
  try {
    return {
      session: await event.locals.getSession(),
      isAdmin: await isAdmin((await event.locals.getSession())?.user),
    };
  } catch (error) {
    console.error(error);
  }
};
