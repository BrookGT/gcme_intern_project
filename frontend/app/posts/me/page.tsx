"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../../../lib/AuthContext";
import { useRouter } from "next/navigation";

interface Post {
    id: number;
    title: string;
    content: string;
    published: boolean;
}

export default function MyPostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.push("/auth/signin");
            return;
        }

        const fetchMyPosts = async () => {
            try {
                const response = await fetch("http://localhost:3001/posts/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 401) {
                    throw new Error("Unauthorized. Please log in again.");
                }
                if (!response.ok) {
                    throw new Error("Failed to fetch your posts.");
                }

                const data = await response.json();
                setPosts(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMyPosts();
    }, [token, router]);

    const handleDelete = async (id: number) => {
        if (!token) {
            setError("Authentication error.");
            return;
        }

        if (
            window.confirm(
                "Are you sure you want to delete this post? This cannot be undone."
            )
        ) {
            try {
                const response = await fetch(
                    `http://localhost:3001/posts/${id}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to delete post.");
                }

                setPosts(posts.filter((p) => p.id !== id));
            } catch (err: any) {
                setError(err.message);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="text-center text-xl font-semibold">
                Loading your posts...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-xl font-semibold text-red-500">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-black">My Posts</h2>
                <Link
                    href="/posts/create"
                    className="bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition"
                >
                    Create New Post
                </Link>
            </div>
            {posts.length === 0 ? (
                <div className="text-center text-gray-700 font-medium bg-white/60 p-8 rounded-xl shadow">
                    You haven't created any posts yet.
                </div>
            ) : (
                <div className="grid gap-6">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-white/70 backdrop-blur-md rounded-xl shadow p-6 flex flex-col gap-2 border border-white/30"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-semibold text-gray-900">
                                    {post.title}
                                </h3>
                                <span
                                    className={`text-sm px-3 py-1 rounded-full font-medium ${
                                        post.published
                                            ? "bg-green-100 text-green-800"
                                            : "bg-yellow-100 text-yellow-800"
                                    }`}
                                >
                                    {post.published ? "Published" : "Draft"}
                                </span>
                            </div>
                            <p className="text-gray-700 mt-2">
                                {post.content.substring(0, 150)}
                                {post.content.length > 150 ? "..." : ""}
                            </p>
                            <div className="flex gap-4 mt-4 self-end">
                                <Link
                                    href={`/posts/edit/${post.id}`}
                                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition shadow"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(post.id)}
                                    className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition shadow"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
