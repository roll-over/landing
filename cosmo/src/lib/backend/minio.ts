import * as Minio from "minio";

import { env } from "$env/dynamic/private";

let minioClient;
export const getMinioClient = () => {
  if (minioClient === undefined) {
    minioClient = new Minio.Client({
      endPoint: env.MINIO_ENDPOINT,
      port: 9000,
      useSSL: false,
      accessKey: env.MINIO_ACCESS_KEY,
      secretKey: env.MINIO_SECRET_KEY,
    });
  }
  return minioClient;
};
