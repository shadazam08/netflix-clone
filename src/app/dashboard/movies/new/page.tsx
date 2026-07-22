import { auth } from "@/auth";

import { redirect } from "next/navigation";

import { ContentArea, AdminBreadcrumb } from "@/components/layout/admin";


import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function NewMoviePage() {
    const session = await auth();

    if (
        !session ||
        !session.user ||
        (
            session.user.role !==
            "ADMIN" &&
            session.user.role !==
            "SUPER_ADMIN"
        )
    ) {
        redirect("/login");
    }

    return (
        <ContentArea>

            <AdminBreadcrumb
                items={[
                    {
                        label: "Dashboard",
                        href: "/dashboard",
                    },
                    {
                        label: "Movies",
                        href: "/dashboard/movies",
                    },
                    {
                        label: "New",
                    },
                ]}
            />

            <PageHeader
                title="Create Movie"
                description="Create a new movie in the catalog."
                actions={
                    <Link href="/dashboard/movies">
                        <Button
                            variant="secondary"
                        >
                            Back
                        </Button>
                    </Link>
                }
            />

            <Card>
                <div
                    style={{
                        padding: "40px",
                        textAlign: "center",
                    }}
                >
                    <h2>
                        Movie Creation Form
                    </h2>

                    <p
                        style={{
                            marginTop: "12px",
                        }}
                    >
                        This page will contain the
                        complete movie creation
                        form.
                    </p>

                    <p
                        style={{
                            marginTop: "8px",
                            opacity: 0.7,
                        }}
                    >
                        Fields will include title,
                        slug, description, media,
                        release date, genres,
                        languages, visibility,
                        status, featured,
                        trending, cast, crew and
                        all other movie metadata.
                    </p>
                </div>
            </Card>

        </ContentArea>
    );
}