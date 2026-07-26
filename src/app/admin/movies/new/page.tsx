import { ContentForm } from "@/components/admin/content-form";

export default function NewMoviePage() {
    return (
        <div className="mx-auto max-w-5xl">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">
                        Add Movie
                    </h1>

                    <p className="mt-2 text-neutral-400">
                        Create a new movie.
                    </p>
                </div>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6">
                <ContentForm type="MOVIE" />
            </div>
        </div>
    );
}