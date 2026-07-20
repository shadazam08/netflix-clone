import type { ReactNode } from "react";

import {
    AdminLayout,
    ContentArea,
    Sidebar,
    SidebarFooter,
    SidebarGroup,
    SidebarItem,
    Topbar,
} from "@/components/layout/admin";

export default function DashboardLayout({
    children,
}: {
    readonly children: ReactNode;
}) {
    return (
        <AdminLayout
            sidebar={
                <Sidebar
                    title="Netflix Admin"
                    footer={
                        <SidebarFooter>
                            Version 1.0.0
                        </SidebarFooter>
                    }
                >
                    <SidebarGroup title="Dashboard">
                        <SidebarItem
                            href="/admin/dashboard"
                            label="Dashboard"
                            active
                        />
                    </SidebarGroup>

                    <SidebarGroup title="Content">
                        <SidebarItem
                            href="/admin/content"
                            label="Content"
                        />

                        <SidebarItem
                            href="/admin/movies"
                            label="Movies"
                        />

                        <SidebarItem
                            href="/admin/tv-shows"
                            label="TV Shows"
                        />
                    </SidebarGroup>

                    <SidebarGroup title="Settings">
                        <SidebarItem
                            href="/admin/users"
                            label="Users"
                        />

                        <SidebarItem
                            href="/admin/system-settings"
                            label="System Settings"
                        />
                    </SidebarGroup>
                </Sidebar>
            }
            header={
                <Topbar
                    title="Dashboard"
                    subtitle="Netflix Admin Panel"
                />
            }
        >
            <ContentArea>
                {children}
            </ContentArea>
        </AdminLayout>
    );
}