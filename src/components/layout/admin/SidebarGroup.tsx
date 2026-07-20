"use client";

import type { ReactNode } from "react";
import clsx from "clsx";

import styles from "./SidebarGroup.module.css";

export interface SidebarGroupProps {
    readonly title?: string;
    readonly children: ReactNode;
    readonly className?: string;
}

export default function SidebarGroup({
    title,
    children,
    className,
}: SidebarGroupProps) {
    return (
        <section
            className={clsx(
                styles.group,
                className,
            )}
        >
            {title ? (
                <h2 className={styles.title}>
                    {title}
                </h2>
            ) : null}

            <div className={styles.items}>
                {children}
            </div>
        </section>
    );
}