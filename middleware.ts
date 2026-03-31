import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "smarthire_session";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("Missing required environment variable: JWT_SECRET");
  }

  return new TextEncoder().encode(secret);
}

async function getSessionFromRequest(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, getJwtSecret());

    return {
      role: String(payload.role),
    };
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const session = await getSessionFromRequest(request);
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/interviewer")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (session.role !== "interviewer") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  if (pathname.startsWith("/candidate")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (session.role !== "candidate") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  if ((pathname === "/login" || pathname === "/signup") && session) {
    const destination =
      session.role === "interviewer" ? "/interviewer" : "/candidate";

    return NextResponse.redirect(new URL(destination, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/interviewer/:path*", "/candidate/:path*"],
};
