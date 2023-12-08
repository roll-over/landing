import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
  throw redirect(302, `/ru/crm/${event.params.companyId}/company`);
};
