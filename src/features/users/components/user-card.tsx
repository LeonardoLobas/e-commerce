"use client";

import { UserResponseDTO } from "../types/get-all-users.types";

interface UserCardProps {
    user: UserResponseDTO;
    onClick?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

export function UserCard({ user, onClick, onEdit, onDelete }: UserCardProps) {
    return (
        <div onClick={onClick} className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-lg cursor-pointer">
            <div className="space-y-3">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-semibold text-lg">
                            {user.name.firstname} {user.name.lastname}
                        </h3>
                        <p className="text-sm text-muted-foreground">@{user.username}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">#{user.id}</span>
                </div>

                <div className="space-y-1 text-sm">
                    <p className="flex items-center gap-2">
                        <span className="text-muted-foreground">Email:</span>
                        <span>{user.email}</span>
                    </p>
                    <p className="flex items-center gap-2">
                        <span className="text-muted-foreground">Telefone:</span>
                        <span>{user.phone}</span>
                    </p>
                    <p className="flex items-center gap-2">
                        <span className="text-muted-foreground">Cidade:</span>
                        <span>{user.address.city}</span>
                    </p>
                </div>

                {(onEdit || onDelete) && (
                    <div className="flex gap-2 pt-2 border-t">
                        {onEdit && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit();
                                }}
                                className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                                Editar
                            </button>
                        )}
                        {onDelete && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete();
                                }}
                                className="flex-1 px-3 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                            >
                                Deletar
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
