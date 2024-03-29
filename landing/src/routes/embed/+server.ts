import Widget from "./widget.js?raw";
import { env } from "$env/dynamic/private";

const localisation = {
  ru: {
    title: "Поддержка",
    widgetButton: "Помощь",
    newMessagePlaceholder: "Сообщение",
    sendMessageButton: "Отправить",
    greeting: "Привет! Тут пока нет сообщений.",
  },
};

export async function GET(event) {
  const project = event.url.searchParams.get("project");

  if (!project) {
    return new Response("No project", { status: 400 });
  }
  const lang = event.url.searchParams.get("lang");
  const WidgetFulled = `
let project = "${project}";
let lang = "${lang}";
let supportServer = "${
    env.DEV_MODE === "true" ? "http://localhost:5173" : "https://roll-over.org"
  }";

let localisation = ${JSON.stringify(localisation[lang])};

${Widget}`;

  return new Response(WidgetFulled, {
    headers: { "content-type": " application/javascript" },
  });
}
