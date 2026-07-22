"use client";

import Image from "next/image";

import type {
    MovieDetailsDto,
} from "@/server/dto";

import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableHeaderCell,
    TableCell,
    TableActions,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface MovieTableProps {
    movies: MovieDetailsDto[];
    loading: boolean;

    onView: (
        movie: MovieDetailsDto
    ) => void;

    onEdit: (
        movie: MovieDetailsDto
    ) => void;

    onDelete: (
        movie: MovieDetailsDto
    ) => void;
}

export default function MovieTable({
    movies,
    loading,
    onView,
    onEdit,
    onDelete,
}: MovieTableProps) {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeaderCell>
                        Poster
                    </TableHeaderCell>

                    <TableHeaderCell>
                        Title
                    </TableHeaderCell>

                    <TableHeaderCell>
                        Status
                    </TableHeaderCell>

                    <TableHeaderCell>
                        Visibility
                    </TableHeaderCell>

                    <TableHeaderCell>
                        Featured
                    </TableHeaderCell>

                    <TableHeaderCell>
                        Trending
                    </TableHeaderCell>

                    <TableHeaderCell>
                        Actions
                    </TableHeaderCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {movies.map((movie) => (
                    <TableRow key={movie.id}>
                        <TableCell>
                            {movie.posterUrl ? (
                                <Image
                                    src={movie.posterUrl}
                                    alt={movie.title}
                                    width={60}
                                    height={90}
                                    style={{
                                        borderRadius: 8,
                                        objectFit: "cover",
                                    }}
                                />
                            ) : (
                                <div
                                    style={{
                                        width: 60,
                                        height: 90,
                                        border: "1px solid #444",
                                        borderRadius: 8,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontSize: 12,
                                    }}
                                >
                                    No Image
                                </div>
                            )}
                        </TableCell>

                        <TableCell>
                            <strong>
                                {movie.title}
                            </strong>

                            <br />

                            <small>
                                {movie.slug}
                            </small>
                        </TableCell>

                        <TableCell>
                            <Badge>
                                {movie.status}
                            </Badge>
                        </TableCell>

                        <TableCell>
                            <Badge>
                                {movie.visibility}
                            </Badge>
                        </TableCell>

                        <TableCell>
                            {movie.isFeatured
                                ? "Yes"
                                : "No"}
                        </TableCell>

                        <TableCell>
                            {movie.isTrending
                                ? "Yes"
                                : "No"}
                        </TableCell>

                        <TableCell>
                            <TableActions>
                                <Button
                                    variant="secondary"
                                    size="small"
                                    onClick={() =>
                                        onView(movie)
                                    }
                                >
                                    View
                                </Button>

                                <Button
                                    variant="warning"
                                    size="small"
                                    onClick={() =>
                                        onEdit(movie)
                                    }
                                >
                                    Edit
                                </Button>

                                <Button
                                    variant="danger"
                                    size="small"
                                    loading={loading}
                                    onClick={() =>
                                        onDelete(movie)
                                    }
                                >
                                    Delete
                                </Button>
                            </TableActions>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}