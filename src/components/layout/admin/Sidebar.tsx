"use client";

import type { ReactNode } from "react";
import clsx from "clsx";

import styles from "./Sidebar.module.css";

export interface SidebarProps {
    readonly children: ReactNode;
    readonly className?: string;
    readonly title?: string;
    readonly footer?: ReactNode;
}

export default function Sidebar({
    children,
    className,
    title = "Netflix Admin",
    footer,
}: SidebarProps) {
    return (
        <nav
            className={clsx(
                styles.sidebar,
                className,
            )}
        >
            <div className={styles.header}>
                <h1 className={styles.title}>
                    {title}
                </h1>
            </div>

            <div className={styles.body}>
                {children}
            </div>

            {footer ? (
                <div className={styles.footer}>
                    {footer}
                </div>
            ) : null}
        </nav>
    );
}