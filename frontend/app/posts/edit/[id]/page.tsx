"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import Button from "@/components/atoms/Button";
import { Input, TextArea } from "@/components/atoms/Input";

interface Post {
    id: number;
    title: string;
    content: string;
    published: boolean;
    authorId: number;
}

export default function EditPostPage({
    params: paramsPromise,
}: {
    params: Promise<{ id: string }>;
}) {
    const params = React.use(paramsPromise);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [published, setPublished] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const { token, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.push("/auth/signin");
            return;
        }

        const fetchPost = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/posts/${params.id}`
                );
                if (!response.ok) throw new Error("Failed to fetch post data.");
                const post = await response.json();

                if (user?.sub !== post.authorId) {
                    throw new Error(
                        "You are not authorized to edit this post."
                    );
                }

                setTitle(post.title);
                setContent(post.content);
                setPublished(post.published);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsFetching(false);
            }
        };

        fetchPost();
    }, [params.id, token, user, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await fetch(
                `http://localhost:3001/posts/${params.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ title, content, published }),
                }
            );

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Failed to update post.");
            }

            router.push(`/posts/${params.id}`);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <div className="text-center text-xl font-semibold">
                Loading editor...
            </div>
        );
    }

    if (error && !title) {
        // Show full-page error if post couldn't be loaded
        return (
            <div className="text-center text-xl font-semibold text-red-500">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="backdrop-blur-lg bg-white/60 border border-white/30 shadow-2xl p-8 rounded-2xl w-full max-w-2xl mx-auto glass-effect">
            <h2 className="text-3xl font-bold mb-6 text-center text-black">
                Edit Post
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-800">
                        Title
                    </label>
                    <Input
                        type="text"
                        className="focus:ring-yellow-400"
                        value={title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setTitle(e.target.value)
                        }
                        required
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-800">
                        Content
                    </label>
                    <TextArea
                        className="focus:ring-yellow-400"
                        value={content}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            setContent(e.target.value)
                        }
                        rows={6}
                        required
                        disabled={isLoading}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="published"
                        className="h-5 w-5 rounded"
                        checked={published}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setPublished(e.target.checked)
                        }
                        disabled={isLoading}
                    />
                    <label
                        htmlFor="published"
                        className="text-sm font-medium text-gray-800"
                    >
                        Publish immediately
                    </label>
                </div>
                {error && (
                    <div className="text-red-500 text-sm font-semibold text-center">
                        {error}
                    </div>
                )}
                <Button
                    type="submit"
                    variant="warning"
                    className="w-full py-3"
                    disabled={isLoading}
                >
                    {isLoading ? "Saving..." : "Save Changes"}
                </Button>
            </form>
        </div>
    );
}
