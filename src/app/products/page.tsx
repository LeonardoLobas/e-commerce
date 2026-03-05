"use client";

import { useState } from "react";
import { useProductsQuery } from "@/features/products/hooks/use-products-query.hook";
import { ProductCard } from "@/features/products/components/product-card";
import { ProductModal } from "@/features/products/components/product-modal";
import { CreateProductModal } from "@/features/products/components/create-product-modal";
import { Button } from "@/components/ui/button";
import { ProductsResponseDTO } from "@/features/products/types/get-all-products.types";
import { Plus } from "lucide-react";

export default function ProductsPage() {
    const { data: products, isLoading, isError, error } = useProductsQuery();
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handleOpenModal = (productId: number) => {
        setSelectedProductId(productId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProductId(null);
    };

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Page header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-brand-primary"></span>
                            <p className="text-xs font-medium text-brand-primary uppercase tracking-wider">Catálogo</p>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight">Nossos Produtos</h1>
                        <p className="text-muted-foreground text-sm">
                            {products && Array.isArray(products)
                                ? `${products.length} produto${products.length !== 1 ? "s" : ""} disponível${products.length !== 1 ? "is" : ""}`
                                : "Navegue pelo nosso catálogo"}
                        </p>
                    </div>
                    <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2 shrink-0">
                        <Plus className="w-4 h-4" />
                        Novo Produto
                    </Button>
                </div>

                {/* Loading skeleton */}
                {isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="rounded-xl border bg-card shadow-sm overflow-hidden animate-pulse">
                                <div className="h-52 bg-muted" />
                                <div className="p-4 space-y-3">
                                    <div className="h-3 bg-muted rounded w-3/4" />
                                    <div className="h-3 bg-muted rounded w-1/2" />
                                    <div className="h-4 bg-muted rounded w-1/3" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Error */}
                {isError && (
                    <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-10 text-center space-y-2">
                        <p className="font-semibold text-destructive">Erro ao carregar produtos</p>
                        <p className="text-sm text-muted-foreground">{error?.message}</p>
                    </div>
                )}

                {/* Grid */}
                {products && Array.isArray(products) && products.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product: ProductsResponseDTO) => (
                            <ProductCard key={product.id} product={product} onClick={() => handleOpenModal(product.id)} />
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {products && Array.isArray(products) && products.length === 0 && (
                    <div className="rounded-xl border bg-card p-16 text-center space-y-3">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-light mb-2">
                            <Plus className="w-5 h-5 text-brand-primary" />
                        </div>
                        <p className="font-semibold">Nenhum produto encontrado</p>
                        <p className="text-sm text-muted-foreground">Comece criando o primeiro produto do catálogo.</p>
                        <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2 mt-2">
                            <Plus className="w-4 h-4" />
                            Novo Produto
                        </Button>
                    </div>
                )}
            </div>

            <ProductModal productId={selectedProductId} isOpen={isModalOpen} onClose={handleCloseModal} />
            <CreateProductModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
        </div>
    );
}
