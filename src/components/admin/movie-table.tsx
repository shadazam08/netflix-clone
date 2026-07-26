import Link from "next/link";

import { DeleteMovieButton } from "@/components/admin/delete-movie-button";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Movie {
    id: string;
    title: string;
    slug: string;
    status: string;
    releaseDate: Date | null;
    createdAt: Date;
}
interface MovieTableProps {
    movies: Movie[];
}

export function MovieTable({
    movies,
}: MovieTableProps) {
    if (movies.length === 0) {
        return (
            <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-10 text-center text-neutral-400">
                No movies found.
            </div>
        );
    }
    return (
        <div className="rounded-xl border border-neutral-800 bg-neutral-950 overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>

                        <TableHead>Status</TableHead>

                        <TableHead>Release Date</TableHead>

                        <TableHead>Created</TableHead>

                        <TableHead className="text-right">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {movies.map((movie) => (
                        <TableRow key={movie.id}>
                            <TableCell className="font-medium">
                                {movie.title}
                            </TableCell>

                            <TableCell>
                                {movie.status}
                            </TableCell>

                            <TableCell>
                                {movie.releaseDate
                                    ? movie.releaseDate.toLocaleDateString()
                                    : "-"}
                            </TableCell>

                            <TableCell>
                                {movie.createdAt.toLocaleDateString()}
                            </TableCell>

                            <TableCell>
                                <div className="flex justify-end items-center gap-2">
                                    <Link href={`/admin/movies/${movie.id}`}>
                                        <Button variant="secondary">
                                            View
                                        </Button>
                                    </Link>

                                    <Link href={`/admin/movies/${movie.id}/edit`}>
                                        <Button variant="secondary">
                                            Edit
                                        </Button>
                                    </Link>

                                    <DeleteMovieButton
                                        movieId={movie.id}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}