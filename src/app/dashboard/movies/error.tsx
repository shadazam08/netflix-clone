"use client";

import { useEffect } from "react";

import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {ContentArea, AdminBreadcrumb} from "@/components/layout/admin";

interface ErrorProps {
    error: Error & {
        digest?: string;
    };
    reset: () => void;
}

export default function Error({
    error,
    reset,
}: ErrorProps) {
    useEffect(() => {
        console.error(error);
    }, [error]);

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
                    },
                ]}
            />

            <Card>
                <div
                    style={{
                        minHeight: "400px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "16px",
                        textAlign: "center",
                    }}
                >
                    <h2>
                        Failed to load movies
                    </h2>

                    <p>
                        {error.message ||
                            "Something went wrong while loading movies."}
                    </p>

                    <Button
                        variant="primary"
                        onClick={reset}
                    >
                        Try Again
                    </Button>
                </div>
            </Card>
        </ContentArea>
    );
}