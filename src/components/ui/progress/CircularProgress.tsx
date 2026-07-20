"use client";

import clsx from "clsx";

import styles from "./CircularProgress.module.css";

export interface CircularProgressProps {
    readonly value: number;
    readonly max?: number;
    readonly size?: number;
    readonly strokeWidth?: number;
    readonly showLabel?: boolean;
    readonly className?: string;
}

export default function CircularProgress({
    value,
    max = 100,
    size = 120,
    strokeWidth = 10,
    showLabel = true,
    className,
}: CircularProgressProps) {
    const percentage = Math.min(
        Math.max((value / max) * 100, 0),
        100,
    );

    const radius =
        (size - strokeWidth) / 2;

    const circumference =
        2 * Math.PI * radius;

    const offset =
        circumference -
        (percentage / 100) *
            circumference;

    return (
        <div
            className={clsx(
                styles.container,
                className,
            )}
        >
            <svg
                width={size}
                height={size}
                className={styles.svg}
            >
                <circle
                    className={
                        styles.background
                    }
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    fill="none"
                />

                <circle
                    className={styles.progress}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={
                        circumference
                    }
                    strokeDashoffset={offset}
                />
            </svg>

            {showLabel && (
                <span className={styles.label}>
                    {Math.round(
                        percentage,
                    )}
                    %
                </span>
            )}
        </div>
    );
}