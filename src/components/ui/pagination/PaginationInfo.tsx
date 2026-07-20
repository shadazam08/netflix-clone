import clsx from "clsx";

import styles from "./PaginationInfo.module.css";

export interface PaginationInfoProps {
    readonly currentPage: number;
    readonly pageSize: number;
    readonly totalItems: number;
    readonly className?: string;
}

export default function PaginationInfo({
    currentPage,
    pageSize,
    totalItems,
    className,
}: PaginationInfoProps) {
    if (totalItems === 0) {
        return (
            <p
                className={clsx(
                    styles.info,
                    className,
                )}
            >
                Showing 0 of 0 results
            </p>
        );
    }

    const startItem =
        (currentPage - 1) * pageSize + 1;

    const endItem = Math.min(
        currentPage * pageSize,
        totalItems,
    );

    return (
        <p
            className={clsx(
                styles.info,
                className,
            )}
        >
            Showing{" "}
            <strong>{startItem}</strong>
            {" - "}
            <strong>{endItem}</strong>
            {" of "}
            <strong>{totalItems}</strong>
            {" results"}
        </p>
    );
}