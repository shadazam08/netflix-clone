"use client";

import type { InputHTMLAttributes } from "react";

import clsx from "clsx";

import styles from "./Checkbox.module.css";

export interface CheckboxProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        "type"
    > {
    readonly label?: string;
    readonly helperText?: string;
    readonly error?: string;
    readonly fullWidth?: boolean;
    readonly containerClassName?: string;
}

export default function Checkbox({
    label,
    helperText,
    error,
    fullWidth = false,
    containerClassName,
    className,
    id,
    ...props
}: CheckboxProps) {
    const checkboxId =
        id ?? "checkbox";

    return (
        <div
            className={clsx(
                styles.container,
                fullWidth &&
                styles.fullWidth,
                containerClassName,
            )}
        >
            <label
                htmlFor={checkboxId}
                className={styles.label}
            >
                <input
                    id={checkboxId}
                    type="checkbox"
                    className={clsx(
                        styles.checkbox,
                        error &&
                        styles.error,
                        className,
                    )}
                    {...props}
                />

                {label && (
                    <span
                        className={
                            styles.labelText
                        }
                    >
                        {label}
                    </span>
                )}
            </label>

            {error ? (
                <span
                    className={
                        styles.errorText
                    }
                >
                    {error}
                </span>
            ) : (
                helperText && (
                    <span
                        className={
                            styles.helperText
                        }
                    >
                        {helperText}
                    </span>
                )
            )}
        </div>
    );
}