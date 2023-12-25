import { appParams } from "$lib/app_name";
import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
  if (!appParams.availabilities.publicPage) {
    throw redirect(301, `/${event.params.lang}/`);
  }
};
