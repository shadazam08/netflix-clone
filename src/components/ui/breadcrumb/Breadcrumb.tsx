import Link from "next/link";
import clsx from "clsx";

import styles from "./Breadcrumb.module.css";

export interface BreadcrumbItem {
    readonly label: string;
    readonly href?: string;
}

export interface BreadcrumbProps {
    readonly items: readonly BreadcrumbItem[];
    readonly className?: string;
}

export default function Breadcrumb({
    items,
    className,
}: BreadcrumbProps) {
    if (items.length === 0) {
        return null;
    }

    return (
        <nav
            aria-label="Breadcrumb"
            className={clsx(
                styles.breadcrumb,
                className,
            )}
        >
            <ol className={styles.list}>
                {items.map((item, index) => {
                    const isLast =
                        index === items.length - 1;

                    return (
                        <li
                            key={`${item.label}-${index}`}
                            className={styles.item}
                        >
                            {item.href && !isLast ? (
                                <Link
                                    href={item.href}
                                    className={styles.link}
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span
                                    className={styles.current}
                                    aria-current={
                                        isLast
                                            ? "page"
                                            : undefined
                                    }
                                >
                                    {item.label}
                                </span>
                            )}

                            {!isLast && (
                                <span
                                    className={
                                        styles.separator
                                    }
                                    aria-hidden="true"
                                >
                                    /
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}