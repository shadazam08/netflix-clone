import { forwardRef, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = "", ...props }, ref) => {
        return (
            <input
                ref={ref}
                {...props}
                className={`h-11 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 text-white outline-none transition focus:border-red-500 ${className}`}
            />
        );
    }
);

Input.displayName = "Input";