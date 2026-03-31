import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import type { NextResponse } from "next/server";
import { getEnv } from "./env";

export const SESSION_COOKIE = "smarthire_session";
export const AUTH_ROLES = ["interviewer", "candidate"] as const;

export type UserRole = (typeof AUTH_ROLES)[number];

export type SessionUser = {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
};

function getJwtSecret() {
  return new TextEncoder().encode(getEnv("JWT_SECRET"));
}

export async function createSessionToken(user: SessionUser) {
  return new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getJwtSecret());
}

export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, getJwtSecret());

  return {
    userId: String(payload.userId),
    email: String(payload.email),
    name: String(payload.name),
    role: payload.role as UserRole,
  };
}

export async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  try {
    return await verifySessionToken(token);
  } catch {
    return null;
  }
}

export function setSessionCookie(response: NextResponse, token: string) {
  response.cookies.set({
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });
}
