import {prisma} from "@/server/db/prisma";

export interface DashboardStats {
    totalUsers: number;
    totalProfiles: number;
    totalMovies: number;
    totalTvShows: number;
}

export interface DashboardRecentContent {
    id: string;
    title: string;
    type: "MOVIE" | "TV_SHOW";
    createdAt: Date;
}

export interface DashboardRecentUser {
    id: string;
    email: string;
    createdAt: Date;
}

export interface DashboardData {
    stats: DashboardStats;
    recentContent: DashboardRecentContent[];
    recentUsers: DashboardRecentUser[];
}

class DashboardService {
    async getDashboardData(): Promise<DashboardData> {
        const [
            totalUsers,
            totalProfiles,
            totalMovies,
            totalTvShows,
            recentMovies,
            recentTvShows,
            recentUsers,
        ] = await Promise.all([
            prisma.user.count(),
            prisma.profile.count(),
            prisma.movie.count(),
            prisma.tvShow.count(),

            prisma.movie.findMany({
                take: 5,
                orderBy: {
                    createdAt: "desc",
                },
                include: {
                    content: {
                        select: {
                            title: true,
                        },
                    },
                },
            }),

            prisma.tvShow.findMany({
                take: 5,
                orderBy: {
                    createdAt: "desc",
                },
                include: {
                    content: {
                        select: {
                            title: true,
                        },
                    },
                },
            }),

            prisma.user.findMany({
                take: 5,
                orderBy: {
                    createdAt: "desc",
                },
                select: {
                    id: true,
                    email: true,
                    createdAt: true,
                },
            }),
        ]);

        const recentContent: DashboardRecentContent[] = [
            ...recentMovies.map((movie) => ({
                id: movie.id,
                title: movie.content.title,
                type: "MOVIE" as const,
                createdAt: movie.createdAt,
            })),

            ...recentTvShows.map((show) => ({
                id: show.id,
                title: show.content.title,
                type: "TV_SHOW" as const,
                createdAt: show.createdAt,
            })),
        ]
            .sort(
                (a, b) =>
                    b.createdAt.getTime() -
                    a.createdAt.getTime(),
            )
            .slice(0, 10);

        return {
            stats: {
                totalUsers,
                totalProfiles,
                totalMovies,
                totalTvShows,
            },

            recentContent,

            recentUsers,
        };
    }
}

export const dashboardService = new DashboardService();