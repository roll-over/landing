import { MongoClient } from "mongodb";
import { ME_CONFIG_MONGODB_URL } from "$env/static/private";

const client = new MongoClient(ME_CONFIG_MONGODB_URL);

export const startMongo = async () => {
  for (let i = 0; i < 10; i++) {
    try {
      await client.connect();
      break;
    } catch (e) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  return client;
};

export default client.db("landing");
