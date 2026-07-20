"use client";

import type { ReactNode } from "react";
import clsx from "clsx";

import styles from "./Topbar.module.css";

export interface TopbarProps {
    readonly title?: string;
    readonly subtitle?: string;
    readonly left?: ReactNode;
    readonly right?: ReactNode;
    readonly className?: string;
}

export default function Topbar({
    title,
    subtitle,
    left,
    right,
    className,
}: TopbarProps) {
    return (
        <header
            className={clsx(
                styles.topbar,
                className,
            )}
        >
            <div className={styles.left}>
                {left}

                {(title || subtitle) ? (
                    <div className={styles.heading}>
                        {title ? (
                            <h1 className={styles.title}>
                                {title}
                            </h1>
                        ) : null}

                        {subtitle ? (
                            <p className={styles.subtitle}>
                                {subtitle}
                            </p>
                        ) : null}
                    </div>
                ) : null}
            </div>

            <div className={styles.right}>
                {right}
            </div>
        </header>
    );
}