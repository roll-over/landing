export const load = async (event) => {
  const entities = await event.fetch("/api/articles/simple-psychologist").then((res) => res.json());
  return {
    entities: entities,
  };
};
