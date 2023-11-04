export const load = async (event) => {
  try {
    return {
      session: await event.locals.getSession(),
    };
  } catch (error) {
    console.error(error);
  }
};
