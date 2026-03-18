"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { usePathname } from "next/navigation";
import { type ReactNode, useState } from "react";
import { Toaster } from "sonner";

import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import { AuthProvider } from "@/core/auth/context/auth-context";

export function Providers({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
    const pathname = usePathname();
    const shouldShowFooter = pathname !== "/login";

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-1">{children}</main>
                    {shouldShowFooter && <Footer />}
                </div>
                <ReactQueryDevtools initialIsOpen={false} />
                <Toaster position="top-right" duration={3000} richColors />
            </AuthProvider>
        </QueryClientProvider>
    );
}
