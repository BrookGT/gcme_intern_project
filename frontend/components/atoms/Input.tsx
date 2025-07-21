import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className = "", ...props }, ref) => {
        const baseClasses =
            "mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none bg-white text-black placeholder-gray-500";
        const ringClasses = "focus:ring-2 focus:ring-purple-400"; // Default ring color

        return (
            <input
                ref={ref}
                className={`${baseClasses} ${ringClasses} ${className}`}
                {...props}
            />
        );
    }
);

Input.displayName = "Input";

interface TextAreaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ className = "", ...props }, ref) => {
        const baseClasses =
            "mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none bg-white text-black placeholder-gray-500";
        const ringClasses = "focus:ring-2 focus:ring-green-400"; // Default ring color

        return (
            <textarea
                ref={ref}
                className={`${baseClasses} ${ringClasses} ${className}`}
                {...props}
            />
        );
    }
);

TextArea.displayName = "TextArea";
