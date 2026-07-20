"use client";

import type {
    ReactNode,
    SelectHTMLAttributes,
} from "react";

import clsx from "clsx";

import styles from "./Dropdown.module.css";

export interface DropdownOption {
    readonly label: string;
    readonly value: string;
    readonly disabled?: boolean;
}

export interface DropdownProps
    extends Omit<
        SelectHTMLAttributes<HTMLSelectElement>,
        "children"
    > {
    readonly options: readonly DropdownOption[];
    readonly placeholder?: string;
    readonly label?: string;
    readonly helperText?: string;
    readonly error?: string;
    readonly fullWidth?: boolean;
    readonly containerClassName?: string;
    readonly endAdornment?: ReactNode;
}

export default function Dropdown({
    options,
    placeholder,
    label,
    helperText,
    error,
    fullWidth = false,
    containerClassName,
    className,
    endAdornment,
    id,
    ...props
}: DropdownProps) {
    const selectId =
        id ?? "dropdown";

    return (
        <div
            className={clsx(
                styles.container,
                fullWidth &&
                styles.fullWidth,
                containerClassName,
            )}
        >
            {label && (
                <label
                    htmlFor={selectId}
                    className={styles.label}
                >
                    {label}
                </label>
            )}

            <div className={styles.wrapper}>
                <select
                    id={selectId}
                    className={clsx(
                        styles.select,
                        error &&
                        styles.error,
                        className,
                    )}
                    {...props}
                >
                    {placeholder && (
                        <option value="">
                            {placeholder}
                        </option>
                    )}

                    {options.map(
                        (option) => (
                            <option
                                key={
                                    option.value
                                }
                                value={
                                    option.value
                                }
                                disabled={
                                    option.disabled
                                }
                            >
                                {
                                    option.label
                                }
                            </option>
                        ),
                    )}
                </select>

                {endAdornment && (
                    <div
                        className={
                            styles.endAdornment
                        }
                    >
                        {endAdornment}
                    </div>
                )}
            </div>

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