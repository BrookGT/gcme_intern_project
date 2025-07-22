import Link from "next/link";
import React from "react";

interface PostCardProps {
    post: {
        id: number;
        title: string;
        content: string;
        published: boolean;
        author?: {
            name: string | null;
        };
    };
    isMyPost?: boolean;
    onDelete?: (id: number) => void;
}

export default function PostCard({
    post,
    isMyPost = false,
    onDelete,
}: PostCardProps) {
    return (
        <div className="bg-white/70 backdrop-blur-md rounded-xl shadow p-6 flex flex-col gap-2 border border-white/30">
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
            {post.author && (
                <div className="text-sm text-gray-600 mt-4">
                    By{" "}
                    <span className="font-semibold text-purple-800">
                        {post.author.name || "Anonymous"}
                    </span>
                </div>
            )}
            <div className="flex gap-4 mt-4 self-end">
                {isMyPost ? (
                    <>
                        <Link
                            href={`/posts/edit/${post.id}`}
                            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition shadow"
                        >
                            Edit
                        </Link>
                        {onDelete && (
                            <button
                                onClick={() => onDelete(post.id)}
                                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition shadow"
                            >
                                Delete
                            </button>
                        )}
                    </>
                ) : (
                    <Link
                        href={`/posts/${post.id}`}
                        className="text-purple-600 hover:underline text-sm font-semibold"
                    >
                        Read More &rarr;
                    </Link>
                )}
            </div>
        </div>
    );
}
