import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ContentArea } from "@/components/layout/admin";

export default function NotFound() {
    return (
        <ContentArea>
            <h1>Dashboard Not Found</h1>

            <p>
                The dashboard page you are looking for
                does not exist.
            </p>

            <Link href="/admin">
                <Button type="button">
                    Go to Admin Home
                </Button>
            </Link>
        </ContentArea>
    );
}