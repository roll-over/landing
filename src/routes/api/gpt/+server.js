import db from "$lib/db";
import { collections } from "$lib/collections";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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", // defaults to process.env["OPENAI_API_KEY"]
});
const system = `
Представь, что ты копирайтер, который помогает писать статьи для социальных сетей и сайта.

Команда называется red-flags и она занимается проверкой резюме и вакансий на предмет рисков и потенциальных проблем.

Тебе нужно писать в дружественном тоне, чтобы люди чувствовали себя комфортно и не уходили с сайта.
Тебе нужно чаще использовать синонимы и разные слова, чтобы текст не был однообразным.
Тебе нужно чаще использовать метафоры, чтобы люди легче понимали твои мысли.
Тебе нужно как приветствие 'Приветики!' - это фишка нашей команды.
Тебе нужно использовать парочку иконок, чтобы текст не был скучным, например для маркировки списков и важных пунктов.

Тебе нужно все переносы строк как '\n'
`;

const prompts = {
  "articles-redFlags-employee-cv": {
    header: `
    Представь, что ты копирайтер, который помогает придумывать названия статей для социальных сетей и сайта.
    
    Команда называется red-flags и она занимается проверкой резюме и вакансий на предмет рисков и потенциальных проблем.

    Тебе нужно предложить ровно один заголовок статьи, который будет привлекать внимание и будет соответствовать содержанию.

    Выдавай результат в виде json:
    {
        'title',
        'id',- это уникальный идентификатор статьи, который получется из транслита названия статьи, маленькими буквами и с нижними подчеркиваниями вместо пробелов.
    }
    `,
    article: system,
  },
};

export async function POST(event) {
  const artice = await event.request.json();

  const prompt = prompts[artice.group]?.[artice.type];
  if (!prompt) {
    return new Response("Not found", { status: 404 });
  }

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: prompt },
      { role: "user", content: artice.prompt },
    ],
    model: "gpt-3.5-turbo",
  });

  return new Response(chatCompletion.choices[0].message.content, {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
