"use client";

import type { ReactNode } from "react";
import clsx from "clsx";

import styles from "./ContentArea.module.css";

export interface ContentAreaProps {
    readonly children: ReactNode;
    readonly className?: string;
    readonly fluid?: boolean;
}

export default function ContentArea({
    children,
    className,
    fluid = false,
}: ContentAreaProps) {
    return (
        <section
            className={clsx(
                styles.contentArea,
                fluid && styles.fluid,
                className,
            )}
        >
            {children}
        </section>
    );
}