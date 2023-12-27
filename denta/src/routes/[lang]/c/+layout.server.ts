import { getAppParams } from "$lib/app_name";
import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
  if (!getAppParams().availabilities.publicPage) {
    throw redirect(301, `/${event.params.lang}/`);
  }
};
