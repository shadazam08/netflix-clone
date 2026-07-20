"use client";

import type { InputHTMLAttributes } from "react";

import clsx from "clsx";

import styles from "./SearchInput.module.css";

export interface SearchInputProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        "type"
    > {
    readonly loading?: boolean;
    readonly fullWidth?: boolean;
}

export default function SearchInput({
    loading = false,
    fullWidth = false,
    className,
    disabled,
    ...props
}: SearchInputProps) {
    return (
        <div
            className={clsx(
                styles.container,
                fullWidth && styles.fullWidth,
            )}
        >
            <input
                type="search"
                {...props}
                disabled={disabled || loading}
                className={clsx(
                    styles.input,
                    className,
                )}
            />

            {loading && (
                <span
                    className={styles.loading}
                    aria-hidden="true"
                >
                    Loading...
                </span>
            )}
        </div>
    );
}