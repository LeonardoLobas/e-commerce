"use client";

import { useCreateUserMutation } from "../hooks/use-create-user-mutation.hook";
import { useCreateUserForm } from "../hooks/use-create-user-form.hook";
import { CreateUserFormData } from "../schemas/create-user.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CreateUserModal = ({ isOpen, onClose }: CreateUserModalProps) => {
    const createMutation = useCreateUserMutation();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useCreateUserForm();

    if (!isOpen) return null;

    const onSubmit = (data: CreateUserFormData) => {
        createMutation.mutate(data, {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
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
                    disabled={createMutation.isPending}
                >
                    ×
                </button>

                <h2 className="text-xl font-bold mb-6 text-gray-900">Novo Usuário</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                {...register("email")}
                                placeholder="email@example.com"
                                disabled={createMutation.isPending}
                            />
                            {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                {...register("username")}
                                placeholder="username"
                                disabled={createMutation.isPending}
                            />
                            {errors.username && <p className="text-sm text-destructive mt-1">{errors.username.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="password">Senha</Label>
                            <Input
                                id="password"
                                type="password"
                                {...register("password")}
                                placeholder="******"
                                disabled={createMutation.isPending}
                            />
                            {errors.password && <p className="text-sm text-destructive mt-1">{errors.password.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="phone">Telefone</Label>
                            <Input
                                id="phone"
                                {...register("phone")}
                                placeholder="(11) 99999-9999"
                                disabled={createMutation.isPending}
                            />
                            {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="firstname">Nome</Label>
                            <Input
                                id="firstname"
                                {...register("firstname")}
                                placeholder="João"
                                disabled={createMutation.isPending}
                            />
                            {errors.firstname && <p className="text-sm text-destructive mt-1">{errors.firstname.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="lastname">Sobrenome</Label>
                            <Input
                                id="lastname"
                                {...register("lastname")}
                                placeholder="Silva"
                                disabled={createMutation.isPending}
                            />
                            {errors.lastname && <p className="text-sm text-destructive mt-1">{errors.lastname.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="city">Cidade</Label>
                            <Input id="city" {...register("city")} placeholder="São Paulo" disabled={createMutation.isPending} />
                            {errors.city && <p className="text-sm text-destructive mt-1">{errors.city.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="street">Rua</Label>
                            <Input
                                id="street"
                                {...register("street")}
                                placeholder="Rua Principal"
                                disabled={createMutation.isPending}
                            />
                            {errors.street && <p className="text-sm text-destructive mt-1">{errors.street.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="number">Número</Label>
                            <Input id="number" {...register("number")} placeholder="123" disabled={createMutation.isPending} />
                            {errors.number && <p className="text-sm text-destructive mt-1">{errors.number.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="zipcode">CEP</Label>
                            <Input
                                id="zipcode"
                                {...register("zipcode")}
                                placeholder="12345-678"
                                disabled={createMutation.isPending}
                            />
                            {errors.zipcode && <p className="text-sm text-destructive mt-1">{errors.zipcode.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="lat">Latitude (opcional)</Label>
                            <Input id="lat" {...register("lat")} placeholder="-23.5505" disabled={createMutation.isPending} />
                            {errors.lat && <p className="text-sm text-destructive mt-1">{errors.lat.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="long">Longitude (opcional)</Label>
                            <Input id="long" {...register("long")} placeholder="-46.6333" disabled={createMutation.isPending} />
                            {errors.long && <p className="text-sm text-destructive mt-1">{errors.long.message}</p>}
                        </div>
                    </div>

                    <div className="flex gap-4 justify-end pt-4">
                        <Button type="button" onClick={handleClose} variant="outline" disabled={createMutation.isPending}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={createMutation.isPending}>
                            {createMutation.isPending ? "Criando..." : "Criar Usuário"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
