"use client";

import { useState } from "react";
import { useSingleProductQuery } from "@/features/products/hooks/use-single-product-query.hook";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { X, Trash2, Pencil } from "lucide-react";
import { DeleteProductModal } from "./delete-product-modal";
import { EditProductModal } from "./edit-product-modal";
import { AddToCartButton } from "@/features/carts/components/add-to-cart-button";
import { formatCurrency } from "@/lib/formatCurrency";

interface ProductModalProps {
    productId: number | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ProductModal({ productId, isOpen, onClose }: ProductModalProps) {
    const { data: product, isLoading, isError } = useSingleProductQuery(productId || 0);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    if (!isOpen) return null;

    const handleCloseAll = () => {
        setIsDeleteModalOpen(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div
                className="bg-card rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 bg-card border-b px-6 py-4 flex justify-between items-center z-10">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-brand-primary"></span>
                        <p className="text-xs font-medium text-brand-primary uppercase tracking-wider">Detalhes do Produto</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-accent rounded-full transition-colors text-muted-foreground hover:text-foreground"
                        title="Fechar"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="p-6">
                    {/* Skeleton loading */}
                    {isLoading && (
                        <div className="grid md:grid-cols-2 gap-8 animate-pulse">
                            <div className="h-80 bg-muted rounded-xl" />
                            <div className="space-y-4">
                                <div className="h-3 bg-muted rounded w-1/4" />
                                <div className="h-5 bg-muted rounded w-full" />
                                <div className="h-5 bg-muted rounded w-3/4" />
                                <div className="h-8 bg-muted rounded w-1/3 mt-2" />
                                <div className="space-y-2 pt-2">
                                    <div className="h-3 bg-muted rounded" />
                                    <div className="h-3 bg-muted rounded" />
                                    <div className="h-3 bg-muted rounded w-2/3" />
                                </div>
                                <div className="space-y-2 pt-4">
                                    <div className="h-10 bg-muted rounded-lg" />
                                    <div className="h-10 bg-muted rounded-lg" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Error */}
                    {isError && (
                        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-10 text-center space-y-1">
                            <p className="font-semibold text-destructive">Erro ao carregar produto</p>
                            <p className="text-sm text-muted-foreground">Tente fechar e abrir novamente.</p>
                        </div>
                    )}

                    {/* Content */}
                    {product && (
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Image */}
                            <div className="relative h-80 bg-white rounded-xl border flex items-center justify-center overflow-hidden">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-contain p-8"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>

                            {/* Info */}
                            <div className="flex flex-col gap-5">
                                {/* Category badge */}
                                <div className="inline-flex items-center gap-1.5 bg-brand-light border rounded-full px-3 py-1 w-fit">
                                    <span className="h-1.5 w-1.5 rounded-full bg-brand-primary"></span>
                                    <span className="text-xs font-medium text-brand-primary capitalize">{product.category}</span>
                                </div>

                                {/* Title */}
                                <h1 className="text-xl font-bold leading-snug">{product.title}</h1>

                                {/* Price */}
                                <div className="flex items-baseline gap-2 py-4 border-y">
                                    <span className="text-3xl font-bold text-brand-primary">{formatCurrency(product.price)}</span>
                                </div>

                                {/* Description */}
                                <div className="space-y-1.5">
                                    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                        Descrição
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="space-y-2 pt-2 mt-auto">
                                    <AddToCartButton productId={product.id} userId={1} />
                                    <div className="grid grid-cols-2 gap-2">
                                        <Button
                                            variant="outline"
                                            className="gap-2 hover:bg-accent"
                                            onClick={() => setIsEditModalOpen(true)}
                                        >
                                            <Pencil className="w-4 h-4" />
                                            Editar
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            className="gap-2"
                                            onClick={() => setIsDeleteModalOpen(true)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Deletar
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {product && (
                <DeleteProductModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    productId={product.id}
                    productTitle={product.title}
                    onDeleteSuccess={handleCloseAll}
                />
            )}

            {product && (
                <EditProductModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    productId={product.id}
                    defaultValues={{
                        title: product.title,
                        price: String(product.price),
                        description: product.description,
                        category: product.category,
                        image: product.image,
                    }}
                />
            )}
        </div>
    );
}
