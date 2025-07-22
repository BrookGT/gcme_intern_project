"use client";
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { signIn, signUp, logout as apiLogout, getMe } from "@/lib/api/auth";

interface AuthContextType {
    user: { email: string; name?: string; userId?: number } | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, name?: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<{
        email: string;
        name?: string;
        userId?: number;
    } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const fetchMe = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await getMe();
            setUser(res.user || null);
        } catch (error) {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMe();
    }, [fetchMe]);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            await signIn(email, password);
            await fetchMe();
            router.push("/home");
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (email: string, password: string, name?: string) => {
        setIsLoading(true);
        try {
            await signUp(email, password, name);
            await fetchMe();
            router.push("/home");
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await apiLogout();
            setUser(null);
            router.push("/auth/signin");
        } catch (error) {
            // ignore
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, isLoading, login, signup, logout }}
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
