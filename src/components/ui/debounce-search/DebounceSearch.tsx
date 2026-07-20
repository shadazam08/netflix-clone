"use client";

import { useEffect, useState } from "react";

import { SearchInput } from "@/components/ui/search-input";

export interface DebounceSearchProps {
    readonly value?: string;
    readonly delay?: number;
    readonly placeholder?: string;
    readonly disabled?: boolean;
    readonly fullWidth?: boolean;
    readonly className?: string;
    readonly onSearch: (value: string) => void;
}

export default function DebounceSearch({
    value = "",
    delay = 500,
    placeholder = "Search...",
    disabled = false,
    fullWidth = true,
    className,
    onSearch,
}: DebounceSearchProps) {
    const [search, setSearch] = useState(value);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            onSearch(search);
        }, delay);

        return () => {
            window.clearTimeout(timer);
        };
    }, [delay, onSearch, search]);

    return (
        <SearchInput
            value={search}
            placeholder={placeholder}
            disabled={disabled}
            fullWidth={fullWidth}
            className={className}
            onChange={(event) => {
                setSearch(event.target.value);
            }}
        />
    );
}