import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { createSessionToken, setSessionCookie } from "@/lib/auth";
import { ensureDefaultUsers, findUserByEmail } from "@/lib/users";
import { loginSchema } from "@/lib/validations/auth";

export async function POST(request: Request) {
  try {
    await ensureDefaultUsers();

    const json = await request.json();
    const parsed = loginSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid login payload." },
        { status: 400 },
      );
    }

    const user = await findUserByEmail(parsed.data.email);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 },
      );
    }

    if (user.role !== "interviewer") {
      return NextResponse.json(
        { error: "Only interviewer admin login is enabled right now." },
        { status: 403 },
      );
    }

    const isPasswordValid = await bcrypt.compare(
      parsed.data.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 },
      );
    }

    const token = await createSessionToken({
      userId: String(user._id),
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const response = NextResponse.json({
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    setSessionCookie(response, token);
    return response;
  } catch (error) {
    console.error("Login failed:", error);

    const message =
      error instanceof Error &&
      error.message.toLowerCase().includes("authentication failed")
        ? "Database authentication failed. Update the MongoDB Atlas credentials in MONGODB_URI."
        : "Unable to login right now.";

    return NextResponse.json(
      { error: message },
      { status: 500 },
    );
  }
}
