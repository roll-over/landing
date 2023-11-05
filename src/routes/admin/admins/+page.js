import { collections } from "$lib/collections";

export const load = async (event) => {
  const entities = await event.fetch("/api/admins").then((res) => res.json());
  return {
    entities: entities,
  };
};
