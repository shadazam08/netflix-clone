"use client";

import type { ReactNode } from "react";
import clsx from "clsx";

import styles from "./MobileSidebar.module.css";

export interface MobileSidebarProps {
    readonly open: boolean;
    readonly onClose: () => void;
    readonly children: ReactNode;
    readonly className?: string;
}

export default function MobileSidebar({
    open,
    onClose,
    children,
    className,
}: MobileSidebarProps) {
    return (
        <>
            <div
                className={clsx(
                    styles.backdrop,
                    open && styles.open,
                )}
                onClick={onClose}
                aria-hidden={!open}
            />

            <aside
                className={clsx(
                    styles.sidebar,
                    open && styles.open,
                    className,
                )}
                aria-hidden={!open}
            >
                {children}
            </aside>
        </>
    );
}