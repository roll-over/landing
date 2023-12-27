import { getAppParams } from "$lib/app_name";

export const load = async (event) => {
  if (getAppParams().availabilities.search === false) {
    throw new Error("Search is not available");
  }
};
