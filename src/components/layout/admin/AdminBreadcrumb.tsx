"use client";

import {
    Breadcrumb,
    type BreadcrumbItem,
} from "@/components/ui/breadcrumb";

export interface AdminBreadcrumbProps {
    readonly items: readonly BreadcrumbItem[];
}

export default function AdminBreadcrumb({
    items,
}: AdminBreadcrumbProps) {
    return (
        <Breadcrumb
            items={items}
        />
    );
}