import { appParams } from "$lib/app_name";

export const load = async (event) => {
  if (appParams.availabilities.search === false) {
    throw new Error("Search is not available");
  }
};
