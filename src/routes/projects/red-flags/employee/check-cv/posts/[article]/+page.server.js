export const load = async (event) => {
  const entities = await event
    .fetch("/api/articles/articles-redFlags-employee-cv")
    .then((res) => res.json());
  return {
    entities: entities,
  };
};
