"use client";
import { usePathname } from "next/navigation";
import MainLayout from "@/components/templates/MainLayout";
import { useAuth } from "@/lib/AuthContext";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";

export default function ClientRootLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isLoading } = useAuth();
    const pathname = usePathname();
    const isAuthPage =
        pathname.startsWith("/auth/signin") ||
        pathname.startsWith("/auth/signup");

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isAuthPage) {
        return <>{children}</>;
    }

    return <MainLayout>{children}</MainLayout>;
}
