import { MongoClient } from "mongodb";
import { ME_CONFIG_MONGODB_URL } from "$env/static/private";

const client = new MongoClient(ME_CONFIG_MONGODB_URL);

let db = null;

export const startMongo = async () => {
  console.log("Starting mongo");
  for (let i = 0; i < 10; i++) {
    try {
      await client.connect();
      db = client.db("landing");
      break;
    } catch (e) {
      console.error(e);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  return client;
};

export default () => db;
