"use client";

import { Mail, MapPin,Pencil, Phone, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { type UserResponseDTO } from "../types/get-all-users.types";

interface UserCardProps {
    user: UserResponseDTO;
    onClick?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

export function UserCard({ user, onClick, onEdit, onDelete }: UserCardProps) {
    const initials = `${user.name.firstname[0]}${user.name.lastname[0]}`.toUpperCase();

    return (
        <div
            onClick={onClick}
            className="rounded-xl border bg-card shadow-sm transition-all duration-200 hover:shadow-md overflow-hidden"
        >
            {/* Card header */}
            <div className="p-5 flex items-center gap-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-full bg-brand-light shrink-0">
                    <span className="text-sm font-bold text-brand-primary">{initials}</span>
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm truncate">
                        {user.name.firstname} {user.name.lastname}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">@{user.username}</p>
                </div>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full shrink-0">#{user.id}</span>
            </div>

            <div className="border-t" />

            {/* Info */}
            <div className="px-5 py-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">{user.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground capitalize">{user.address.city}</span>
                </div>
            </div>

            {/* Actions */}
            {(onEdit || onDelete) && (
                <div className="px-5 pb-5 flex gap-2">
                    {onEdit && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 gap-1.5"
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit();
                            }}
                        >
                            <Pencil className="w-3.5 h-3.5" />
                            Editar
                        </Button>
                    )}
                    {onDelete && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="flex-1 gap-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete();
                            }}
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                            Deletar
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}
