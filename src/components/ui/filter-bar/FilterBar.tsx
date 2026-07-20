"use client";

import type { ReactNode } from "react";

import clsx from "clsx";

import styles from "./FilterBar.module.css";

export interface FilterBarProps {
    readonly children: ReactNode;
    readonly className?: string;
}

export default function FilterBar({
    children,
    className,
}: FilterBarProps) {
    return (
        <div
            className={clsx(
                styles.filterBar,
                className,
            )}
        >
            {children}
        </div>
    );
}