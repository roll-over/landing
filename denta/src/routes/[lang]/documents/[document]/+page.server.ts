import { documents } from "$lib/assets/documents";
import { t } from "$lib/backend/localisation";
import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
  if (!documents.map((x) => x.id).includes(event.params.document)) {
    throw redirect(302, `/documents/`);
  }

  return {
    documents: await Promise.all(
      documents.map(async (document) => ({
        ...document,
        label: await t(document.label, "en", event.params.lang),
      })),
    ),
  };
};
