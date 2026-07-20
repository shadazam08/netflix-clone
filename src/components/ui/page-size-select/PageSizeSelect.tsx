"use client";

import clsx from "clsx";

import styles from "./PageSizeSelect.module.css";

export const DEFAULT_PAGE_SIZE_OPTIONS = [
    10,
    20,
    50,
    100,
] as const;

export interface PageSizeSelectProps {
    readonly value: number;
    readonly options?: readonly number[];
    readonly disabled?: boolean;
    readonly className?: string;
    readonly onChange: (
        pageSize: number,
    ) => void;
}

export default function PageSizeSelect({
    value,
    options = DEFAULT_PAGE_SIZE_OPTIONS,
    disabled = false,
    className,
    onChange,
}: PageSizeSelectProps) {
    return (
        <label
            className={clsx(
                styles.container,
                className,
            )}
        >
            <span className={styles.label}>
                Rows per page
            </span>

            <select
                value={value}
                disabled={disabled}
                className={styles.select}
                onChange={(event) =>
                    onChange(
                        Number(
                            event.target.value,
                        ),
                    )
                }
            >
                {options.map((option) => (
                    <option
                        key={option}
                        value={option}
                    >
                        {option}
                    </option>
                ))}
            </select>
        </label>
    );
}