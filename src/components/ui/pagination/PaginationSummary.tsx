import clsx from "clsx";

import styles from "./PaginationSummary.module.css";

export interface PaginationSummaryProps {
    readonly currentPage: number;
    readonly totalPages: number;
    readonly className?: string;
}

export default function PaginationSummary({
    currentPage,
    totalPages,
    className,
}: PaginationSummaryProps) {
    return (
        <p
            className={clsx(
                styles.summary,
                className,
            )}
        >
            Page{" "}
            <strong>{currentPage}</strong>
            {" of "}
            <strong>{totalPages}</strong>
        </p>
    );
}