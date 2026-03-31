import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { getDatabase } from "./mongodb";
import type { UserRole } from "./auth";

export type UserDocument = {
  _id?: ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};

type SeedUserConfig = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

export const DEFAULT_USERS: SeedUserConfig[] = [
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

async function getUsersCollection() {
  const db = await getDatabase();
  const collection = db.collection<UserDocument>("smarthire_users");

  await collection.createIndex({ email: 1 }, { unique: true });
  await collection.createIndex({ role: 1 });

  return collection;
}

export async function findUserByEmail(email: string) {
  const users = await getUsersCollection();
  return users.findOne({ email: email.trim().toLowerCase() });
}

export async function createUser(user: UserDocument) {
  const users = await getUsersCollection();
  const result = await users.insertOne(user);

  return {
    ...user,
    _id: result.insertedId,
  };
}

async function ensureUser(config: SeedUserConfig) {
  const users = await getUsersCollection();
  const email = config.email.trim().toLowerCase();
  const existingUser = await users.findOne({ email });

  if (existingUser) {
    return existingUser;
  }

  const now = new Date();
  const user: UserDocument = {
    name: config.name.trim(),
    email,
    passwordHash: await bcrypt.hash(config.password, 12),
    role: config.role,
    createdAt: now,
    updatedAt: now,
  };

  const result = await users.insertOne(user);

  return {
    ...user,
    _id: result.insertedId,
  };
}

export async function ensureDefaultUsers() {
  // Keep startup deterministic by seeding the same default users when missing.
  const interviewer = await ensureUser(DEFAULT_USERS[0]);
  const candidate = await ensureUser(DEFAULT_USERS[1]);

  return { interviewer, candidate };
}

export async function ensureInterviewerAdmin() {
  const { interviewer } = await ensureDefaultUsers();
  return interviewer;
}
