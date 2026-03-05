"use client";

import { useDeleteProductMutation } from "../hooks/use-delete-product-mutation.hook";
import { Button } from "@/components/ui/button";
import { X, Trash2, TriangleAlert } from "lucide-react";

interface DeleteProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    productId: number;
    productTitle: string;
    onDeleteSuccess?: () => void;
}

export const DeleteProductModal = ({ isOpen, onClose, productId, productTitle, onDeleteSuccess }: DeleteProductModalProps) => {
    const deleteMutation = useDeleteProductMutation();

    if (!isOpen) return null;

    const handleDelete = async () => {
        deleteMutation.mutate(productId, {
            onSuccess: () => {
                onClose();
                onDeleteSuccess?.();
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={onClose}>
            <div className="bg-card rounded-2xl shadow-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="border-b px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-destructive/10">
                            <Trash2 className="w-4 h-4 text-destructive" />
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-destructive"></span>
                                <p className="text-xs font-medium text-destructive uppercase tracking-wider">Ação irreversível</p>
                            </div>
                            <h2 className="text-base font-bold leading-tight">Confirmar Exclusão</h2>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-accent rounded-full transition-colors text-muted-foreground hover:text-foreground"
                        disabled={deleteMutation.isPending}
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5 space-y-4">
                    <div className="flex gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4">
                        <TriangleAlert className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Tem certeza que deseja deletar <span className="font-semibold text-foreground">&quot;{productTitle}&quot;</span>
                            ? Esta ação não poderá ser desfeita.
                        </p>
                    </div>

                    <div className="flex gap-3 justify-end pt-1 border-t">
                        <Button variant="outline" onClick={onClose} disabled={deleteMutation.isPending}>
                            Cancelar
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={deleteMutation.isPending}
                            className="min-w-28 gap-2"
                        >
                            <Trash2 className="w-4 h-4" />
                            {deleteMutation.isPending ? "Deletando..." : "Deletar"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
