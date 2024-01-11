export const load = async (event) => {
  try {
    const session = await event.locals.getSession();

    return {
      session: session,
    };
  } catch (error) {
    console.error(error);
  }
};
