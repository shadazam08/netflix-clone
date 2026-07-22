import { Card } from "@/components/ui/card";
import { ContentArea, AdminBreadcrumb } from "@/components/layout/admin";

export default function Loading() {
    return (
        <ContentArea>
            <AdminBreadcrumb
                items={[
                    {
                        label: "Dashboard",
                        href: "/dashboard",
                    },
                    {
                        label: "Movies",
                    },
                ]}
            />

            <Card>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "400px",
                        fontSize: "16px",
                    }}
                >
                    Loading movies...
                </div>
            </Card>
        </ContentArea>
    );
}