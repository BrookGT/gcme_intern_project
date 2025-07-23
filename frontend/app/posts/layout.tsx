import React from "react";

export default function PostsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="pb-10 pt-8">{children}</div>;
}
