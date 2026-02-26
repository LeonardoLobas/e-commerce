"use client";

import { useDeleteUserMutation } from "../hooks/use-delete-user-mutation.hook";
import { Button } from "@/components/ui/button";

interface DeleteUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: number | null;
    userName?: string;
}

export const DeleteUserModal = ({ isOpen, onClose, userId, userName }: DeleteUserModalProps) => {
    const deleteMutation = useDeleteUserMutation();

    if (!isOpen || !userId) return null;

    const handleDelete = () => {
        deleteMutation.mutate(userId, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
            <div className="relative bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-4 text-gray-900">Deletar Usuário</h2>

                <p className="text-gray-600 mb-6">
                    Tem certeza que deseja deletar {userName ? `o usuário "${userName}"` : "este usuário"}? Esta ação não pode ser
                    desfeita.
                </p>

                <div className="flex gap-4 justify-end">
                    <Button type="button" onClick={onClose} variant="outline" disabled={deleteMutation.isPending}>
                        Cancelar
                    </Button>
                    <Button
                        type="button"
                        onClick={handleDelete}
                        disabled={deleteMutation.isPending}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        {deleteMutation.isPending ? "Deletando..." : "Deletar"}
                    </Button>
                </div>
            </div>
        </div>
    );
};
