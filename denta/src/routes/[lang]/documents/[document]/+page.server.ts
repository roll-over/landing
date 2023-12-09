import { documents } from "$lib/assets/documents";
import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
  if (!documents.map((x) => x.id).includes(event.params.document)) {
    throw redirect(302, `/documents/`);
  }
};
