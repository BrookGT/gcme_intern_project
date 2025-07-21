import "./globals.css";
import ClientRootLayoutWrapper from "../components/ClientRootLayoutWrapper";
import { AuthProvider } from "../lib/AuthContext";

export const metadata = {
    title: "GCME Blog App",
    description: "A modern blog platform",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-gray-50 min-h-screen flex flex-col">
                <AuthProvider>
                    <ClientRootLayoutWrapper>
                        {children}
                    </ClientRootLayoutWrapper>
                </AuthProvider>
            </body>
        </html>
    );
}
