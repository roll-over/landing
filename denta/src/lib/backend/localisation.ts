import translate from "translate";
import db from "$lib/db";

export const t = async (text: string, from: string, to: string) => {
  if (from === to) {
    return text;
  }
  const _db = await db();

  if (!_db) {
    throw new Error("DB not found");
  }

  const dbTranslate = await _db.collection("translate").findOne({
    [from]: text,
  });

  if (dbTranslate && dbTranslate[to]) {
    return dbTranslate[to];
  }

  let translated = "";
  let status = "ok";
  if (text.includes("\n")) {
    translated = (
      await Promise.all(
        text.split("\n").map(async (_t) => {
          if (!_t) {
            return _t;
          }
          return await t(_t, from, to);
        }),
      )
    ).join("\n");
    status = "group";
  } else {
    if (text.startsWith("# ")) {
      translated =
        "# " +
        (await translate(text.slice(2), { from, to }).catch((e) => {
          console.log(e, text, from, to);
          status = "error";
          return text;
        }));
    } else if (text.startsWith("## ")) {
      translated =
        "## " +
        (await translate(text.slice(3), { from, to }).catch((e) => {
          console.log(e, text, from, to);
          status = "error";
          return text;
        }));
    } else if (text.startsWith("### ")) {
      translated =
        "### " +
        (await translate(text.slice(4), { from, to }).catch((e) => {
          console.log(e, text, from, to);
          status = "error";
          return text;
        }));
    } else {
      translated = await translate(text, { from, to }).catch((e) => {
        console.log(e, text, from, to);
        status = "error";
        return text;
      });
    }
  }

  if (status === "error") {
    return text;
  }

  if (status === "group") {
    return translated;
  }

  await _db.collection("translate").updateOne(
    {
      [from]: text,
    },
    {
      $set: {
        [from]: text,
        [to]: translated,
      },
    },
    {
      upsert: true,
    },
  );

  return translated;
};
