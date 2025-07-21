export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-blue-100 to-green-100 overflow-hidden">
            {children}
        </div>
    );
}
