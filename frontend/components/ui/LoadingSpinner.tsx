import React from "react";

export default function LoadingSpinner() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-200 via-blue-100 to-green-100 z-50">
            <div className="w-16 h-16 border-4 border-white border-t-purple-600 rounded-full animate-spin"></div>
        </div>
    );
}
