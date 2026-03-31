import { MongoClient } from "mongodb";
import { getEnv } from "./env";

declare global {
  var mongoClientPromise: Promise<MongoClient> | undefined;
}

export function getMongoClientPromise() {
  if (!global.mongoClientPromise) {
    const client = new MongoClient(getEnv("MONGODB_URI"));
    global.mongoClientPromise = client.connect();
  }

  return global.mongoClientPromise;
}

export async function getDatabase() {
  const connectedClient = await getMongoClientPromise();
  return connectedClient.db(getEnv("MONGODB_DB_NAME"));
}
