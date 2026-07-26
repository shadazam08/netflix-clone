import { notFound } from "next/navigation";

import { ContentForm } from "@/components/admin/content-form";
import { findMovieById } from "@/services/content.service";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditMoviePage({
    params,
}: PageProps) {
    const { id } = await params;

    const movie = await findMovieById(id);

    if (!movie) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">
                    Edit Movie
                </h1>

                <p className="mt-2 text-neutral-400">
                    Update movie information.
                </p>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6">
                <ContentForm
                    mode="edit"
                    type="MOVIE"
                    defaultValues={{
                        id: movie.id,
                        type: movie.type,
                        title: movie.title,
                        shortDescription:
                            movie.shortDescription ?? "",
                        description:
                            movie.description ?? "",
                        releaseDate:
                            movie.releaseDate ?? undefined,
                        duration:
                            movie.duration ?? undefined,
                        ageRating:
                            movie.ageRating ?? "",
                        status: movie.status,
                    }}
                />
            </div>
        </div>
    );
}