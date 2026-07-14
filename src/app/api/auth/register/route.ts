import { NextRequest, NextResponse } from "next/server";

import { registerSchema } from "@/server/validations";
import { UserRepository, RoleRepository } from "@/server/repositories";
import { PasswordService } from "@/server/services";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const data = registerSchema.parse(body);

    const users = new UserRepository();
    const roles = new RoleRepository();

    const existingUser = await users.findByEmail(data.email);

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists." },
        { status: 409 }
      );
    }

    const role = await roles.getDefaultUserRole();

    if (!role) {
      return NextResponse.json(
        { message: "Default role not found." },
        { status: 500 }
      );
    }

    const hashedPassword = await PasswordService.hash(data.password);

    const user = await users.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
      roleId: role.id,
    });

    return NextResponse.json(
      {
        message: "Registration successful.",
        userId: user.id,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        message: "Invalid request.",
      },
      {
        status: 400,
      }
    );
  }
}