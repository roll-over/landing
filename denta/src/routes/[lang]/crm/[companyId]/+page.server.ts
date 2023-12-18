import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
  throw redirect(302, `/${event.params.lang}/crm/${event.params.companyId}/company`);
};
