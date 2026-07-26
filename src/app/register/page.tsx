import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-black px-4">
            <div className="w-full max-w-md rounded-xl bg-zinc-950 p-8 shadow-xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-white">
                        Create Account
                    </h1>

                    <p className="mt-2 text-sm text-zinc-400">
                        Sign up to start watching.
                    </p>
                </div>

                <RegisterForm />
            </div>
        </main>
    );
}