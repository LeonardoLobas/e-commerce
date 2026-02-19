"use client";

import { useDeleteProductMutation } from "../hooks/use-delete-product-mutation.hook";

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
            <div className="relative bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                    disabled={deleteMutation.isPending}
                >
                    ×
                </button>

                <h2 className="text-xl font-bold mb-4 text-gray-900">Confirmar Exclusão</h2>

                <p className="text-gray-700 mb-6">
                    Tem certeza que deseja deletar o produto <strong>{productTitle}</strong>?
                </p>

                <div className="flex gap-4 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={deleteMutation.isPending}
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={deleteMutation.isPending}
                    >
                        {deleteMutation.isPending ? "Deletando..." : "Deletar"}
                    </button>
                </div>
            </div>
        </div>
    );
};
