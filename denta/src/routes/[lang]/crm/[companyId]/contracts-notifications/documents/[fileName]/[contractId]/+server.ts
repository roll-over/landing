import { usersCompanyGuard } from "$lib/backend/guards/byCompany";
import { getMinioClient } from "$lib/backend/minio";
import db from "$lib/db";
import { json } from "@sveltejs/kit";

export const DELETE = async (event) => {
  await usersCompanyGuard(event);

  const _db = await db();

  if (!_db) {
    throw new Error("No database connection");
  }

  const contractsNotification = await _db.collection("contracts-notifications").findOne({
    companyId: event.params.companyId,
    id: event.params.contractId,
  });
  if (!contractsNotification) {
    throw new Error("contractsNotifications.contractNotFound");
  }
  const fileNames = contractsNotification.fileNames.filter(
    (document) => document !== event.params.fileName,
  );

  await _db.collection("contracts-notifications").updateOne(
    {
      companyId: event.params.companyId,
      id: event.params.contractId,
    },
    {
      $set: {
        fileNames,
      },
    },
  );

  await getMinioClient().removeObject("femida", decodeURIComponent(event.params.fileName));

  return json({ status: "ok" });
};
