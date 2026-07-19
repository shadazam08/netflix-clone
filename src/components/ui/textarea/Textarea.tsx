import type { ReactNode, TextareaHTMLAttributes } from "react";
import clsx from "clsx";

import styles from "./Textarea.module.css";

export interface TextareaProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    readonly label?: string;
    readonly error?: string;
    readonly helperText?: string;
    readonly fullWidth?: boolean;
    readonly footer?: ReactNode;
}

export default function Textarea({
    id,
    label,
    error,
    helperText,
    footer,
    fullWidth = true,
    className,
    rows = 5,
    ...props
}: TextareaProps) {
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

            <textarea
                id={id}
                rows={rows}
                {...props}
                className={clsx(
                    styles.textarea,
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

            {footer}
        </div>
    );
}