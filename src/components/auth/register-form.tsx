"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { registerSchema, RegisterInput } from "@/schemas/auth";
import { registerAction } from "@/actions/register";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form-error";

export function RegisterForm() {
    const [isPending, startTransition] = useTransition();
    const [serverError, setServerError] = useState("");
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (values: RegisterInput) => {
        setServerError("");

        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append(
            "confirmPassword",
            values.confirmPassword
        );

        startTransition(async () => {
            const result = await registerAction(formData);

            if (!result.success) {
                setServerError(result.message ?? "Registration failed.");
                return;
            }

            reset();

            router.push("/login");
        });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >
            <div>
                <Input
                    placeholder="Full name"
                    {...register("name")}
                />
                <FormError message={errors.name?.message} />
            </div>

            <div>
                <Input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                />
                <FormError message={errors.email?.message} />
            </div>

            <div>
                <Input
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                />
                <FormError message={errors.password?.message} />
            </div>

            <div>
                <Input
                    type="password"
                    placeholder="Confirm password"
                    {...register("confirmPassword")}
                />
                <FormError
                    message={errors.confirmPassword?.message}
                />
            </div>

            <FormError message={serverError} />

            <Button
                type="submit"
                disabled={isPending}
            >
                {isPending ? "Creating Account..." : "Create Account"}
            </Button>
        </form>
    );
}