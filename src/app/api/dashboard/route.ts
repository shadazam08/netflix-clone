import { NextResponse } from "next/server";

import { dashboardService } from "@/server/services/dashboard.service";

export async function GET() {
    try {
        const dashboard = await dashboardService.getDashboardData();

        return NextResponse.json(dashboard);
    } catch (error) {
        console.error("Dashboard API Error:", error);

        return NextResponse.json(
            {
                message: "Failed to load dashboard data.",
            },
            {
                status: 500,
            },
        );
    }
}