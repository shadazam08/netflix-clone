import Link from "next/link";

import { MovieTable } from "@/components/admin/movie-table";
import { Button } from "@/components/ui/button";
import { listMovies } from "@/services/content.service";

export default async function MoviesPage() {
    const movies = await listMovies();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">
                        Movies
                    </h1>

                    <p className="mt-2 text-neutral-400">
                        Manage your movie catalog.
                    </p>
                </div>

                <Link href="/admin/movies/create">
                    <Button>
                        Add Movie
                    </Button>
                </Link>
            </div>

            <MovieTable movies={movies} />
        </div>
    );
}