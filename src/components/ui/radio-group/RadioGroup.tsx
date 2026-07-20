"use client";

import type { InputHTMLAttributes } from "react";

import clsx from "clsx";

import styles from "./RadioGroup.module.css";

export interface RadioOption {
    readonly label: string;
    readonly value: string;
    readonly disabled?: boolean;
}

export interface RadioGroupProps {
    readonly name: string;
    readonly value: string;
    readonly options: readonly RadioOption[];
    readonly onChange: (value: string) => void;
    readonly disabled?: boolean;
    readonly direction?: "row" | "column";
    readonly className?: string;
}

interface RadioItemProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        "type" | "value" | "onChange"
    > {
    readonly label: string;
    readonly value: string;
    readonly checked: boolean;
    readonly onValueChange: (
        value: string,
    ) => void;
}

function RadioItem({
    label,
    value,
    checked,
    onValueChange,
    className,
    ...props
}: RadioItemProps) {
    return (
        <label className={styles.item}>
            <input
                {...props}
                type="radio"
                value={value}
                checked={checked}
                className={clsx(
                    styles.radio,
                    className,
                )}
                onChange={() =>
                    onValueChange(value)
                }
            />

            <span className={styles.label}>
                {label}
            </span>
        </label>
    );
}

export default function RadioGroup({
    name,
    value,
    options,
    onChange,
    disabled = false,
    direction = "column",
    className,
}: RadioGroupProps) {
    return (
        <div
            className={clsx(
                styles.group,
                styles[direction],
                className,
            )}
        >
            {options.map((option) => (
                <RadioItem
                    key={option.value}
                    name={name}
                    value={option.value}
                    label={option.label}
                    checked={
                        value === option.value
                    }
                    disabled={
                        disabled ||
                        option.disabled
                    }
                    onValueChange={onChange}
                />
            ))}
        </div>
    );
}