import { openai } from "$lib/backend/openai";
import db from "$lib/db";
import { useAdminGuard } from "$lib/guards/admin";
import { error, json } from "@sveltejs/kit";
import { getSubtitles } from "youtube-captions-scraper";

const to2Digits = (num) => {
  return num < 10 ? "0" + num : num;
};

const getSRTFromSeconds = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const secs = Math.floor(seconds - hours * 3600 - minutes * 60);
  const ms = Math.floor((seconds - hours * 3600 - minutes * 60 - secs) * 1000);
  return `${to2Digits(hours)}:${to2Digits(minutes)}:${to2Digits(secs)},${ms}`;
};

const convertToSrt = (captions) => {
  let srt = "";
  let i = 1;
  for (const caption of captions) {
    srt += `${i + 1}\n`;
    srt += `${getSRTFromSeconds(caption.start)} --> ${getSRTFromSeconds(
      parseFloat(caption.start) + parseFloat(caption.dur),
    )}\n`;
    srt += `${caption.text}\n\n`;
    i++;
  }
  return srt;
};

export const GET = async (event) => {
  const result = await useAdminGuard(event);
  if (result) {
    return result;
  }

  if (!["ru", "en"].includes(event.params.lang)) {
    return error(404, "Not found");
  }

  const _db = await db();

  const main = async (record, videoId, lang, limit: number | null) => {
    if (!record.srt) {
      await getSubtitles({
        videoID: videoId,
        lang: lang,
      }).then(async (captions) => {
        const srt = convertToSrt(captions);
        await _db.collection("timecodes").updateOne(
          {
            videoId: videoId,
            lang: lang,
          },
          {
            $set: {
              srt: srt,
            },
          },
          { upsert: true },
        );

        record.srt = srt;
      });
    }

    if (!record.timecodes) {
      const a = record.srt;

      const b = a.split("\n\n").map((i) => {
        if (i.length === 0) {
          return;
        }
        const [number, time, ...text] = i.split("\n");
        const [start, end] = time.split(" --> ").map((j) => j.split(",")[0]);
        return {
          number,
          start,
          end,
          text: text.join("\n"),
        };
      });

      let i = 0;

      const grouped: {
        number: string;
        start: string;
        end: string;
        text: string;
      }[] = [];
      while (i < b.length) {
        const group = b.slice(i, i + 20).filter((i) => i);
        grouped.push(group);
        i += 20;
      }

      const filter = async (line) => {
        const lineFromDb = await _db.collection("timecodes-cache").findOne(
          {
            line: line,
          },
          { projection: { _id: 0 } },
        );

        if (lineFromDb) {
          return lineFromDb.result;
        }

        const system = {
          ru: `
  Представь, что ты профессиональный редактор описаний и тебе нужно отредактировать описания для видео.  
  Верни только одну строку в формате:
  Заголовок (Основной смысл отрезка видео, очень кратко и информативно)
  Не более 10 символов.
  Строка должна быть без ковычек.
  Если ты не можешь придумать заголовок, то просто верни пустую строку.
  
  `,
          en: `
  Imagine you are a professional editor of descriptions and you need to edit descriptions for videos.
  Return only one line in the format:
  Title (The main meaning of the video segment, very briefly and informatively)
  No more than 10 characters.
  The line must be without quotes.
  If you can't come up with a title, just return an empty line.
  `,
        }[lang];

        const chatCompletion = await openai.chat.completions.create({
          messages: [
            { role: "system", content: system },
            { role: "user", content: line },
          ],
          model: "gpt-4",
        });

        await _db.collection("timecodes-cache").updateOne(
          {
            line: line,
          },
          {
            $set: {
              line: line,
              result: chatCompletion.choices[0].message.content,
            },
          },
          { upsert: true },
        );

        return chatCompletion.choices[0].message.content;
      };

      const result: string[] = [];
      for await (const i of grouped) {
        const item =
          `${i[0].start} - ` +
          (await filter(
            i
              .filter((x) => x)
              .map((j) => `${j.text}`)
              .join("\n"),
          ));
        result.push(item);
      }

      await _db.collection("timecodes").updateOne(
        {
          videoId: videoId,
          lang: lang,
        },
        {
          $set: {
            timecodes: result,
          },
        },
        { upsert: true },
      );
    }

    const _record = await _db.collection("timecodes").findOne(
      {
        videoId: event.params.videoId,
        lang: event.params.lang,
      },
      { projection: { _id: 0 } },
    );

    return _record;
  };

  const record = await _db.collection("timecodes").findOne(
    {
      videoId: event.params.videoId,
      lang: event.params.lang,
    },
    { projection: { _id: 0 } },
  );

  if (record && record.timecodes && record.csr) {
    return json(record);
  }

  if (!record) {
    return json(
      await main(
        {
          videoId: event.params.videoId,
          lang: event.params.lang,
        },
        event.params.videoId,
        event.params.lang,
        null,
      ),
    );
  } else {
    return json(await main(record, event.params.videoId, event.params.lang, null));
  }
};
