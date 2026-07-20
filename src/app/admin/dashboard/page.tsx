import { dashboardService } from "@/server/services/dashboard.service";

import styles from "./page.module.css";

export default async function DashboardPage() {
    const { stats, recentContent, recentUsers } =
        await dashboardService.getDashboardData();

    return (
        <div className={styles.dashboard}>
            <section className={styles.grid}>
                <article className={styles.card}>
                    <span className={styles.label}>Movies</span>

                    <strong className={styles.value}>
                        {stats.totalMovies}
                    </strong>
                </article>

                <article className={styles.card}>
                    <span className={styles.label}>TV Shows</span>

                    <strong className={styles.value}>
                        {stats.totalTvShows}
                    </strong>
                </article>

                <article className={styles.card}>
                    <span className={styles.label}>Users</span>

                    <strong className={styles.value}>
                        {stats.totalUsers}
                    </strong>
                </article>

                <article className={styles.card}>
                    <span className={styles.label}>Profiles</span>

                    <strong className={styles.value}>
                        {stats.totalProfiles}
                    </strong>
                </article>
            </section>

            <section className={styles.section}>
                <div className={styles.panel}>
                    <h2 className={styles.panelTitle}>
                        Recent Content
                    </h2>

                    <div className={styles.list}>
                        {recentContent.length === 0 ? (
                            <p className={styles.empty}>
                                No content found.
                            </p>
                        ) : (
                            recentContent.map((content) => (
                                <div
                                    key={`${content.type}-${content.id}`}
                                    className={styles.item}
                                >
                                    <div>
                                        <div className={styles.title}>
                                            {content.title}
                                        </div>

                                        <div className={styles.meta}>
                                            {content.createdAt.toLocaleDateString()}
                                        </div>
                                    </div>

                                    <span className={styles.badge}>
                                        {content.type === "MOVIE"
                                            ? "Movie"
                                            : "TV Show"}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className={styles.panel}>
                    <h2 className={styles.panelTitle}>
                        Recent Users
                    </h2>

                    <div className={styles.list}>
                        {recentUsers.length === 0 ? (
                            <p className={styles.empty}>
                                No users found.
                            </p>
                        ) : (
                            recentUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className={styles.item}
                                >
                                    <div>
                                        <div className={styles.title}>
                                            {user.email}
                                        </div>

                                        {/* <div className={styles.meta}>
                                            {user.email}
                                        </div> */}
                                    </div>

                                    <div className={styles.meta}>
                                        {user.createdAt.toLocaleDateString()}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}