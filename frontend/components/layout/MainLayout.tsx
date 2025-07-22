"use client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-200 via-blue-100 to-green-100">
            <Header />
            <main className="flex-1 flex items-center justify-center">
                {children}
            </main>
            <Footer />
        </div>
    );
}
