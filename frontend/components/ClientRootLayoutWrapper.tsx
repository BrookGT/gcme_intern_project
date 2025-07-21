"use client";
import { usePathname } from "next/navigation";
import ClientLayoutWrapper from "./ClientLayoutWrapper";

export default function ClientRootLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAuthPage =
        pathname.startsWith("/auth/signin") ||
        pathname.startsWith("/auth/signup");
    if (isAuthPage) {
        return <>{children}</>;
    }
    return <ClientLayoutWrapper>{children}</ClientLayoutWrapper>;
}
