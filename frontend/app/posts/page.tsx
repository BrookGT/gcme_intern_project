"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Post {
    id: number;
    title: string;
    content: string;
    published: boolean;
    author: {
        name: string | null;
        email: string;
    };
}

export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("http://localhost:3001/posts");
                if (!response.ok) {
                    throw new Error("Failed to fetch posts.");
                }
                const data = await response.json();
                setPosts(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (isLoading) {
        return (
            <div className="text-center text-xl font-semibold">
                Loading posts...
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
                <h2 className="text-3xl font-bold text-black">All Posts</h2>
                <Link
                    href="/posts/create"
                    className="bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition"
                >
                    Create New Post
                </Link>
            </div>
            {posts.length === 0 ? (
                <div className="text-center text-gray-700 font-medium bg-white/60 p-8 rounded-xl shadow">
                    No posts found. Why not create one?
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
                            <div className="text-sm text-gray-600 mt-4">
                                By{" "}
                                <span className="font-semibold text-purple-800">
                                    {post.author.name || "Anonymous"}
                                </span>
                            </div>
                            <Link
                                href={`/posts/${post.id}`}
                                className="text-purple-600 hover:underline text-sm mt-2 self-end font-semibold"
                            >
                                Read More &rarr;
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
