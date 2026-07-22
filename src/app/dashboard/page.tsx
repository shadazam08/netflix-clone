import { auth } from "@/auth";

import {
    ContentArea,
    AdminBreadcrumb,
} from "@/components/layout/admin";

export default async function DashboardPage() {
    const session = await auth();

    const totalUsers = 0;
    const totalMovies = 0;
    const totalTvShows = 0;
    const totalCategories = 0;

    return (
        <ContentArea>
            <AdminBreadcrumb
                items={[
                    {
                        label: "Dashboard",
                        href: "/dashboard",
                    },
                ]}
            />

            <section>
                <h2>
                    Welcome{session?.user?.name ? `, ${session.user.name}` : ""}
                </h2>

                <p>
                    Netflix Admin Dashboard
                </p>
            </section>

            <section
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(220px,1fr))",
                    gap: "20px",
                    marginTop: "32px",
                }}
            >
                <article
                    style={{
                        padding: "24px",
                        borderRadius: "12px",
                        border: "1px solid #2f2f2f",
                    }}
                >
                    <h3>Total Movies</h3>

                    <h1>{totalMovies}</h1>
                </article>

                <article
                    style={{
                        padding: "24px",
                        borderRadius: "12px",
                        border: "1px solid #2f2f2f",
                    }}
                >
                    <h3>Total TV Shows</h3>

                    <h1>{totalTvShows}</h1>
                </article>

                <article
                    style={{
                        padding: "24px",
                        borderRadius: "12px",
                        border: "1px solid #2f2f2f",
                    }}
                >
                    <h3>Total Categories</h3>

                    <h1>{totalCategories}</h1>
                </article>

                <article
                    style={{
                        padding: "24px",
                        borderRadius: "12px",
                        border: "1px solid #2f2f2f",
                    }}
                >
                    <h3>Total Users</h3>

                    <h1>{totalUsers}</h1>
                </article>
            </section>

            <section
                style={{
                    marginTop: "40px",
                }}
            >
                <h3>Quick Overview</h3>

                <p>
                    Welcome to the Netflix Administration Panel.
                    Content statistics, recent activities,
                    charts and analytics will be integrated
                    here using the existing services.
                </p>
            </section>
        </ContentArea>
    );
}