"use client";

import type { ReactNode } from "react";

import AdminLayout, {
    type AdminLayoutProps,
} from "./AdminLayout";

export interface DashboardLayoutProps
    extends Omit<
        AdminLayoutProps,
        "children"
    > {
    readonly children: ReactNode;
}

export default function DashboardLayout({
    sidebar,
    header,
    children,
}: DashboardLayoutProps) {
    return (
        <AdminLayout
            sidebar={sidebar}
            header={header}
        >
            {children}
        </AdminLayout>
    );
}