"use client";
import React, { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import Button from "@/components/atoms/Button";
import { Input, TextArea } from "@/components/atoms/Input";

export default function CreatePostPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [published, setPublished] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!token) {
            setError("You must be logged in to create a post.");
            setIsLoading(false);
            router.push("/auth/signin");
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, content, published }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Failed to create post.");
            }

            // On success, redirect to the posts page
            router.push("/posts");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="backdrop-blur-lg bg-white/60 border border-white/30 shadow-2xl p-8 rounded-2xl w-full max-w-2xl mx-auto glass-effect">
            <h2 className="text-3xl font-bold mb-6 text-center text-black">
                Create a New Post
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-800">
                        Title
                    </label>
                    <Input
                        type="text"
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
                    variant="secondary"
                    className="w-full py-3"
                    disabled={isLoading}
                >
                    {isLoading ? "Creating..." : "Create Post"}
                </Button>
            </form>
        </div>
    );
}
