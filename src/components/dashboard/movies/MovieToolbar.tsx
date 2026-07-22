"use client";

import { SearchInput } from "@/components/ui/search-input";
import { FilterBar } from "@/components/ui/filter-bar";
import { Button } from "@/components/ui/button";
import { PageSizeSelect } from "@/components/ui/page-size-select";

interface MovieToolbarProps {
    search: string;
    pageSize: number;
    loading?: boolean;

    onSearchChange: (
        value: string,
    ) => void;

    onPageSizeChange: (
        value: number,
    ) => void;

    onCreate: () => void;
}

export default function MovieToolbar({
    search,
    pageSize,
    loading = false,
    onSearchChange,
    onPageSizeChange,
    onCreate,
}: MovieToolbarProps) {
    return (
        <FilterBar>
            <SearchInput
                value={search}
                loading={loading}
                placeholder="Search by title, slug..."
                fullWidth
                onChange={(event) =>
                    onSearchChange(
                        event.target.value,
                    )
                }
            />

            <PageSizeSelect
                value={pageSize}
                disabled={loading}
                onChange={onPageSizeChange}
            />

            <Button
                variant="primary"
                onClick={onCreate}
            >
                Add Movie
            </Button>
        </FilterBar>
    );
}