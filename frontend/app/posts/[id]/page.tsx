"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/authcontext/AuthContext";
import React from "react";

interface Post {
    id: number;
    title: string;
    content: string;
    published: boolean;
    author: {
        name: string | null;
        email: string;
    };
    authorId: number;
}

export default function PostDetailsPage({
    params: paramsPromise,
}: {
    params: Promise<{ id: string }>;
}) {
    const params = React.use(paramsPromise);
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/posts/${params.id}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch post. It may not exist.");
                }
                const data = await response.json();
                setPost(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (params.id) {
            fetchPost();
        }
    }, [params.id]);

    if (isLoading) {
        return (
            <div className="text-center text-xl font-semibold">
                Loading post...
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

    if (!post) {
        return (
            <div className="text-center text-xl font-semibold">
                Post not found.
            </div>
        );
    }

    const isAuthor = user && user.sub === post.authorId;

    return (
        <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg p-8 w-full max-w-4xl mx-auto border border-white/30">
            <div className="flex justify-between items-start mb-4">
                <h1 className="text-4xl font-bold text-gray-900">
                    {post.title}
                </h1>
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
            <div className="text-md text-gray-600 mb-6">
                By{" "}
                <span className="font-semibold text-purple-800">
                    {post.author.name || "Anonymous"}
                </span>
            </div>
            <div className="prose lg:prose-xl max-w-none text-gray-800">
                <p>{post.content}</p>
            </div>
            {isAuthor && (
                <div className="flex gap-4 mt-8 pt-6 border-t border-gray-300">
                    <Link
                        href={`/posts/edit/${post.id}`}
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-5 py-2 rounded-lg font-semibold transition shadow"
                    >
                        Edit Post
                    </Link>
                </div>
            )}
        </div>
    );
}
