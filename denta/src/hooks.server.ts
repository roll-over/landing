import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import { env } from "$env/dynamic/private";
import { startMongo } from "$lib/db";
import type { Handle } from "@sveltejs/kit";
import { APP_NAME } from "$lib/app_name";

const _svelteHandle = SvelteKitAuth({
  trustHost: true,
  providers: [Google({ clientId: env.GOOGLE_ID, clientSecret: env.GOOGLE_SECRET })],
});

const svelteHandle = async ({ resolve, event }) => {
  const lang = event.url.pathname.startsWith("/ru") ? "ru" : "en";

  const authOptions = await _svelteHandle({
    resolve: () =>
      resolve(event, {
        transformPageChunk: ({ html }) => {
          html = html.replace("%lang%", lang);

          if (APP_NAME === "denta") {
            html = html.replace("%variables%", "/denta-variables.css");
          } else if (APP_NAME === "femida") {
            html = html.replace("%variables%", "/femida-variables.css");
          }
          return html;
        },
      }),
    event,
  });
  return authOptions;
};

export const handle: Handle = async ({ resolve, event }) => {
  if (event.url.pathname === "//") {
    return new Response(null, {
      headers: {
        Location: event.url.origin + "/",
      },
      status: 301,
    });
  }

  if (event.url.pathname === "/") {
    return new Response(null, {
      headers: {
        Location: event.url.origin + "/ru",
      },
      status: 302,
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

  if (
    event.url.pathname.startsWith("/auth/callback/google") ||
    (event.url.pathname.startsWith("/auth/signout") && event.request.method === "POST")
  ) {
    return new Response(null, {
      headers: {
        Location: event.url.origin + "/auth-callback",
        "Set-Cookie": response.headers.get("Set-Cookie") || "",
      },
      status: 302,
    });
  }

  return response;
};

startMongo()
  .then(() => {})
  .catch((e) => {
    console.error(e);
  });
