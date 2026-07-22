"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type {
    MovieDetailsDto,
} from "@/server/dto";

import MovieToolbar from "./MovieToolbar";
import MovieTable from "./MovieTable";
import DeleteMovieModal from "./DeleteMovieModal";

import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";

interface MoviesClientProps {
    initialMovies: MovieDetailsDto[];
}

export type Movie = MovieDetailsDto;

export default function MoviesClient({
    initialMovies,
}: MoviesClientProps) {
    const router = useRouter();

    const [movies, setMovies] =
        useState(initialMovies);

    const [search, setSearch] =
        useState("");

    const [page, setPage] =
        useState(1);

    const [pageSize, setPageSize] =
        useState(10);

    const [loading, setLoading] =
        useState(false);

    const [selectedMovie, setSelectedMovie] =
        useState<Movie | null>(null);

    const filteredMovies =
        useMemo(() => {
            const keyword =
                search.toLowerCase();

            return movies.filter(
                (movie) =>
                    movie.title
                        .toLowerCase()
                        .includes(keyword) ||
                    movie.slug
                        .toLowerCase()
                        .includes(keyword)
            );
        }, [movies, search]);

    const paginatedMovies =
        useMemo(() => {
            const start =
                (page - 1) * pageSize;

            return filteredMovies.slice(
                start,
                start + pageSize
            );
        }, [
            filteredMovies,
            page,
            pageSize,
        ]);

    async function handleDelete() {
        if (!selectedMovie) {
            return;
        }

        try {
            setLoading(true);

            const response =
                await fetch(
                    `/api/movies/${selectedMovie.id}`,
                    {
                        method: "DELETE",
                    }
                );

            if (!response.ok) {
                throw new Error(
                    "Delete failed."
                );
            }

            setMovies((previous) =>
                previous.filter(
                    (movie) =>
                        movie.id !==
                        selectedMovie.id
                )
            );

            setSelectedMovie(null);

            router.refresh();
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <MovieToolbar
                search={search}
                pageSize={pageSize}
                loading={loading}
                onSearchChange={setSearch}
                onPageSizeChange={setPageSize}
                onCreate={() =>
                    router.push(
                        "/dashboard/movies/new"
                    )
                }
            />

            {filteredMovies.length === 0 ? (
                <EmptyState
                    title="No movies found"
                    description="No movie matches your search."
                />
            ) : (
                <>
                    <MovieTable
                        movies={paginatedMovies}
                        loading={loading}
                        onView={(movie) =>
                            router.push(
                                `/dashboard/movies/${movie.id}`
                            )
                        }
                        onEdit={(movie) =>
                            router.push(
                                `/dashboard/movies/${movie.id}/edit`
                            )
                        }
                        onDelete={(movie) =>
                            setSelectedMovie(movie)
                        }
                    />

                    <Pagination
                        currentPage={page}
                        totalPages={Math.max(
                            1,
                            Math.ceil(
                                filteredMovies.length /
                                pageSize
                            )
                        )}
                        onPageChange={setPage}
                    />
                </>
            )}

            <DeleteMovieModal
                open={
                    selectedMovie !== null
                }
                movie={selectedMovie}
                loading={loading}
                onClose={() =>
                    setSelectedMovie(null)
                }
                onConfirm={handleDelete}
            />
        </>
    );
}