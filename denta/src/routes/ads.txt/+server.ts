import { text } from "@sveltejs/kit";
import { getAppName } from "$lib/app_name";

const ads = {
  denta: `
  google.com, pub-2885195465461387, DIRECT, f08c47fec0942fa0
  `,
  femida: "",
};

export const GET = async (request) => {
  return text(ads[getAppName()], {
    headers: {
      "content-type": "plain/text",
    },
  });
};
