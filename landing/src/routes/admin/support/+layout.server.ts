import db from "$lib/db";

export const load = async (event) => {
  const messages = await db()
    .collection("supportChat")
    .find({}, { projection: { _id: 0 }, sort: { date: 1 } })
    .toArray();

  const projectIds = Array.from(new Set(messages.map((message) => message.projectId)));
  const chatIds = Array.from(new Set(messages.map((message) => message.userId)));

  return {
    messages: messages,
    projectIds: projectIds,
    chatIds: chatIds,
  };
};
