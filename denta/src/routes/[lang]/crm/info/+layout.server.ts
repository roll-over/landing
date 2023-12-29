import { getAppName } from "$lib/app_name";
import { t } from "$lib/backend/localisation";
import db from "$lib/db";
import DentaText1 from "./denta-text1.md?raw";
import DentaText2 from "./denta-text2.md?raw";
import DentaText3 from "./denta-text3.md?raw";

import FemidaText1 from "./femida-text1.md?raw";
import FemidaText2 from "./femida-text2.md?raw";
import FemidaText3 from "./femida-text3.md?raw";

export const load = async (event) => {
  const session = await event.locals.getSession();
  const _db = await db();

  if (!_db) {
    throw new Error("No db connection");
  }

  const companies = session
    ? await _db
        .collection("companies")
        .find(
          {
            owner: session.user.email,
          },
          { projection: { _id: 0 } },
        )
        .toArray()
    : [];

  const appName = getAppName();

  const text = {
    denta: [DentaText1, DentaText2, DentaText3],
    femida: [FemidaText1, FemidaText2, FemidaText3],
  }[appName];

  return {
    companies: companies,
    texts: Promise.all(
      text.map(async (_t) => {
        return await t(_t, "ru", event.params.lang);
      }),
    ),
  };
};
