"use client";

import { useState } from "react";
import { useSingleProductQuery } from "@/features/products/hooks/use-single-product-query.hook";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { X, Trash2, Pencil } from "lucide-react";
import { DeleteProductModal } from "./delete-product-modal";
import { EditProductModal } from "./edit-product-modal";

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
            <div
                className="bg-card rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 bg-card border-b p-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Detalhes do Produto</h2>
                    <button onClick={onClose} className="p-2 hover:bg-accent rounded-full transition-colors" title="Fechar">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    {isLoading && (
                        <div className="flex items-center justify-center py-12">
                            <div className="text-center">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                                <p className="text-muted-foreground">Carregando...</p>
                            </div>
                        </div>
                    )}

                    {isError && (
                        <div className="text-center py-12">
                            <p className="text-red-500">Erro ao carregar produto</p>
                        </div>
                    )}

                    {product && (
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="relative h-96 bg-white rounded-lg flex items-center justify-center">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-contain p-8"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
                                    <p className="text-sm text-muted-foreground capitalize">Categoria: {product.category}</p>
                                </div>

                                <div className="py-4 border-y">
                                    <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-2">Descrição</h3>
                                    <p className="text-muted-foreground leading-relaxed text-sm">{product.description}</p>
                                </div>

                                <div className="space-y-3 pt-4">
                                    <Button className="w-full" size="lg">
                                        🛒 Adicionar ao Carrinho
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full hover:bg-blue-50"
                                        onClick={() => setIsEditModalOpen(true)}
                                    >
                                        <Pencil className="w-4 h-4 mr-2" />
                                        Editar Produto
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        className="w-full hover:bg-red-700"
                                        onClick={() => setIsDeleteModalOpen(true)}
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Deletar Produto
                                    </Button>
                                    <Button variant="outline" className="w-full" onClick={onClose}>
                                        Fechar
                                    </Button>
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
                        price: product.price,
                        description: product.description,
                        category: product.category,
                        image: product.image,
                    }}
                />
            )}
        </div>
    );
}
