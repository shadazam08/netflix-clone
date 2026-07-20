"use client";

import clsx from "clsx";

import styles from "./SortButton.module.css";

export type SortDirection =
    | "asc"
    | "desc"
    | null;

export interface SortButtonProps {
    readonly label: string;
    readonly direction: SortDirection;
    readonly disabled?: boolean;
    readonly className?: string;
    readonly onChange: (
        direction: SortDirection,
    ) => void;
}

export default function SortButton({
    label,
    direction,
    disabled = false,
    className,
    onChange,
}: SortButtonProps) {
    function handleClick() {
        switch (direction) {
            case null:
                onChange("asc");
                break;

            case "asc":
                onChange("desc");
                break;

            default:
                onChange(null);
        }
    }

    return (
        <button
            type="button"
            disabled={disabled}
            className={clsx(
                styles.button,
                className,
            )}
            onClick={handleClick}
        >
            <span>{label}</span>

            <span
                className={styles.icon}
                aria-hidden="true"
            >
                {direction === "asc" && "▲"}
                {direction === "desc" && "▼"}
                {direction === null && "⇅"}
            </span>
        </button>
    );
}