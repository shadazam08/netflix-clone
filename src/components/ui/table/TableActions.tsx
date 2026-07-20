import type { ReactNode } from "react";

import clsx from "clsx";

import styles from "./TableActions.module.css";

export interface TableActionsProps {
    readonly children: ReactNode;
    readonly className?: string;
    readonly align?: "left" | "center" | "right";
}

export default function TableActions({
    children,
    className,
    align = "right",
}: TableActionsProps) {
    return (
        <div
            className={clsx(
                styles.actions,
                styles[align],
                className,
            )}
        >
            {children}
        </div>
    );
}