export const load = async (event) => {
  const entities = await event
    .fetch(`/api/articles/simple-psychologist`)
    .then((res) => res.json())
    .then((res) => res?.filter((entity) => entity.status === "published"));
  return {
    entities: entities,
  };
};
