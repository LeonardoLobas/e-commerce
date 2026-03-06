"use client";

import { useState } from "react";
import { useUsersQuery } from "../hooks/use-users-query.hook";
import { UserCard } from "./user-card";
import { CreateUserModal } from "./create-user-modal";
import { UpdateUserModal } from "./update-user-modal";
import { DeleteUserModal } from "./delete-user-modal";
import { Button } from "@/components/ui/button";
import { SingleUserResponseDTO } from "../types/single-user.types";
import { UserPlus } from "lucide-react";

export const UsersList = () => {
    const { data: users, isLoading, error } = useUsersQuery();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<SingleUserResponseDTO | null>(null);
    const [userToDelete, setUserToDelete] = useState<{ id: number; name: string } | null>(null);

    const handleEdit = (user: SingleUserResponseDTO) => {
        setSelectedUser(user);
        setIsUpdateModalOpen(true);
    };

    const handleDelete = (userId: number, userName: string) => {
        setUserToDelete({ id: userId, name: userName });
        setIsDeleteModalOpen(true);
    };

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-brand-primary"></span>
                        <p className="text-xs font-medium text-brand-primary uppercase tracking-wider">Administração</p>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Usuários</h1>
                    <p className="text-muted-foreground text-sm">
                        {users && !isLoading
                            ? `${users.length} usuário${users.length !== 1 ? "s" : ""} cadastrado${users.length !== 1 ? "s" : ""}`
                            : "Gerencie os usuários do sistema"}
                    </p>
                </div>
                <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2 shrink-0">
                    <UserPlus className="w-4 h-4" />
                    Novo Usuário
                </Button>
            </div>

            {/* Skeleton */}
            {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="rounded-xl border bg-card p-6 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-full bg-muted shrink-0" />
                                <div className="space-y-1.5 flex-1">
                                    <div className="h-3 bg-muted rounded w-1/2" />
                                    <div className="h-3 bg-muted rounded w-1/3" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-3 bg-muted rounded w-full" />
                                <div className="h-3 bg-muted rounded w-3/4" />
                                <div className="h-3 bg-muted rounded w-2/3" />
                            </div>
                            <div className="h-8 bg-muted rounded-lg" />
                        </div>
                    ))}
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-10 text-center space-y-2">
                    <p className="font-semibold text-destructive">Erro ao carregar usuários</p>
                    <p className="text-sm text-muted-foreground">{error.message}</p>
                </div>
            )}

            {/* Grid */}
            {!isLoading && !error && users && users.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {users.map((user) => (
                        <UserCard
                            key={user.id}
                            user={user}
                            onEdit={() => handleEdit(user as SingleUserResponseDTO)}
                            onDelete={() => handleDelete(user.id, `${user.name.firstname} ${user.name.lastname}`)}
                        />
                    ))}
                </div>
            )}

            {/* Empty */}
            {!isLoading && !error && users?.length === 0 && (
                <div className="rounded-2xl border bg-card p-16 text-center space-y-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-light mb-2">
                        <UserPlus className="w-5 h-5 text-brand-primary" />
                    </div>
                    <p className="font-semibold">Nenhum usuário encontrado</p>
                    <p className="text-sm text-muted-foreground">Comece criando o primeiro usuário.</p>
                    <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2 mt-2">
                        <UserPlus className="w-4 h-4" />
                        Novo Usuário
                    </Button>
                </div>
            )}

            <CreateUserModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />

            <UpdateUserModal
                isOpen={isUpdateModalOpen}
                onClose={() => {
                    setIsUpdateModalOpen(false);
                    setSelectedUser(null);
                }}
                user={selectedUser}
            />

            <DeleteUserModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setUserToDelete(null);
                }}
                userId={userToDelete?.id || null}
                userName={userToDelete?.name}
            />
        </div>
    );
};
