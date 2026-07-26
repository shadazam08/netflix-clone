import {
    ButtonHTMLAttributes,
    forwardRef,
} from "react";

import { cn } from "@/lib/utils";

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger";
    fullWidth?: boolean;
}

export const Button = forwardRef<
    HTMLButtonElement,
    ButtonProps
>(
    (
        {
            className,
            children,
            disabled,
            variant = "primary",
            fullWidth = false,
            type = "button",
            ...props
        },
        ref,
    ) => {
        const variantClass =
            variant === "primary"
                ? "bg-red-600 hover:bg-red-700 text-white"
                : variant === "secondary"
                    ? "bg-neutral-800 hover:bg-neutral-700 text-white"
                    : "bg-red-800 hover:bg-red-900 text-white";

        return (
            <button
                ref={ref}
                type={type}
                disabled={disabled}
                className={cn(
                    "inline-flex h-11 items-center justify-center rounded-lg px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                    variantClass,
                    fullWidth && "w-full",
                    className,
                )}
                {...props}
            >
                {children}
            </button>
        );
    },
);

Button.displayName = "Button";