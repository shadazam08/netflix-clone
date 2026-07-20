"use client";

import { useMemo, useState } from "react";

import { Dropdown } from "@/components/ui/dropdown";

import type {
    DropdownOption,
    DropdownProps,
} from "./Dropdown";

export interface DropdownSearchProps
    extends Omit<
        DropdownProps,
        "options"
    > {
    readonly options: readonly DropdownOption[];
}

export default function DropdownSearch({
    options,
    ...props
}: DropdownSearchProps) {
    const [search, setSearch] =
        useState("");

    const filteredOptions =
        useMemo(() => {
            const keyword =
                search.trim().toLowerCase();

            if (!keyword) {
                return options;
            }

            return options.filter(
                (option) =>
                    option.label
                        .toLowerCase()
                        .includes(keyword),
            );
        }, [options, search]);

    return (
        <>
            <input
                type="search"
                value={search}
                placeholder="Search..."
                onChange={(event) =>
                    setSearch(
                        event.target.value,
                    )
                }
            />

            <Dropdown
                {...props}
                options={filteredOptions}
            />
        </>
    );
}