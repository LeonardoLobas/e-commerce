"use client";

import { useAuth } from "@/core/auth/hooks/use-auth.hook";
import { LogoutButton } from "@/core/auth/components/logout-button";

export function Header() {
    const { isAuthenticated, isLoading } = useAuth();

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

    if (!isAuthenticated) {
        return null;
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container flex h-14 items-center justify-end px-4">
                <LogoutButton />
            </div>
        </header>
    );
}
