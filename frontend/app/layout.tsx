import "./globals.css";
import { AuthProvider } from "@/authcontext/AuthContext";
import ClientRootLayoutWrapper from "@/components/layout/ClientRootLayoutWrapper";

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
            <body>
                <AuthProvider>
                    <ClientRootLayoutWrapper>
                        {children}
                    </ClientRootLayoutWrapper>
                </AuthProvider>
            </body>
        </html>
    );
}
