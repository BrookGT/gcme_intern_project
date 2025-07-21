import React from "react";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-4 text-center shadow-inner">
            &copy; {new Date().getFullYear()} GCME Blog. All rights reserved.
        </footer>
    );
}
