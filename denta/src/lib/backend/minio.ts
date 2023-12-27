import Minio from "minio";

import { env } from "$env/dynamic/private";

let minioClient = new Minio.Client({
  endPoint: env.MINIO_DEV_ENDPOINT,
  port: 9000,
  useSSL: false,
  accessKey: "5VqZ0JdGSKWnLUqxU63s",
  secretKey: "jwraboJM3OIJbeaJTBfGZplJLeiAgGd1qGRFl1BY",
});

export const getMinioClient = () => {
  if (minioClient === undefined) {
    minioClient = new Minio.Client({
      endPoint: "minio_dev",
      port: 9000,
      useSSL: false,
      accessKey: "5VqZ0JdGSKWnLUqxU63s",
      secretKey: "jwraboJM3OIJbeaJTBfGZplJLeiAgGd1qGRFl1BY",
    });
  }
  return minioClient;
};
