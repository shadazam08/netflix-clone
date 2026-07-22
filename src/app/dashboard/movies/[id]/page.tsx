import { auth } from "@/auth";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { ContentArea, AdminBreadcrumb } from "@/components/layout/admin";


import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MovieDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function MovieDetailsPage({
    params,
}: MovieDetailsPageProps) {
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
                    },
                ]}
            />

            <PageHeader
                title={movie.content.title}
                description={
                    movie.content.description
                }
                actions={
                    <Link
                        href={`/dashboard/movies/${movie.id}/edit`}
                    >
                        <Button
                            variant="secondary"
                        >
                            Edit Movie
                        </Button>
                    </Link>

                }
            />

            <Card>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "220px 1fr",
                        gap: "32px",
                    }}
                >

                    <div>

                        {movie.content.poster ? (
                            <img
                                src={
                                    movie.content
                                        .poster
                                }
                                alt={
                                    movie.content
                                        .title
                                }
                                style={{
                                    width: "100%",
                                    borderRadius:
                                        "10px",
                                }}
                            />
                        ) : (
                            <div>
                                No Poster
                            </div>
                        )}

                    </div>

                    <div>

                        <p>
                            <strong>
                                Slug:
                            </strong>{" "}
                            {
                                movie.content
                                    .slug
                            }
                        </p>

                        <p>
                            <strong>
                                Status:
                            </strong>{" "}
                            {
                                movie.content
                                    .status
                            }
                        </p>

                        <p>
                            <strong>
                                Visibility:
                            </strong>{" "}
                            {
                                movie.content
                                    .visibility
                            }
                        </p>

                        <p>
                            <strong>
                                Featured:
                            </strong>{" "}
                            {movie.content
                                .isFeatured
                                ? "Yes"
                                : "No"}
                        </p>

                        <p>
                            <strong>
                                Trending:
                            </strong>{" "}
                            {movie.content
                                .isTrending
                                ? "Yes"
                                : "No"}
                        </p>

                    </div>

                </div>

            </Card>

        </ContentArea>
    );
}