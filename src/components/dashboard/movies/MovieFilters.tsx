"use client";

import { FilterBar } from "@/components/ui/filter-bar";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface MovieFiltersProps {
    status: string;
    visibility: string;
    featured: boolean;
    trending: boolean;

    onStatusChange: (
        value: string,
    ) => void;

    onVisibilityChange: (
        value: string,
    ) => void;

    onFeaturedChange: (
        value: boolean,
    ) => void;

    onTrendingChange: (
        value: boolean,
    ) => void;
}

export default function MovieFilters({
    status,
    visibility,
    featured,
    trending,
    onStatusChange,
    onVisibilityChange,
    onFeaturedChange,
    onTrendingChange,
}: MovieFiltersProps) {
    return (
        <FilterBar>
            <Select
                value={status}
                onChange={(event) =>
                    onStatusChange(
                        event.target.value,
                    )
                }
            >
                <option value="">
                    All Status
                </option>

                <option value="DRAFT">
                    Draft
                </option>

                <option value="PUBLISHED">
                    Published
                </option>

                <option value="INACTIVE">
                    Inactive
                </option>
            </Select>

            <Select
                value={visibility}
                onChange={(event) =>
                    onVisibilityChange(
                        event.target.value,
                    )
                }
            >
                <option value="">
                    All Visibility
                </option>

                <option value="PUBLIC">
                    Public
                </option>

                <option value="PREMIUM">
                    Premium
                </option>
            </Select>

            <Switch
                checked={featured}
                label="Featured"
                onChange={(event) =>
                    onFeaturedChange(
                        event.target.checked
                    )
                }
            />

            <Switch
                checked={trending}
                label="Trending"
                onChange={(event) =>
                    onTrendingChange(
                        event.target.checked
                    )
                }
            />
        </FilterBar>
    );
}