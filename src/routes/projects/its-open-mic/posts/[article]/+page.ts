export const load = async (event) => {
  const entities = await event.fetch("/api/articles/its-open-mic").then((res) => res.json());
  return {
    entities: entities,
  };
};
