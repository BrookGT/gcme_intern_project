"use client";

import React, { useState } from "react";
import { useAuth } from "../../../lib/AuthContext";

export default function SignUpPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!email || !password) {
            setError("Email and password are required.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name || undefined,
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to sign up. Please try again."
                );
            }

            if (data.access_token) {
                login(data.access_token);
            } else {
                throw new Error("Sign up failed: No access token received.");
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="backdrop-blur-lg bg-white/60 border border-white/30 shadow-2xl p-8 rounded-2xl w-full max-w-md mx-auto flex flex-col items-center glass-effect">
            <h2 className="text-3xl font-bold mb-6 text-center text-black">
                Sign Up
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5 w-full">
                <div>
                    <label className="block text-sm font-medium text-gray-800">
                        Name (optional)
                    </label>
                    <input
                        type="text"
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black placeholder-gray-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-800">
                        Email
                    </label>
                    <input
                        type="email"
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black placeholder-gray-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-800">
                        Password
                    </label>
                    <input
                        type="password"
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black placeholder-gray-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>
                {error && (
                    <div className="text-red-500 text-sm font-semibold text-center">
                        {error}
                    </div>
                )}
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white font-semibold rounded-lg shadow-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    {isLoading ? "Signing Up..." : "Sign Up"}
                </button>
            </form>
            <div className="mt-4 text-center text-sm text-gray-700">
                Already have an account?{" "}
                <a
                    href="/auth/signin"
                    className="text-blue-700 hover:underline"
                >
                    Sign In
                </a>
            </div>
        </div>
    );
}
