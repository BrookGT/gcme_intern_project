"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export default function ClientLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const hideHeaderFooter =
        pathname.startsWith("/auth/signin") ||
        pathname.startsWith("/auth/signup");

    const handleLogout = useCallback(() => {
        if (window.confirm("Are you sure you want to log out?")) {
            // TODO: Clear session when backend is integrated
            router.push("/auth/signin");
        }
    }, [router]);

    const navLinkClass = (href: string) =>
        `relative px-3 py-1 rounded-lg font-medium transition-all duration-200
        ${
            pathname === href
                ? "bg-white/80 text-purple-700 shadow active"
                : "text-white hover:bg-white/30 hover:text-purple-100"
        }
        focus:outline-none focus:ring-2 focus:ring-purple-400`;

    return (
        <>
            {!hideHeaderFooter && (
                <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-purple-200 via-blue-100 to-green-100 overflow-hidden">
                    <header className="bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md">
                        <nav className="container mx-auto flex justify-between items-center py-4 px-6">
                            <Link
                                href="/home"
                                className="text-2xl font-bold tracking-tight select-none"
                            >
                                GCME Blog
                            </Link>
                            <div className="flex gap-3 items-center">
                                <Link
                                    href="/home"
                                    className={navLinkClass("/home")}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/posts"
                                    className={navLinkClass("/posts")}
                                >
                                    Posts
                                </Link>
                                <Link
                                    href="/posts/me"
                                    className={navLinkClass("/posts/me")}
                                >
                                    My Posts
                                </Link>
                                <button
                                    className="ml-2 px-3 py-1 rounded-lg font-medium bg-white/80 text-purple-700 shadow transition-all duration-200 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        </nav>
                    </header>
                    <main className="flex-1 flex items-center justify-center container mx-auto px-4 py-8">
                        {children}
                    </main>
                    <footer className="bg-gray-200 text-gray-700 py-4 text-center mt-8 shadow-inner">
                        &copy; {new Date().getFullYear()} GCME Blog. All rights
                        reserved.
                    </footer>
                </div>
            )}
            {hideHeaderFooter && (
                <main className="flex-1 container mx-auto px-4 py-8">
                    {children}
                </main>
            )}
        </>
    );
}
