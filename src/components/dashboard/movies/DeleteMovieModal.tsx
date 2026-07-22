"use client";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

import type {
    MovieDetailsDto,
} from "@/server/dto";

interface DeleteMovieModalProps {
    open: boolean;
    movie: MovieDetailsDto | null;
    loading: boolean;

    onClose: () => void;
    onConfirm: () => void | Promise<void>;
}

export default function DeleteMovieModal({
    open,
    movie,
    loading,
    onClose,
    onConfirm,
}: DeleteMovieModalProps) {
    if (!movie) {
        return null;
    }

    return (
        <Modal
            open={open}
            title="Delete Movie"
            width="small"
            onClose={onClose}
            footer={
                <>
                    <Button
                        variant="secondary"
                        disabled={loading}
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="danger"
                        loading={loading}
                        onClick={onConfirm}
                    >
                        Delete
                    </Button>
                </>
            }
        >
            <p>
                Are you sure you want to delete{" "}
                <strong>{movie.title}</strong>?
            </p>

            <p
                style={{
                    marginTop: 12,
                    opacity: 0.7,
                }}
            >
                This action cannot be undone.
            </p>

            {movie.posterUrl && (
                <div
                    style={{
                        marginTop: 20,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        style={{
                            width: 120,
                            borderRadius: 10,
                        }}
                    />
                </div>
            )}
        </Modal>
    );
}