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
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="space-y-4 text-center">
                    <div className="flex items-center justify-center gap-4">
                        <h1 className="text-4xl font-bold tracking-tight">Produtos 📦</h1>
                        <Button onClick={() => setIsCreateModalOpen(true)} size="lg" className="gap-2">
                            <Plus className="w-5 h-5" />
                            Novo Produto
                        </Button>
                    </div>
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

                {products && Array.isArray(products) && products.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product: ProductsResponseDTO) => (
                            <ProductCard key={product.id} product={product} onClick={() => handleOpenModal(product.id)} />
                        ))}
                    </div>
                )}

                {products && Array.isArray(products) && products.length === 0 && (
                    <div className="rounded-lg border bg-card p-8 text-center">
                        <p className="text-muted-foreground">Nenhum produto encontrado</p>
                    </div>
                )}
            </div>

            <ProductModal productId={selectedProductId} isOpen={isModalOpen} onClose={handleCloseModal} />
            <CreateProductModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
        </div>
    );
}
