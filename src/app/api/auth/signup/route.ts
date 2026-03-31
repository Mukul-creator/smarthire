import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { createSessionToken, setSessionCookie } from "@/lib/auth";
import { createUser, findUserByEmail } from "@/lib/users";
import { signupSchema } from "@/lib/validations/auth";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = signupSchema.safeParse({
      ...json,
      role: "candidate",
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid signup payload." },
        { status: 400 },
      );
    }

    const existingUser = await findUserByEmail(parsed.data.email);

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 },
      );
    }

    const now = new Date();
    const user = await createUser({
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash: await bcrypt.hash(parsed.data.password, 12),
      role: "candidate",
      createdAt: now,
      updatedAt: now,
    });

    const token = await createSessionToken({
      userId: String(user._id),
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const response = NextResponse.json(
      {
        user: {
          id: String(user._id),
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 },
    );

    setSessionCookie(response, token);
    return response;
  } catch (error) {
    console.error("Candidate signup failed:", error);

    return NextResponse.json(
      { error: "Unable to create candidate account right now." },
      { status: 500 },
    );
  }
}
