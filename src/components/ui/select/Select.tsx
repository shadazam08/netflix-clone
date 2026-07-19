import type { ReactNode, SelectHTMLAttributes } from "react";
import clsx from "clsx";

import styles from "./Select.module.css";

export interface SelectProps
    extends SelectHTMLAttributes<HTMLSelectElement> {
    readonly label?: string;
    readonly error?: string;
    readonly helperText?: string;
    readonly fullWidth?: boolean;
    readonly children: ReactNode;
}

export default function Select({
    id,
    label,
    error,
    helperText,
    fullWidth = true,
    children,
    className,
    ...props
}: SelectProps) {
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

            <select
                id={id}
                {...props}
                className={clsx(
                    styles.select,
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
            >
                {children}
            </select>

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