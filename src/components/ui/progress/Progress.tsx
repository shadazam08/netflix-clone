"use client";

import clsx from "clsx";

import styles from "./Progress.module.css";

export interface ProgressProps {
    readonly value: number;
    readonly max?: number;
    readonly showLabel?: boolean;
    readonly size?: "small" | "medium" | "large";
    readonly className?: string;
}

export default function Progress({
    value,
    max = 100,
    showLabel = true,
    size = "medium",
    className,
}: ProgressProps) {
    const percentage = Math.min(
        Math.max((value / max) * 100, 0),
        100,
    );

    return (
        <div
            className={clsx(
                styles.container,
                className,
            )}
        >
            {showLabel && (
                <div className={styles.header}>
                    <span className={styles.label}>
                        Progress
                    </span>

                    <span className={styles.value}>
                        {Math.round(
                            percentage,
                        )}
                        %
                    </span>
                </div>
            )}

            <div
                className={clsx(
                    styles.track,
                    styles[size],
                )}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={max}
                aria-valuenow={value}
            >
                <div
                    className={styles.fill}
                    style={{
                        width: `${percentage}%`,
                    }}
                />
            </div>
        </div>
    );
}