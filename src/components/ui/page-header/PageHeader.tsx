import type { ReactNode } from "react";
import clsx from "clsx";

import styles from "./PageHeader.module.css";

export interface PageHeaderProps {
    readonly title: string;
    readonly description?: string;
    readonly actions?: ReactNode;
    readonly className?: string;
}

export default function PageHeader({
    title,
    description,
    actions,
    className,
}: PageHeaderProps) {
    return (
        <header
            className={clsx(
                styles.header,
                className,
            )}
        >
            <div className={styles.content}>
                <h1 className={styles.title}>
                    {title}
                </h1>

                {description && (
                    <p className={styles.description}>
                        {description}
                    </p>
                )}
            </div>

            {actions && (
                <div className={styles.actions}>
                    {actions}
                </div>
            )}
        </header>
    );
}