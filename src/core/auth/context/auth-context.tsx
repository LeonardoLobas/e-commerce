"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { getCurrentUserIdAction } from "../actions/get-current-user-id.action";

interface AuthContextData {
    userId: number | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [userId, setUserId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const loadUser = async () => {
        setIsLoading(true);
        try {
            const id = await getCurrentUserIdAction();
            setUserId(id);
        } catch (error) {
            console.error("Erro ao carregar usuário:", error);
            setUserId(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const refreshUser = async () => {
        await loadUser();
    };

    return (
        <AuthContext.Provider
            value={{
                userId,
                isAuthenticated: !!userId,
                isLoading,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
