import type { ReactNode } from "react";

import clsx from "clsx";

import { PaginationInfo } from "@/components/ui/pagination";
import { PageSizeSelect } from "@/components/ui/page-size-select";

import styles from "./PaginationToolbar.module.css";

export interface PaginationToolbarProps {
    readonly currentPage: number;
    readonly pageSize: number;
    readonly totalItems: number;
    readonly pageSizeOptions?: readonly number[];
    readonly disabled?: boolean;
    readonly className?: string;
    readonly actions?: ReactNode;
    readonly onPageSizeChange: (
        pageSize: number,
    ) => void;
}

export default function PaginationToolbar({
    currentPage,
    pageSize,
    totalItems,
    pageSizeOptions,
    disabled = false,
    className,
    actions,
    onPageSizeChange,
}: PaginationToolbarProps) {
    return (
        <div
            className={clsx(
                styles.toolbar,
                className,
            )}
        >
            <PaginationInfo
                currentPage={currentPage}
                pageSize={pageSize}
                totalItems={totalItems}
            />

            <div className={styles.right}>
                {actions}

                <PageSizeSelect
                    value={pageSize}
                    options={pageSizeOptions}
                    disabled={disabled}
                    onChange={onPageSizeChange}
                />
            </div>
        </div>
    );
}