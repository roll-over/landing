import { t } from "$lib/backend/localisation";
import Page from "./about-page.md?raw";

export const load = async (event) => {
  return {
    source: await t(Page, "ru", event.params.lang),
  };
};
