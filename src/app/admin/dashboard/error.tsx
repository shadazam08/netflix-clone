"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { ContentArea } from "@/components/layout/admin";

interface ErrorPageProps {
    readonly error: Error & {
        digest?: string;
    };
    readonly reset: () => void;
}

export default function ErrorPage({
    error,
    reset,
}: ErrorPageProps) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <ContentArea>
            <h1>Something went wrong</h1>

            <p>
                An unexpected error occurred while
                loading the dashboard.
            </p>

            <Button
                type="button"
                onClick={reset}
            >
                Try Again
            </Button>
        </ContentArea>
    );
}