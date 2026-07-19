"use client";

import type { MouseEvent, ReactNode } from "react";

import clsx from "clsx";

import styles from "./Modal.module.css";

export interface ModalProps {
    readonly open: boolean;
    readonly title: string;
    readonly children: ReactNode;
    readonly footer?: ReactNode;
    readonly width?: "small" | "medium" | "large" | "xlarge";
    readonly closeOnOverlayClick?: boolean;
    readonly onClose: () => void;
}

export default function Modal({
    open,
    title,
    children,
    footer,
    width = "medium",
    closeOnOverlayClick = true,
    onClose,
}: ModalProps) {
    if (!open) {
        return null;
    }

    function handleOverlayClick(
        event: MouseEvent<HTMLDivElement>,
    ) {
        if (
            closeOnOverlayClick &&
            event.target === event.currentTarget
        ) {
            onClose();
        }
    }

    return (
        <div
            className={styles.overlay}
            onClick={handleOverlayClick}
            role="presentation"
        >
            <div
                className={clsx(
                    styles.modal,
                    styles[width],
                )}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <header className={styles.header}>
                    <h2
                        id="modal-title"
                        className={styles.title}
                    >
                        {title}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className={styles.closeButton}
                        aria-label="Close modal"
                    >
                        ×
                    </button>
                </header>

                <div className={styles.body}>
                    {children}
                </div>

                {footer && (
                    <footer className={styles.footer}>
                        {footer}
                    </footer>
                )}
            </div>
        </div>
    );
}