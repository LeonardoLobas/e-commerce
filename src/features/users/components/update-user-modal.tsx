"use client";

import { useUpdateUserMutation } from "../hooks/use-update-user-mutation.hook";
import { useUpdateUserForm } from "../hooks/use-update-user-form.hook";
import { UpdateUserFormData } from "../schemas/update-user.schema";
import { SingleUserResponseDTO } from "../types/single-user.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={handleClose}>
            <div
                className="relative bg-white rounded-lg p-6 max-w-3xl w-full mx-4 shadow-xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                    disabled={updateMutation.isPending}
                >
                    ×
                </button>

                <h2 className="text-xl font-bold mb-6 text-gray-900">Editar Usuário</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                {...register("email")}
                                placeholder="email@example.com"
                                disabled={updateMutation.isPending}
                            />
                            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                {...register("username")}
                                placeholder="username"
                                disabled={updateMutation.isPending}
                            />
                            {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="password">Senha (deixe em branco para não alterar)</Label>
                            <Input
                                id="password"
                                type="password"
                                {...register("password")}
                                placeholder="******"
                                disabled={updateMutation.isPending}
                            />
                            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="phone">Telefone</Label>
                            <Input
                                id="phone"
                                {...register("phone")}
                                placeholder="(11) 99999-9999"
                                disabled={updateMutation.isPending}
                            />
                            {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="firstname">Nome</Label>
                            <Input
                                id="firstname"
                                {...register("firstname")}
                                placeholder="João"
                                disabled={updateMutation.isPending}
                            />
                            {errors.firstname && <p className="text-sm text-red-500 mt-1">{errors.firstname.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="lastname">Sobrenome</Label>
                            <Input
                                id="lastname"
                                {...register("lastname")}
                                placeholder="Silva"
                                disabled={updateMutation.isPending}
                            />
                            {errors.lastname && <p className="text-sm text-red-500 mt-1">{errors.lastname.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="city">Cidade</Label>
                            <Input id="city" {...register("city")} placeholder="São Paulo" disabled={updateMutation.isPending} />
                            {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="street">Rua</Label>
                            <Input
                                id="street"
                                {...register("street")}
                                placeholder="Rua Principal"
                                disabled={updateMutation.isPending}
                            />
                            {errors.street && <p className="text-sm text-red-500 mt-1">{errors.street.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="number">Número</Label>
                            <Input id="number" {...register("number")} placeholder="123" disabled={updateMutation.isPending} />
                            {errors.number && <p className="text-sm text-red-500 mt-1">{errors.number.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="zipcode">CEP</Label>
                            <Input
                                id="zipcode"
                                {...register("zipcode")}
                                placeholder="12345-678"
                                disabled={updateMutation.isPending}
                            />
                            {errors.zipcode && <p className="text-sm text-red-500 mt-1">{errors.zipcode.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="lat">Latitude</Label>
                            <Input id="lat" {...register("lat")} placeholder="-23.5505" disabled={updateMutation.isPending} />
                            {errors.lat && <p className="text-sm text-red-500 mt-1">{errors.lat.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="long">Longitude</Label>
                            <Input id="long" {...register("long")} placeholder="-46.6333" disabled={updateMutation.isPending} />
                            {errors.long && <p className="text-sm text-red-500 mt-1">{errors.long.message}</p>}
                        </div>
                    </div>

                    <div className="flex gap-4 justify-end pt-4">
                        <Button type="button" onClick={handleClose} variant="outline" disabled={updateMutation.isPending}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={updateMutation.isPending}>
                            {updateMutation.isPending ? "Atualizando..." : "Atualizar Usuário"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
