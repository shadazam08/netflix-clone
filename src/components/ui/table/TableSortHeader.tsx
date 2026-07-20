"use client";

import clsx from "clsx";

import {
    SortButton,
    type SortDirection,
} from "@/components/ui/sort-button";

import styles from "./TableSortHeader.module.css";

export interface TableSortHeaderProps {
    readonly label: string;
    readonly direction: SortDirection;
    readonly disabled?: boolean;
    readonly className?: string;
    readonly onChange: (
        direction: SortDirection,
    ) => void;
}

export default function TableSortHeader({
    label,
    direction,
    disabled = false,
    className,
    onChange,
}: TableSortHeaderProps) {
    return (
        <div
            className={clsx(
                styles.container,
                className,
            )}
        >
            <SortButton
                label={label}
                direction={direction}
                disabled={disabled}
                onChange={onChange}
            />
        </div>
    );
}