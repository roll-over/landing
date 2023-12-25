import { appParams } from "$lib/app_name";

export const load = async (event) => {
  if (appParams.availabilities.articles === false) {
    throw new Error("Articles is not available");
  }
};
