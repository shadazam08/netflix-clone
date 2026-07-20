"use client";

import clsx from "clsx";

import styles from "./Pagination.module.css";

export interface PaginationProps {
    readonly currentPage: number;
    readonly totalPages: number;
    readonly onPageChange: (page: number) => void;
    readonly disabled?: boolean;
    readonly className?: string;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    disabled = false,
    className,
}: PaginationProps) {
    if (totalPages <= 1) {
        return null;
    }

    const pages: number[] = [];

    for (let page = 1; page <= totalPages; page += 1) {
        pages.push(page);
    }

    return (
        <nav
            className={clsx(
                styles.pagination,
                className,
            )}
            aria-label="Pagination"
        >
            <button
                type="button"
                className={styles.button}
                disabled={
                    disabled ||
                    currentPage === 1
                }
                onClick={() =>
                    onPageChange(currentPage - 1)
                }
            >
                Previous
            </button>

            <div className={styles.pages}>
                {pages.map((page) => (
                    <button
                        key={page}
                        type="button"
                        className={clsx(
                            styles.button,
                            page === currentPage &&
                                styles.active,
                        )}
                        disabled={disabled}
                        aria-current={
                            page === currentPage
                                ? "page"
                                : undefined
                        }
                        onClick={() =>
                            onPageChange(page)
                        }
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                type="button"
                className={styles.button}
                disabled={
                    disabled ||
                    currentPage === totalPages
                }
                onClick={() =>
                    onPageChange(currentPage + 1)
                }
            >
                Next
            </button>
        </nav>
    );
}