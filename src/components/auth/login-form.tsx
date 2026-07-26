"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, LoginInput } from "@/schemas/auth";
import { loginAction } from "@/actions/login";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form-error";

export function LoginForm() {
    const router = useRouter();

    const [serverError, setServerError] = useState("");
    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (values: LoginInput) => {
        setServerError("");

        const formData = new FormData();

        formData.append("email", values.email);
        formData.append("password", values.password);

        startTransition(async () => {
            const result = await loginAction(formData);

            if (!result.success) {
                setServerError(result.message ?? "Login failed.");
                return;
            }

            router.push("/");
            router.refresh();
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

            <FormError message={serverError} />

            <Button
                type="submit"
                disabled={isPending}
            >
                {isPending ? "Signing In..." : "Sign In"}
            </Button>
        </form>
    );
}