"use client";

import {
    useId,
    useState,
    type HTMLAttributes,
    type ReactNode,
} from "react";

import clsx from "clsx";

import styles from "./Tooltip.module.css";

export interface TooltipProps
    extends HTMLAttributes<HTMLDivElement> {
    readonly tooltip: ReactNode;
    readonly children: ReactNode;
    readonly position?:
    | "top"
    | "right"
    | "bottom"
    | "left";
}

export default function Tooltip({
    content,
    children,
    position = "top",
    className,
    ...props
}: TooltipProps) {
    const [open, setOpen] =
        useState(false);

    const tooltipId = useId();

    return (
        <div
            {...props}
            className={clsx(
                styles.container,
                className,
            )}
            onMouseEnter={() =>
                setOpen(true)
            }
            onMouseLeave={() =>
                setOpen(false)
            }
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
        >
            {children}

            {open && (
                <div
                    id={tooltipId}
                    role="tooltip"
                    className={clsx(
                        styles.tooltip,
                        styles[position],
                    )}
                >
                    {content}
                </div>
            )}
        </div>
    );
}