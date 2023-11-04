import { collections } from "$lib/collections";

export const load = async (event) => {
  const collection = event.params.group;

  const allCollections = Object.keys(collections);

  if (!allCollections.includes(collection)) {
    throw new Error(`Not found: ${collection} in ${allCollections}`);
  }
  const entities = await event
    .fetch("/api/articles/" + collection)
    .then((res) => res.json());

  return {
    entities: entities,
  };
};
