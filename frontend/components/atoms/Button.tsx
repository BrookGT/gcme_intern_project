import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger" | "warning";
    children: React.ReactNode;
}

export default function Button({
    children,
    variant = "primary",
    className = "",
    ...props
}: ButtonProps) {
    const baseClasses =
        "px-4 py-2 rounded-lg font-semibold transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClasses = {
        primary:
            "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white",
        secondary:
            "bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white",
        danger: "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white",
        warning:
            "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white",
    };

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
