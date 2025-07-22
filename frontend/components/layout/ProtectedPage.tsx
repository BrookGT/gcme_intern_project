"use client";
import { useAuth } from "@/authcontext/AuthContext";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useEffect } from "react";

export default function ProtectedPage({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace("/auth/signin");
        }
    }, [isLoading, user, router]);

    if (isLoading || !user) {
        // Show spinner while checking or redirecting
        return <LoadingSpinner />;
    }

    return <>{children}</>;
}
