"use client";

import type {
    ButtonHTMLAttributes,
    ReactNode,
} from "react";

import clsx from "clsx";

import styles from "./Tabs.module.css";

export interface TabItem {
    readonly id: string;
    readonly label: string;
    readonly disabled?: boolean;
}

export interface TabsProps {
    readonly tabs: readonly TabItem[];
    readonly activeTab: string;
    readonly onChange: (tabId: string) => void;
    readonly className?: string;
}

export interface TabButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    readonly active?: boolean;
    readonly children: ReactNode;
}

function TabButton({
    active = false,
    children,
    className,
    ...props
}: TabButtonProps) {
    return (
        <button
            type="button"
            {...props}
            className={clsx(
                styles.tab,
                active && styles.active,
                className,
            )}
        >
            {children}
        </button>
    );
}

export default function Tabs({
    tabs,
    activeTab,
    onChange,
    className,
}: TabsProps) {
    return (
        <div
            className={clsx(
                styles.tabs,
                className,
            )}
            role="tablist"
        >
            {tabs.map((tab) => (
                <TabButton
                    key={tab.id}
                    active={activeTab === tab.id}
                    disabled={tab.disabled}
                    aria-selected={
                        activeTab === tab.id
                    }
                    role="tab"
                    onClick={() =>
                        onChange(tab.id)
                    }
                >
                    {tab.label}
                </TabButton>
            ))}
        </div>
    );
}