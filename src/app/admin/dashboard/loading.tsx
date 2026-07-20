import { Loader } from "@/components/ui/loader";
import { ContentArea } from "@/components/layout/admin";

export default function Loading() {
    return (
        <ContentArea>
            <Loader />

            <p>Loading dashboard...</p>
        </ContentArea>
    );
}