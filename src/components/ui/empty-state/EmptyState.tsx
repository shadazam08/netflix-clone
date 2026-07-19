import type { ReactNode } from "react";
import clsx from "clsx";

import { Button } from "@/components/ui/button";

import styles from "./EmptyState.module.css";

export interface EmptyStateProps {
    readonly title: string;
    readonly description: string;
    readonly icon?: ReactNode;
    readonly actionLabel?: string;
    readonly onAction?: () => void;
    readonly className?: string;
}

export default function EmptyState({
    title,
    description,
    icon,
    actionLabel,
    onAction,
    className,
}: EmptyStateProps) {
    return (
        <section
            className={clsx(
                styles.container,
                className,
            )}
        >
            {icon && (
                <div className={styles.icon}>
                    {icon}
                </div>
            )}

            <h2 className={styles.title}>
                {title}
            </h2>

            <p className={styles.description}>
                {description}
            </p>

            {actionLabel && onAction && (
                <Button onClick={onAction}>
                    {actionLabel}
                </Button>
            )}
        </section>
    );
}