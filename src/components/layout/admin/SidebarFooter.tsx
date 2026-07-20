"use client";

import type { ReactNode } from "react";
import clsx from "clsx";

import styles from "./SidebarFooter.module.css";

export interface SidebarFooterProps {
    readonly children: ReactNode;
    readonly className?: string;
}

export default function SidebarFooter({
    children,
    className,
}: SidebarFooterProps) {
    return (
        <footer
            className={clsx(
                styles.footer,
                className,
            )}
        >
            {children}
        </footer>
    );
}