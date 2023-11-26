import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
  const langs = ["ru"];
  const lang = event.params.lang;
  if (!langs.includes(lang)) {
    throw redirect(302, "/");
  }

  if (event.url.pathname === `/${lang}/` || event.url.pathname === `/${lang}`) {
    throw redirect(302, `/${lang}/search`);
  }
};
