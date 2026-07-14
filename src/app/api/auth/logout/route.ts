import { NextResponse } from "next/server";
import { AUTH_MESSAGES } from "@/server/auth";

export async function POST() {
  return NextResponse.json(
    {
      message: AUTH_MESSAGES.LOGOUT_SUCCESS,
    },
    {
      status: 200,
    }
  );
}