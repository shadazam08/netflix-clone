import type { ReactNode } from "react";

import { requireAdmin } from "@/server/auth";

export default async function AdminLayout({
    children,
}: {
    readonly children: ReactNode;
}) {
    await requireAdmin();

    return children;
}