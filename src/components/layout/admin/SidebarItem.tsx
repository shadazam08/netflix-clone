"use client";

import Link from "next/link";
import clsx from "clsx";

import styles from "./SidebarItem.module.css";

export interface SidebarItemProps {
    readonly href: string;
    readonly label: string;
    readonly icon?: React.ReactNode;
    readonly active?: boolean;
    readonly disabled?: boolean;
    readonly className?: string;
}

export default function SidebarItem({
    href,
    label,
    icon,
    active = false,
    disabled = false,
    className,
}: SidebarItemProps) {
    return (
        <Link
            href={disabled ? "#" : href}
            aria-disabled={disabled}
            className={clsx(
                styles.item,
                active && styles.active,
                disabled && styles.disabled,
                className,
            )}
        >
            {icon ? (
                <span className={styles.icon}>
                    {icon}
                </span>
            ) : null}

            <span className={styles.label}>
                {label}
            </span>
        </Link>
    );
}