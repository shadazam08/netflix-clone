import { auth } from "@/auth";

import { notFound, redirect } from "next/navigation";

import { ContentArea, AdminBreadcrumb } from "@/components/layout/admin";


import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface EditMoviePageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditMoviePage({
    params,
}: EditMoviePageProps) {
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

    const { id } = await params;

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/movies/${id}`,
        {
            cache: "no-store",
        },
    );

    if (!response.ok) {
        notFound();
    }

    const result =
        await response.json();

    const movie = result.data;
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
                        label:
                            movie.content.title,
                        href: `/dashboard/movies/${movie.id}`,
                    },
                    {
                        label: "Edit",
                    },
                ]}
            />

            <PageHeader
                title={`Edit ${movie.content.title}`}
                description="Update movie information."
                actions={
                    <Link href={`/dashboard/movies/${movie.id}`}>
                        <Button
                            variant="secondary"
                            
                        >
                            Cancel
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
                        Movie Edit Form
                    </h2>

                    <p
                        style={{
                            marginTop: "12px",
                        }}
                    >
                        This page will contain the
                        complete movie editing
                        form.
                    </p>

                    <p
                        style={{
                            marginTop: "8px",
                            opacity: 0.7,
                        }}
                    >
                        The form will be
                        pre-populated with the
                        existing movie data and
                        allow updating all editable
                        movie fields.
                    </p>
                </div>

            </Card>

        </ContentArea>
    );
}