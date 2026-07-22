import Link from "next/link";

export default function DashboardNotFound() {
    return (
        <div
            style={{
                padding: 60,
                textAlign: "center",
            }}
        >
            <h1>404</h1>

            <h2>
                Page Not Found
            </h2>

            <p
                style={{
                    marginTop: 12,
                }}
            >
                The requested dashboard page does not exist.
            </p>

            <Link
                href="/dashboard"
                style={{
                    display: "inline-block",
                    marginTop: 24,
                }}
            >
                Back to Dashboard
            </Link>
        </div>
    );
}