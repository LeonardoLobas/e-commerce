"use client";

import { Button } from "@/components/ui/button";
import { logoutAction } from "../actions/logout.action";
import { useTransition } from "react";

export function LogoutButton() {
    const [isPending, startTransition] = useTransition();

    const handleLogout = () => {
        startTransition(async () => {
            await logoutAction();
        });
    };

    return (
        <Button
            onClick={handleLogout}
            disabled={isPending}
            variant="outline"
            size="icon"
            className="absolute top-4 right-4"
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
        </Button>
    );
}
