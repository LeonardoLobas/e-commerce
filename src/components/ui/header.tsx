"use client";

import { useAuth } from "@/core/auth/hooks/use-auth.hook";
import { LogoutButton } from "@/core/auth/components/logout-button";
import { User } from "lucide-react";

export function Header() {
    const { userId, isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
                <div className="container flex h-14 items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Carregando...</span>
                    </div>
                </div>
            </header>
        );
    }

    if (!isAuthenticated || !userId) {
        return null;
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container flex h-14 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Usuário ID: {userId}</span>
                </div>
                <LogoutButton />
            </div>
        </header>
    );
}
