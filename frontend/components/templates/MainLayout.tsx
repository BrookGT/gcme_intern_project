"use client";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-purple-200 via-blue-100 to-green-100 overflow-y-auto">
            <Header />
            <main className="flex-1 flex items-center justify-center container mx-auto px-4 py-8">
                {children}
            </main>
            <Footer />
        </div>
    );
}
