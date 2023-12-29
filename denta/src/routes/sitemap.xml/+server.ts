import { text } from "@sveltejs/kit";
import denta from "./denta.xml?raw";
import femida from "./femida.xml?raw";
import { getAppName } from "$lib/app_name";

const sitemaps = {
  denta,
  femida,
};

export const GET = async (request) => {
  return text(sitemaps[getAppName()], {
    headers: {
      "content-type": "application/xml",
    },
  });
};
