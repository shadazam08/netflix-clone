"use client";

import type { ReactNode } from "react";
import clsx from "clsx";

import styles from "./UserMenu.module.css";

export interface UserMenuProps {
    readonly name: string;
    readonly email?: string;
    readonly avatar?: ReactNode;
    readonly actions?: ReactNode;
    readonly className?: string;
}

export default function UserMenu({
    name,
    email,
    avatar,
    actions,
    className,
}: UserMenuProps) {
    return (
        <div
            className={clsx(
                styles.container,
                className,
            )}
        >
            <div className={styles.profile}>
                {avatar ? (
                    <div className={styles.avatar}>
                        {avatar}
                    </div>
                ) : null}

                <div className={styles.info}>
                    <span className={styles.name}>
                        {name}
                    </span>

                    {email ? (
                        <span className={styles.email}>
                            {email}
                        </span>
                    ) : null}
                </div>
            </div>

            {actions ? (
                <div className={styles.actions}>
                    {actions}
                </div>
            ) : null}
        </div>
    );
}