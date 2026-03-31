import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

if (!uri || !dbName) {
  throw new Error("Missing MONGODB_URI or MONGODB_DB_NAME.");
}

const defaultUsers = [
  {
    name: "Smarthire Admin",
    email: "admin@smarthire.local",
    password: "Admin@12345",
    role: "interviewer",
  },
  {
    name: "Demo Candidate",
    email: "candidate@smarthire.local",
    password: "Candidate@12345",
    role: "candidate",
  },
];

const client = new MongoClient(uri);

try {
  await client.connect();
  const collection = client.db(dbName).collection("smarthire_users");

  await collection.createIndex({ email: 1 }, { unique: true });
  await collection.createIndex({ role: 1 });

  for (const user of defaultUsers) {
    const email = user.email.toLowerCase();
    const existingUser = await collection.findOne({ email });

    if (existingUser) {
      console.log(`Skipped existing user: ${email}`);
      continue;
    }

    await collection.insertOne({
      name: user.name,
      email,
      passwordHash: await bcrypt.hash(user.password, 12),
      role: user.role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log(`Inserted user: ${email}`);
  }
} finally {
  await client.close();
}
