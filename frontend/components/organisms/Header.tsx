"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
import { useAuth } from "@/lib/AuthContext";

export default function Header() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const handleLogout = useCallback(() => {
        if (window.confirm("Are you sure you want to log out?")) {
            logout();
        }
    }, [logout]);

    const navLinkClass = (href: string) =>
        `relative px-3 py-1 rounded-lg font-medium transition-all duration-200
        ${
            pathname === href
                ? "bg-white/80 text-purple-700 shadow active"
                : "text-white hover:bg-white/30 hover:text-purple-100"
        }
        focus:outline-none focus:ring-2 focus:ring-purple-400`;

    return (
        <header className="bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md sticky top-0 z-10">
            <nav className="container mx-auto flex justify-between items-center py-4 px-6">
                <Link
                    href={user ? "/home" : "/"}
                    className="text-2xl font-bold tracking-tight select-none"
                >
                    GCME Blog
                </Link>
                <div className="flex gap-4 items-center">
                    {user ? (
                        <>
                            {user.name && (
                                <span className="text-lg font-medium hidden md:block">
                                    Hi, {user.name}!
                                </span>
                            )}
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
                                className="ml-2 px-3 py-1 rounded-lg font-medium bg-red-500 text-white shadow transition-all duration-200 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400 border border-red-600"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/posts"
                                className={navLinkClass("/posts")}
                            >
                                All Posts
                            </Link>
                            <Link
                                href="/auth/signin"
                                className="ml-2 px-3 py-1 rounded-lg font-medium bg-white/80 text-purple-700 shadow transition-all duration-200 hover:bg-gray-200"
                            >
                                Sign In
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}
