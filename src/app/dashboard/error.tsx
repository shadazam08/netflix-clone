"use client";

export default function DashboardError({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <div
            style={{
                padding: 40,
                textAlign: "center",
            }}
        >
            <h1>
                Something went wrong
            </h1>

            <p
                style={{
                    marginTop: 12,
                }}
            >
                {error.message}
            </p>

            <button
                type="button"
                onClick={reset}
                style={{
                    marginTop: 24,
                    padding: "12px 20px",
                    cursor: "pointer",
                }}
            >
                Try Again
            </button>
        </div>
    );
}