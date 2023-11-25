import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
  throw redirect(301, `/ru/crm/${event.params.companyId}/company`);
};
