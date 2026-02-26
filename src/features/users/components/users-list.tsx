"use client";

import { useState } from "react";
import { useUsersQuery } from "../hooks/use-users-query.hook";
import { UserCard } from "./user-card";
import { CreateUserModal } from "./create-user-modal";
import { UpdateUserModal } from "./update-user-modal";
import { DeleteUserModal } from "./delete-user-modal";
import { Button } from "@/components/ui/button";
import { SingleUserResponseDTO } from "../types/single-user.types";

export const UsersList = () => {
    const { data: users, isLoading, error } = useUsersQuery();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<SingleUserResponseDTO | null>(null);
    const [userToDelete, setUserToDelete] = useState<{ id: number; name: string } | null>(null);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-100">
                <p className="text-lg text-muted-foreground">Carregando usuários...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-100">
                <p className="text-lg text-red-500">Erro ao carregar usuários: {error.message}</p>
            </div>
        );
    }

    const handleEdit = (user: SingleUserResponseDTO) => {
        setSelectedUser(user);
        setIsUpdateModalOpen(true);
    };

    const handleDelete = (userId: number, userName: string) => {
        setUserToDelete({ id: userId, name: userName });
        setIsDeleteModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Usuários</h1>
                <Button onClick={() => setIsCreateModalOpen(true)}>Novo Usuário</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users?.map((user) => (
                    <UserCard
                        key={user.id}
                        user={user}
                        onEdit={() => handleEdit(user as SingleUserResponseDTO)}
                        onDelete={() => handleDelete(user.id, `${user.name.firstname} ${user.name.lastname}`)}
                    />
                ))}
            </div>

            {users?.length === 0 && (
                <div className="flex items-center justify-center min-h-50">
                    <p className="text-muted-foreground">Nenhum usuário encontrado</p>
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
