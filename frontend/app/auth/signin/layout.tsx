export default function SignInLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 overflow-hidden">
            <h1 className="text-3xl font-bold text-purple-700 mb-8">
                GCME BLOG
            </h1>
            {children}
        </div>
    );
}
