import Link from "next/link";

export function AdminSidebar() {
    return (
        <aside className="w-64 border-r border-neutral-800 bg-black">
            <div className="border-b border-neutral-800 p-6">
                <h2 className="text-xl font-bold text-red-600">
                    NETFLIX ADMIN
                </h2>
            </div>

            <nav className="space-y-2 p-4">
                <Link
                    href="/admin"
                    className="block rounded-lg px-4 py-3 text-white transition hover:bg-neutral-900"
                >
                    Dashboard
                </Link>

                <Link
                    href="/admin/movies"
                    className="block rounded-lg px-4 py-3 text-white transition hover:bg-neutral-900"
                >
                    Movies
                </Link>
                <Link
                    href="/admin/movies/new"
                    className="block rounded-lg px-4 py-3 text-white transition hover:bg-neutral-900"
                >
                    Add Movie
                </Link>

                <Link
                    href="/admin/series"
                    className="block rounded-lg px-4 py-3 text-white transition hover:bg-neutral-900"
                >
                    Series
                </Link>

                <Link
                    href="/admin/users"
                    className="block rounded-lg px-4 py-3 text-white transition hover:bg-neutral-900"
                >
                    Users
                </Link>
            </nav>
        </aside>
    );
}