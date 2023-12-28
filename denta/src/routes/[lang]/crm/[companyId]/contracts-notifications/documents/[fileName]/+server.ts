import { usersCompanyGuard } from "$lib/backend/guards/byCompany";
import { getMinioClient } from "$lib/backend/minio";

export const GET = async (event) => {
  await usersCompanyGuard(event);

  const file = await getMinioClient().getObject(
    "femida",
    decodeURIComponent(event.params.fileName),
  );
  const fileMetadata = await getMinioClient().statObject(
    "femida",
    decodeURIComponent(event.params.fileName),
  );
  return new Response(file, {
    headers: {
      "Content-Type": fileMetadata.metaData["content-type"],
    },
  });
};
