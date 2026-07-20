"use client";

import clsx from "clsx";

import styles from "./NotificationButton.module.css";

export interface NotificationButtonProps {
    readonly count?: number;
    readonly onClick?: () => void;
    readonly className?: string;
}

export default function NotificationButton({
    count = 0,
    onClick,
    className,
}: NotificationButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={clsx(
                styles.button,
                className,
            )}
            aria-label="Notifications"
        >
            <span
                className={styles.icon}
                aria-hidden="true"
            >
                🔔
            </span>

            {count > 0 ? (
                <span className={styles.badge}>
                    {count > 99 ? "99+" : count}
                </span>
            ) : null}
        </button>
    );
}