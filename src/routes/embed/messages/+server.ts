import db from "$lib/db";

import jwt from "jsonwebtoken";

const defaultMessages = {
  ru: [{ type: "text", text: "Здравствуйте! Чем могу помочь?", author: "bot" }],
  en: [{ type: "text", text: "Hello! How can I help?", author: "bot" }],
};

export async function GET(event) {
  const lang = event.url.searchParams.get("lang") || "en";
  const project = event.url.searchParams.get("project");

  const userCookie = event.url.searchParams.get("token");
  const userId = userCookie && userCookie !== "null" ? jwt.verify(userCookie, "secret") : "";
  if (!userId || !project) {
    return new Response(JSON.stringify(defaultMessages[lang]), {
      headers: { "content-type": "application/json" },
    });
  }

  const messages = await db
    .collection("supportChat")
    .find(
      { projectId: project, userId: userId },
      { projection: { _id: 0, projectId: 0, userId: 0 }, sort: { date: 1 } },
    )
    .toArray();

  return new Response(
    JSON.stringify(
      messages.length ? [...defaultMessages[lang], ...messages] : defaultMessages[lang],
    ),
    {
      headers: { "content-type": "application/json" },
    },
  );
}

export async function POST(event) {
  const project = event.url.searchParams.get("project");
  if (!project) {
    return new Response("No project", { status: 400 });
  }
  const body = await event.request.json();

  const message = body.message;
  const userCookie = message.token || jwt.sign(Math.random().toString(36).substring(7), "secret");

  const userId = jwt.verify(userCookie, "secret");

  if (!message) {
    return new Response("No message", { status: 400 });
  }

  await db.collection("supportChat").insertOne({
    projectId: project,
    userId: userId,
    ...message,
    date: new Date(),
    author: "user",
  });

  await db.collection("supportChat").insertOne({
    projectId: project,
    userId: userId,
    type: "text",
    text: "Спасибо за обращение! Оператор ответит вам в ближайшее время.",
    author: "bot",
    date: new Date(),
  });

  return new Response(
    JSON.stringify({
      userChatToken: userCookie,
    }),
    {
      headers: {
        "content-type": "application/json",
        "Set-Cookie": `supportChat=${userCookie}; Secure; Max-Age=604800; Secure;`,
      },
    },
  );
}
