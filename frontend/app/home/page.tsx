import Link from "next/link";

export default function HomePage() {
    return (
        <div className="backdrop-blur-lg bg-white/60 border border-white/30 shadow-2xl p-12 rounded-2xl max-w-xl w-full flex flex-col items-center glass-effect">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-blue-700 to-green-600 mb-4 drop-shadow-lg">
                Welcome to GCME Blog!
            </h1>
            <p className="text-lg text-gray-800 mb-8 text-center font-medium">
                Share your thoughts, read posts, and connect with others in a
                modern, beautiful space.
            </p>
            <div className="flex gap-6 w-full justify-center">
                <a
                    href="/posts"
                    className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition text-lg"
                >
                    View All Posts
                </a>
                <a
                    href="/posts/me"
                    className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition text-lg"
                >
                    My Posts
                </a>
            </div>
        </div>
    );
}
