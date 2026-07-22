import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

import {
    DashboardLayout,
    Sidebar,
    SidebarGroup,
    SidebarItem,
    SidebarFooter,
    Topbar,
    UserMenu,
    NotificationButton,
    MobileSidebar,
} from "@/components/layout/admin";

export default async function Layout({
    children,
}: {
    children: ReactNode;
}) {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    if (
        session.user.role !== "SUPER_ADMIN" &&
        session.user.role !== "ADMIN"
    ) {
        redirect("/login");
    }

    const sidebar = (
        <Sidebar
            title="Netflix Admin"
            footer={
                <SidebarFooter>
                    <small>
                        Version 1.0.0
                    </small>
                </SidebarFooter>
            }
        >
            <SidebarGroup title="Main">
                <SidebarItem
                    href="/dashboard"
                    label="Dashboard"
                    active
                />

                <SidebarItem
                    href="/dashboard/movies"
                    label="Movies"
                />

                <SidebarItem
                    href="/dashboard/tv-shows"
                    label="TV Shows"
                />

                <SidebarItem
                    href="/dashboard/categories"
                    label="Categories"
                />

                <SidebarItem
                    href="/dashboard/genres"
                    label="Genres"
                />

                <SidebarItem
                    href="/dashboard/languages"
                    label="Languages"
                />

                <SidebarItem
                    href="/dashboard/studios"
                    label="Studios"
                />
            </SidebarGroup>

            <SidebarGroup title="Content">
                <SidebarItem
                    href="/dashboard/media"
                    label="Media"
                />

                <SidebarItem
                    href="/dashboard/homepage"
                    label="Homepage"
                />

                <SidebarItem
                    href="/dashboard/tags"
                    label="Tags"
                />
            </SidebarGroup>

            <SidebarGroup title="System">
                <SidebarItem
                    href="/dashboard/users"
                    label="Users"
                />

                <SidebarItem
                    href="/dashboard/roles"
                    label="Roles"
                />

                <SidebarItem
                    href="/dashboard/permissions"
                    label="Permissions"
                />

                <SidebarItem
                    href="/dashboard/settings"
                    label="Settings"
                />
            </SidebarGroup>
        </Sidebar>
    );

    const header = (
        <Topbar
            title="Dashboard"
            subtitle="Netflix Administration"
            right={
                <>
                    <NotificationButton count={4} />

                    <UserMenu
                        name={
                            session.user.name ??
                            "Administrator"
                        }
                        email={
                            session.user.email ??
                            undefined
                        }
                    />
                </>
            }
        />
    );

    return (
        <DashboardLayout
            sidebar={sidebar}
            header={header}
        >
            {children}
        </DashboardLayout>
    );
}