import { MongoClient } from "mongodb";
import { ME_CONFIG_MONGODB_URL } from "$env/static/private";

const getClient = async () => {
  const client = new MongoClient(ME_CONFIG_MONGODB_URL);
  for (let i = 0; i < 10; i++) {
    try {
      await client.connect();
      break;
    } catch (e) {
      console.log(e);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  return client;
};

export default getClient();
