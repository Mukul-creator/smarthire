export function getEnv(
  name:
    | "JWT_SECRET"
    | "MONGODB_URI"
    | "MONGODB_DB_NAME",
) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}
