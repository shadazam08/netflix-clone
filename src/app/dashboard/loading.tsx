export default function DashboardLoading() {
    return (
        <div
            style={{
                display: "grid",
                gap: "24px",
            }}
        >
            <div
                style={{
                    height: 36,
                    width: 240,
                    borderRadius: 8,
                    background: "#202020",
                }}
            />

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(220px,1fr))",
                    gap: 20,
                }}
            >
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        style={{
                            height: 140,
                            borderRadius: 12,
                            background: "#202020",
                        }}
                    />
                ))}
            </div>

            <div
                style={{
                    height: 320,
                    borderRadius: 12,
                    background: "#202020",
                }}
            />
        </div>
    );
}