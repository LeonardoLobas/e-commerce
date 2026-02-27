"use client";

import { logoutAction } from "../actions/logout.action";
import { useTransition } from "react";
import { useAuth } from "../hooks/use-auth.hook";

export function LogoutButton() {
    const [isPending, startTransition] = useTransition();
    const { refreshUser } = useAuth();

    const handleLogout = () => {
        startTransition(async () => {
            await logoutAction();
            await refreshUser();
        });
    };

    return (
        <button
            onClick={handleLogout}
            disabled={isPending}
            className="flex items-center gap-1.5 px-2 sm:px-3 md:px-4 py-2 text-sm font-medium text-muted-foreground cursor-pointer rounded-md transition-all duration-200 hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            title="Sair"
        >
            {isPending ? (
                <span className="text-lg">⏳</span>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
            )}
            <span className="hidden md:inline">Sair</span>
        </button>
    );
}
