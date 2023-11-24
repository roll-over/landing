import { useAdminGuard } from "$lib/guards/admin";
import { env } from "$env/dynamic/private";

export async function POST(event) {
  const result = await useAdminGuard(event);
  if (result) {
    return result;
  }

  const params = await event.request.json();

  return new Response(
    await fetch(
      `http://${env.DEV_MODE === "true" ? "preview_generator_dev" : "preview_generator"}:8000`,
      {
        method: "POST",
        body: JSON.stringify(params),
        headers: { "Content-Type": "application/json" },
      },
    ).then(async (res) => {
      return res.arrayBuffer();
    }),
    {
      headers: {
        "Content-Type": "image/png",
      },
    },
  );
}
