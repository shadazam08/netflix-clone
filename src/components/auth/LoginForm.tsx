"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import styles from './LoginForm.module.css'



interface LoginFormValues {
    email: string;
    password: string;
}

export default function LoginForm() {
    const router = useRouter();

    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onBlur",
    });

    async function onSubmit(data: LoginFormValues) {
        try {
            setServerError("");
            setLoading(true);

            const result = await signIn("credentials", {
                email: data.email.trim().toLowerCase(),
                password: data.password,
                redirect: false,
            });

            if (!result) {
                setServerError("Unable to login.");
                return;
            }

            if (result.error) {
                setServerError(result.error);
                return;
            }

            router.replace("/dashboard");
            router.refresh();
        } catch {
            setServerError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.form}
            noValidate
        >
            <h1 className={styles.title}>
                Super Admin Login
            </h1>

            <p className={styles.subtitle}>
                Sign in to continue.
            </p>

            <Input
                id="email"
                type="email"
                label="Email"
                placeholder="Enter your email"
                autoComplete="email"
                error={errors.email?.message}
                {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value:
                            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email",
                    },
                })}
            />

            <Input
                id="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                autoComplete="current-password"
                error={errors.password?.message}
                {...register("password", {
                    required: "Password is required",
                    minLength: {
                        value: 8,
                        message:
                            "Password must be at least 8 characters",
                    },
                })}
            />

            {serverError && (
                <div className={styles.error}>
                    {serverError}
                </div>
            )}

            <Button
                type="submit"
                loading={loading}
                fullWidth
            >
                Sign In
            </Button>
        </form>
    );
}