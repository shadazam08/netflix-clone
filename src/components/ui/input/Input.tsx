import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

import styles from "./Input.module.css";

export interface InputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    readonly label?: string;
    readonly error?: string;
    readonly helperText?: string;
    readonly fullWidth?: boolean;
}

export default function Input({
    id,
    label,
    error,
    helperText,
    fullWidth = true,
    className,
    ...props
}: InputProps) {
    return (
        <div
            className={clsx(
                styles.container,
                fullWidth && styles.fullWidth,
            )}
        >
            {label && (
                <label
                    htmlFor={id}
                    className={styles.label}
                >
                    {label}
                </label>
            )}

            <input
                id={id}
                {...props}
                className={clsx(
                    styles.input,
                    error && styles.error,
                    className,
                )}
                aria-invalid={Boolean(error)}
                aria-describedby={
                    error
                        ? `${id}-error`
                        : helperText
                            ? `${id}-helper`
                            : undefined
                }
            />

            {error ? (
                <span
                    id={`${id}-error`}
                    className={styles.errorText}
                >
                    {error}
                </span>
            ) : (
                helperText && (
                    <span
                        id={`${id}-helper`}
                        className={styles.helperText}
                    >
                        {helperText}
                    </span>
                )
            )}
        </div>
    );
}