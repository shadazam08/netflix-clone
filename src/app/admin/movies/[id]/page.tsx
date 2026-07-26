import Link from "next/link";
import { notFound } from "next/navigation";

import { DeleteMovieButton } from "@/components/admin/delete-movie-button";
import { Button } from "@/components/ui/button";
import { findMovieById } from "@/services/content.service";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function MovieDetailsPage({
    params,
}: PageProps) {
    const { id } = await params;

    const movie = await findMovieById(id);

    if (!movie) {
        notFound();
    }

    return (
        <div className="space-y-8">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">
                        {movie.title}
                    </h1>

                    <p className="mt-2 text-neutral-400">
                        Movie Details
                    </p>
                </div>

                <div className="flex gap-3">
                    <Link href={`/admin/movies/${movie.id}/edit`}>
                        <Button variant="secondary">
                            Edit
                        </Button>
                    </Link>

                    <DeleteMovieButton
                        movieId={movie.id}
                    />

                    <Link href="/admin/movies">
                        <Button variant="secondary">
                            Back
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-950">
                <div className="grid grid-cols-2 gap-6 p-6">
                    <div>
                        <p className="text-sm text-neutral-500">
                            Title
                        </p>

                        <p className="mt-1 text-white">
                            {movie.title}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-neutral-500">
                            Slug
                        </p>

                        <p className="mt-1 break-all text-white">
                            {movie.slug}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-neutral-500">
                            Status
                        </p>

                        <p className="mt-1 text-white">
                            {movie.status}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-neutral-500">
                            Visibility
                        </p>

                        <p className="mt-1 text-white">
                            {movie.visibility}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-neutral-500">
                            Duration
                        </p>

                        <p className="mt-1 text-white">
                            {movie.duration ?? "-"} Minutes
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-neutral-500">
                            Age Rating
                        </p>

                        <p className="mt-1 text-white">
                            {movie.ageRating ?? "-"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-neutral-500">
                            Release Date
                        </p>

                        <p className="mt-1 text-white">
                            {movie.releaseDate
                                ? movie.releaseDate.toLocaleDateString()
                                : "-"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-neutral-500">
                            Featured
                        </p>

                        <p className="mt-1 text-white">
                            {movie.isFeatured ? "Yes" : "No"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-neutral-500">
                            Trending
                        </p>

                        <p className="mt-1 text-white">
                            {movie.isTrending ? "Yes" : "No"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-neutral-500">
                            Created
                        </p>

                        <p className="mt-1 text-white">
                            {movie.createdAt.toLocaleString()}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-neutral-500">
                            Updated
                        </p>

                        <p className="mt-1 text-white">
                            {movie.updatedAt.toLocaleString()}
                        </p>
                    </div>

                    <div className="col-span-2">
                        <p className="text-sm text-neutral-500">
                            Description
                        </p>

                        <p className="mt-2 whitespace-pre-wrap text-white">
                            {movie.description ?? "-"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}