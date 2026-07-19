import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

import styles from "./Card.module.css";

export interface CardProps
    extends HTMLAttributes<HTMLDivElement> {
    readonly children: ReactNode;
    readonly padding?: "none" | "small" | "medium" | "large";
    readonly hoverable?: boolean;
}

export default function Card({
    children,
    padding = "medium",
    hoverable = false,
    className,
    ...props
}: CardProps) {
    return (
        <div
            {...props}
            className={clsx(
                styles.card,
                styles[padding],
                hoverable && styles.hoverable,
                className,
            )}
        >
            {children}
        </div>
    );
}