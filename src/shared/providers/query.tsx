"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/core/auth/context/auth-context";
import { Toaster } from "sonner";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";

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
