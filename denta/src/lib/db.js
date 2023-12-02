import { MongoClient } from "mongodb";
import { env } from "$env/dynamic/private";

const client = new MongoClient(env.ME_CONFIG_MONGODB_URL);

class DB {
  constructor() {
    this.db = null;
  }

  async connect() {
    if (this.db) {
      return this.db;
    }
    await client.connect();
    this.db = client.db("denta");
    return this.db;
  }

  async get() {
    if (!this.db) {
      await this.connect();
    }
    return this.db;
  }
}

const db = new DB();

export const startMongo = async () => {
  console.info("Starting mongo");
  for (let i = 0; i < 10; i++) {
    try {
      await db.connect();
      console.info("Mongo started");

      break;
    } catch (e) {
      console.error(e);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  return client;
};

export default async () => await db.get();
