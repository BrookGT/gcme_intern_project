"use client";
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
    token: string | null;
    user: { email: string; name?: string; sub?: number } | null;
    isLoading: boolean; // Add loading state
    login: (token: string) => void;
    logout: () => void;
    isTokenExpired: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to decode token safely
const decodeToken = (token: string) => {
    try {
        return jwtDecode<{
            email: string;
            name?: string;
            sub: number;
            exp: number;
        }>(token);
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<{
        email: string;
        name?: string;
        sub?: number;
    } | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Initialize loading state
    const router = useRouter();

    const isTokenExpired = useCallback(() => {
        if (!token) return true;
        const decoded = decodeToken(token);
        if (!decoded || !decoded.exp) return true;
        return Date.now() >= decoded.exp * 1000;
    }, [token]);

    const logout = useCallback(() => {
        setToken(null);
        setUser(null);
        if (typeof window !== "undefined") {
            localStorage.removeItem("jwt_token");
        }
        router.push("/auth/signin");
    }, [router]);

    useEffect(() => {
        try {
            if (typeof window !== "undefined") {
                const storedToken = localStorage.getItem("jwt_token");
                if (storedToken) {
                    const decoded = decodeToken(storedToken);
                    if (decoded && Date.now() < decoded.exp * 1000) {
                        setToken(storedToken);
                        setUser({
                            email: decoded.email,
                            name: decoded.name,
                            sub: decoded.sub,
                        });
                    } else {
                        localStorage.removeItem("jwt_token");
                    }
                }
            }
        } catch (error) {
            console.error("Session check failed:", error);
        } finally {
            setIsLoading(false); // Finish loading
        }
    }, []);

    const login = (newToken: string) => {
        const decoded = decodeToken(newToken);
        if (decoded) {
            setToken(newToken);
            setUser({
                email: decoded.email,
                name: decoded.name,
                sub: decoded.sub,
            });
            if (typeof window !== "undefined") {
                localStorage.setItem("jwt_token", newToken);
            }
            router.push("/home");
        }
    };

    return (
        <AuthContext.Provider
            value={{ token, user, isLoading, login, logout, isTokenExpired }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
