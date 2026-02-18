"use client";

import { useProductsQuery } from "@/features/products/hooks/use-products-query.hook";
import Image from "next/image";

export default function ProductsPage() {
    const { data: products, isLoading, isError, error } = useProductsQuery();

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="space-y-4 text-center">
                    <h1 className="text-4xl font-bold tracking-tight">Produtos 📦</h1>
                    <p className="text-muted-foreground">Navegue pelo nosso catálogo de produtos</p>
                </div>

                {isLoading && (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        <p className="mt-4 text-muted-foreground">Carregando produtos...</p>
                    </div>
                )}

                {isError && (
                    <div className="rounded-lg border border-red-500 bg-red-50 dark:bg-red-950 p-8 text-center">
                        <p className="text-red-600 dark:text-red-400">Erro ao carregar produtos: {error?.message}</p>
                    </div>
                )}

                {products && products.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-lg hover:scale-105 cursor-pointer"
                            >
                                <div className="relative w-full h-48 mb-4">
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-semibold text-sm line-clamp-2 min-h-10">{product.title}</h3>

                                    <p className="text-xs text-muted-foreground capitalize">{product.category}</p>

                                    <div className="flex items-center justify-between pt-2">
                                        <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
                                        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm">
                                            Adicionar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {products && products.length === 0 && (
                    <div className="rounded-lg border bg-card p-8 text-center">
                        <p className="text-muted-foreground">Nenhum produto encontrado</p>
                    </div>
                )}
            </div>
        </div>
    );
}
