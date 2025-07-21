"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import PostCard from "@/components/molecules/PostCard";
import { useAuth } from "@/lib/AuthContext";

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
    const { user } = useAuth();

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
                {user && (
                    <Link
                        href="/posts/create"
                        className="bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition"
                    >
                        Create New Post
                    </Link>
                )}
            </div>
            {posts.length === 0 ? (
                <div className="text-center text-gray-700 font-medium bg-white/60 p-8 rounded-xl shadow">
                    No posts found. {user ? "Why not create one?" : ""}
                </div>
            ) : (
                <div className="grid gap-6">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
}
