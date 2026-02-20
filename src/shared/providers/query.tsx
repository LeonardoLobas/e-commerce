"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";
import { AuthProvider } from "@/core/auth/context/auth-context";
import { Toaster } from "sonner";
import { Header } from "@/components/ui/header";

export function Providers({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Header />
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
                <Toaster position="top-right" duration={3000} richColors />
            </AuthProvider>
        </QueryClientProvider>
    );
}
