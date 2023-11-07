export const load = async (event) => {
  const entities = await event
    .fetch("/api/articles/hide-hire")
    .then((res) => res.json());
  return {
    entities: entities,
  };
};
