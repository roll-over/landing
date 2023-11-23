export const load = async (event) => {
  const entities = await event.fetch("/api/articles/hikkithon").then((res) => res.json());
  return {
    entities: entities,
  };
};
