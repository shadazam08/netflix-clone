"use client";

import type { InputHTMLAttributes } from "react";

import clsx from "clsx";

import styles from "./Switch.module.css";

export interface SwitchProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        "type"
    > {
    readonly label?: string;
    readonly helperText?: string;
    readonly fullWidth?: boolean;
    readonly containerClassName?: string;
}

export default function Switch({
    label,
    helperText,
    fullWidth = false,
    containerClassName,
    className,
    id,
    ...props
}: SwitchProps) {
    const switchId = id ?? "switch";

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
                htmlFor={switchId}
                className={styles.label}
            >
                <input
                    id={switchId}
                    type="checkbox"
                    className={clsx(
                        styles.input,
                        className,
                    )}
                    {...props}
                />

                <span
                    className={styles.track}
                    aria-hidden="true"
                >
                    <span
                        className={
                            styles.thumb
                        }
                    />
                </span>

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

            {helperText && (
                <span
                    className={
                        styles.helperText
                    }
                >
                    {helperText}
                </span>
            )}
        </div>
    );
}