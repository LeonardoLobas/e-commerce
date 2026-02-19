"use client";

import { useCreateProductMutation } from "../hooks/use-create-product-mutation.hook";
import { useCreateProductForm } from "../hooks/use-create-product-form.hook";
import { CreateProductFormData } from "../schemas/create-product.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreateProductModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CreateProductModal = ({ isOpen, onClose }: CreateProductModalProps) => {
    const createMutation = useCreateProductMutation();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useCreateProductForm();

    if (!isOpen) return null;

    const onSubmit = (data: CreateProductFormData) => {
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
                className="relative bg-white rounded-lg p-6 max-w-2xl w-full mx-4 shadow-xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                    disabled={createMutation.isPending}
                >
                    ×
                </button>

                <h2 className="text-xl font-bold mb-6 text-gray-900">Novo Produto</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label htmlFor="title">Título</Label>
                        <Input
                            id="title"
                            {...register("title")}
                            placeholder="Nome do produto"
                            disabled={createMutation.isPending}
                        />
                        {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="price">Preço</Label>
                        <Input
                            id="price"
                            type="text"
                            step="0.01"
                            {...register("price")}
                            placeholder="0.00"
                            disabled={createMutation.isPending}
                        />
                        {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="category">Categoria</Label>
                        <Input
                            id="category"
                            {...register("category")}
                            placeholder="Categoria do produto"
                            disabled={createMutation.isPending}
                        />
                        {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="description">Descrição</Label>
                        <textarea
                            id="description"
                            {...register("description")}
                            placeholder="Descrição do produto"
                            disabled={createMutation.isPending}
                            className="flex min-h-30 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="image">URL da Imagem (opcional)</Label>
                        <Input id="image" {...register("image")} placeholder="https://..." disabled={createMutation.isPending} />
                        {errors.image && <p className="text-sm text-red-500 mt-1">{errors.image.message}</p>}
                    </div>

                    <div className="flex gap-4 justify-end pt-4">
                        <Button type="button" onClick={handleClose} variant="outline" disabled={createMutation.isPending}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={createMutation.isPending}>
                            {createMutation.isPending ? "Criando..." : "Criar Produto"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
