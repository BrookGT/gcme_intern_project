"use client";
import { usePathname } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/authcontext/AuthContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

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

    if (isLoading) return <LoadingSpinner />;
    if (isAuthPage) return <>{children}</>;
    return <MainLayout>{children}</MainLayout>;
}
