"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { deleteContentAction } from "@/actions/content/delete-content";
import { Button } from "@/components/ui/button";

interface DeleteMovieButtonProps {
    movieId: string;
}

export function DeleteMovieButton({
    movieId,
}: DeleteMovieButtonProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this movie?",
        );

        if (!confirmed) {
            return;
        }

        startTransition(async () => {
            const result = await deleteContentAction(movieId);

            if (!result.success) {
                alert(result.message);
                return;
            }

            router.push("/admin/movies");
            router.refresh();
        });
    };

    return (
        <Button
            variant="danger"
            onClick={handleDelete}
            disabled={isPending}
        >
            {isPending ? "Deleting..." : "Delete"}
        </Button>
    );
}