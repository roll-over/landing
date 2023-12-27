import { getMinioClient } from "$lib/backend/minio";
import { json } from "@sveltejs/kit";
import { Readable } from "stream";
import type { RequestHandler } from "./$types";

export const GET = async (event) => {
  const file = await getMinioClient().getObject("femida-documents", "circle_PNG50.png");

  return new Response(file, {
    headers: {
      "Content-Type": "image/png",
    },
  });
};

const fileToStream = async (file: File) => {
  return file.arrayBuffer().then((buffer) => {
    const readable = new Readable();
    readable.push(Buffer.from(buffer));
    readable.push(null);
    return readable;
  });
};

export const POST: RequestHandler = async (event) => {
  const file = (await event.request.formData()).get("file");

  if (!file || !(file instanceof File)) {
    return json({ status: "error" });
  }

  const fileName = `${event.params.companyId}/documents/${file.name}`;

  await getMinioClient().putObject("femida", fileName, await fileToStream(file));

  return json({ status: "ok", fileName: fileName });
};
