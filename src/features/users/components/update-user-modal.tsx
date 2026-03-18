"use client";

import { Pencil, X } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useUpdateUserForm } from "../hooks/use-update-user-form.hook";
import { useUpdateUserMutation } from "../hooks/use-update-user-mutation.hook";
import { type UpdateUserFormData } from "../schemas/update-user.schema";
import { type SingleUserResponseDTO } from "../types/single-user.types";

interface UpdateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: SingleUserResponseDTO | null;
}

export const UpdateUserModal = ({ isOpen, onClose, user }: UpdateUserModalProps) => {
    const updateMutation = useUpdateUserMutation();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useUpdateUserForm(user || undefined);

    useEffect(() => {
        if (user) {
            reset({
                email: user.email,
                username: user.username,
                password: "",
                firstname: user.name.firstname,
                lastname: user.name.lastname,
                city: user.address.city,
                street: user.address.street,
                number: user.address.number.toString(),
                zipcode: user.address.zipcode,
                lat: user.address.geolocation.lat,
                long: user.address.geolocation.long,
                phone: user.phone,
            });
        }
    }, [user, reset]);

    if (!isOpen || !user) return null;

    const onSubmit = (data: UpdateUserFormData) => {
        updateMutation.mutate(
            { id: user.id, data },
            {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            },
        );
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
        >
            <div
                className="bg-card rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="border-b px-6 py-4 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-light">
                            <Pencil className="w-4 h-4 text-brand-primary" />
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-brand-primary"></span>
                                <p className="text-xs font-medium text-brand-primary uppercase tracking-wider">Usuários</p>
                            </div>
                            <h2 className="text-base font-bold leading-tight">Editar Usuário</h2>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-accent rounded-full transition-colors text-muted-foreground hover:text-foreground"
                        disabled={updateMutation.isPending}
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto flex-1">
                    <div className="px-6 py-5 space-y-6">
                        {/* Acesso */}
                        <div className="space-y-4">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Acesso</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>
                                    <Input
                                        id="email"
                                        type="email"
                                        {...register("email")}
                                        placeholder="email@example.com"
                                        disabled={updateMutation.isPending}
                                    />
                                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="username">Username</FieldLabel>
                                    <Input
                                        id="username"
                                        {...register("username")}
                                        placeholder="username"
                                        disabled={updateMutation.isPending}
                                    />
                                    {errors.username && (
                                        <p className="text-xs text-destructive mt-1">{errors.username.message}</p>
                                    )}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="password">
                                        Senha{" "}
                                        <span className="text-muted-foreground font-normal">(deixe em branco para manter)</span>
                                    </FieldLabel>
                                    <Input
                                        id="password"
                                        type="password"
                                        {...register("password")}
                                        placeholder="••••••"
                                        disabled={updateMutation.isPending}
                                    />
                                    {errors.password && (
                                        <p className="text-xs text-destructive mt-1">{errors.password.message}</p>
                                    )}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="phone">Telefone</FieldLabel>
                                    <Input
                                        id="phone"
                                        {...register("phone")}
                                        placeholder="(11) 99999-9999"
                                        disabled={updateMutation.isPending}
                                    />
                                    {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
                                </Field>
                            </div>
                        </div>

                        {/* Informações pessoais */}
                        <div className="space-y-4 border-t pt-5">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Informações pessoais
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel htmlFor="firstname">Nome</FieldLabel>
                                    <Input
                                        id="firstname"
                                        {...register("firstname")}
                                        placeholder="João"
                                        disabled={updateMutation.isPending}
                                    />
                                    {errors.firstname && (
                                        <p className="text-xs text-destructive mt-1">{errors.firstname.message}</p>
                                    )}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="lastname">Sobrenome</FieldLabel>
                                    <Input
                                        id="lastname"
                                        {...register("lastname")}
                                        placeholder="Silva"
                                        disabled={updateMutation.isPending}
                                    />
                                    {errors.lastname && (
                                        <p className="text-xs text-destructive mt-1">{errors.lastname.message}</p>
                                    )}
                                </Field>
                            </div>
                        </div>

                        {/* Endereço */}
                        <div className="space-y-4 border-t pt-5">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Endereço</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel htmlFor="city">Cidade</FieldLabel>
                                    <Input
                                        id="city"
                                        {...register("city")}
                                        placeholder="São Paulo"
                                        disabled={updateMutation.isPending}
                                    />
                                    {errors.city && <p className="text-xs text-destructive mt-1">{errors.city.message}</p>}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="street">Rua</FieldLabel>
                                    <Input
                                        id="street"
                                        {...register("street")}
                                        placeholder="Rua Principal"
                                        disabled={updateMutation.isPending}
                                    />
                                    {errors.street && <p className="text-xs text-destructive mt-1">{errors.street.message}</p>}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="number">Número</FieldLabel>
                                    <Input
                                        id="number"
                                        {...register("number")}
                                        placeholder="123"
                                        disabled={updateMutation.isPending}
                                    />
                                    {errors.number && <p className="text-xs text-destructive mt-1">{errors.number.message}</p>}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="zipcode">CEP</FieldLabel>
                                    <Input
                                        id="zipcode"
                                        {...register("zipcode")}
                                        placeholder="12345-678"
                                        disabled={updateMutation.isPending}
                                    />
                                    {errors.zipcode && <p className="text-xs text-destructive mt-1">{errors.zipcode.message}</p>}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="lat">Latitude</FieldLabel>
                                    <Input
                                        id="lat"
                                        {...register("lat")}
                                        placeholder="-23.5505"
                                        disabled={updateMutation.isPending}
                                    />
                                    {errors.lat && <p className="text-xs text-destructive mt-1">{errors.lat.message}</p>}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="long">Longitude</FieldLabel>
                                    <Input
                                        id="long"
                                        {...register("long")}
                                        placeholder="-46.6333"
                                        disabled={updateMutation.isPending}
                                    />
                                    {errors.long && <p className="text-xs text-destructive mt-1">{errors.long.message}</p>}
                                </Field>
                            </div>
                        </div>
                    </div>

                    <div className="border-t px-6 py-4 flex gap-3 justify-end shrink-0">
                        <Button type="button" variant="outline" onClick={handleClose} disabled={updateMutation.isPending}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={updateMutation.isPending} className="min-w-36 gap-2">
                            <Pencil className="w-4 h-4" />
                            {updateMutation.isPending ? "Atualizando..." : "Atualizar Usuário"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
