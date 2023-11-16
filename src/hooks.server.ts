import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import { GOOGLE_ID, GOOGLE_SECRET } from "$env/static/private";
import { startMongo } from "$lib/db";
import type { Handle } from "@sveltejs/kit";

const svelteHandle = SvelteKitAuth({
  trustHost: true,
  providers: [Google({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET })],
});

export const handle: Handle = async ({ resolve, event }) => {
  if (event.url.pathname === "//") {
    console.log(event.url);
    return new Response(null, {
      headers: {
        Location: event.url.origin + "/",
      },
      status: 301,
    });
  }

  if (event.url.pathname.startsWith("/embed")) {
    if (event.request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
      });
    }
  }
  const response = await svelteHandle({ resolve, event });

  if (event.url.pathname.startsWith("/embed")) {
    response.headers.append("Access-Control-Allow-Origin", `*`);
  }

  return response;
};

startMongo()
  .then(() => {
    console.log("Mongo started");
  })
  .catch((e) => {
    console.error(e);
  });
