import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

import styles from "./Badge.module.css";

export type BadgeVariant =
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info";

export interface BadgeProps
    extends HTMLAttributes<HTMLSpanElement> {
    readonly children: ReactNode;
    readonly variant?: BadgeVariant;
    readonly rounded?: boolean;
}

export default function Badge({
    children,
    variant = "primary",
    rounded = true,
    className,
    ...props
}: BadgeProps) {
    return (
        <span
            {...props}
            className={clsx(
                styles.badge,
                styles[variant],
                rounded && styles.rounded,
                className,
            )}
        >
            {children}
        </span>
    );
}