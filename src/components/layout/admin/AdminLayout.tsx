"use client";

import type { ReactNode } from "react";

import styles from "./AdminLayout.module.css";

export interface AdminLayoutProps {
    readonly sidebar: ReactNode;
    readonly header: ReactNode;
    readonly children: ReactNode;
}

export default function AdminLayout({
    sidebar,
    header,
    children,
}: AdminLayoutProps) {
    return (
        <div className={styles.layout}>
            <aside className={styles.sidebar}>
                {sidebar}
            </aside>

            <div className={styles.main}>
                <header className={styles.header}>
                    {header}
                </header>

                <main className={styles.content}>
                    {children}
                </main>
            </div>
        </div>
    );
}