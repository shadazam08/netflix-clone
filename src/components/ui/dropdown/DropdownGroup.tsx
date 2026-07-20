import type { ReactNode } from "react";

import clsx from "clsx";

import styles from "./DropdownGroup.module.css";

export interface DropdownGroupProps {
    readonly children: ReactNode;
    readonly className?: string;
    readonly direction?: "row" | "column";
}

export default function DropdownGroup({
    children,
    className,
    direction = "row",
}: DropdownGroupProps) {
    return (
        <div
            className={clsx(
                styles.group,
                styles[direction],
                className,
            )}
        >
            {children}
        </div>
    );
}