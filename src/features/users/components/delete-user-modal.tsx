"use client";

import { Trash2, TriangleAlert, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useDeleteUserMutation } from "../hooks/use-delete-user-mutation.hook";

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-card rounded-2xl shadow-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
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
                            <h2 className="text-base font-bold leading-tight">Deletar Usuário</h2>
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

                <div className="px-6 py-5 space-y-4">
                    <div className="flex gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4">
                        <TriangleAlert className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Tem certeza que deseja deletar{" "}
                            {userName ? (
                                <span className="font-semibold text-foreground">&quot;{userName}&quot;</span>
                            ) : (
                                "este usuário"
                            )}
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
