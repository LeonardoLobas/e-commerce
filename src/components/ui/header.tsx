"use client";

import { useAuth } from "@/core/auth/hooks/use-auth.hook";
import { LogoutButton } from "@/core/auth/components/logout-button";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";

export function Header() {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const isHomePage = pathname === "/";
    const isAuthPage = pathname === "/login" || pathname === "/register";

    if (isAuthPage) {
        return null;
    }

    if (isLoading) {
        return (
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
                <div className="container flex h-16 items-center justify-between px-4">
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
        <header className="sticky top-0 z-50 w-full border-b bg-background/95">
            <div className="w-full flex h-16 items-center justify-between px-2 sm:px-4 md:px-6">
                <div className="flex items-center gap-2 sm:gap-4">
                    {!isHomePage && (
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-1.5 px-2 sm:px-4 py-2 text-sm font-medium text-muted-foreground cursor-pointer rounded-md transition-all duration-200 hover:bg-accent hover:text-accent-foreground"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span className="hidden sm:inline">Voltar</span>
                        </button>
                    )}
                    <Link href="/" className="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition-opacity">
                        <ShoppingCart className="text-brand-primary h-5 w-5 sm:h-6 sm:w-6" />
                        <h1 className=" text-xl sm:text-2xl sm:inline">E-commerce</h1>
                    </Link>
                </div>

                <div className="flex justify-end items-center gap-1 sm:gap-2 md:gap-4">
                    <nav className="md:block">
                        <ul className="flex items-center gap-1 lg:gap-2">
                            <li>
                                <Link
                                    href="/products"
                                    className=" hidden sm:flex items-center gap-1.5 px-3 lg:px-4 py-2 text-sm font-medium text-muted-foreground cursor-pointer rounded-md transition-all duration-200 hover:bg-accent hover:text-accent-foreground"
                                >
                                    Produtos
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/cart"
                                    className="hidden sm:flex items-center gap-1.5 px-3 lg:px-4 py-2 text-sm font-medium text-muted-foreground cursor-pointer rounded-md transition-all duration-200 hover:bg-accent hover:text-accent-foreground"
                                >
                                    Carrinhos
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/users"
                                    className="flex items-center gap-1.5 px-3 lg:px-4 py-2 text-sm font-medium text-muted-foreground cursor-pointer rounded-md transition-all duration-200 hover:bg-accent hover:text-accent-foreground"
                                >
                                    Usuários
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <LogoutButton />
                </div>
            </div>
        </header>
    );
}
