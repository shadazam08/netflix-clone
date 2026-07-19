import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

import styles from "./Button.module.css";

export type ButtonVariant =
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "ghost";

export type ButtonSize =
    | "small"
    | "medium"
    | "large";

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    readonly children: ReactNode;
    readonly variant?: ButtonVariant;
    readonly size?: ButtonSize;
    readonly fullWidth?: boolean;
    readonly loading?: boolean;
}

export default function Button({
    children,
    variant = "primary",
    size = "medium",
    fullWidth = false,
    loading = false,
    className,
    disabled,
    type = "button",
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}
            type={type}
            disabled={disabled || loading}
            className={clsx(
                styles.button,
                styles[variant],
                styles[size],
                fullWidth && styles.fullWidth,
                loading && styles.loading,
                className,
            )}
        >
            {loading && (
                <span
                    className={styles.spinner}
                    aria-hidden="true"
                />
            )}

            <span className={styles.content}>
                {children}
            </span>
        </button>
    );
}