import { getAppParams } from "$lib/app_name";

export const load = async (event) => {
  if (getAppParams().availabilities.articles === false) {
    throw new Error("Articles is not available");
  }
};
