"use client";

import { useUpdateProductMutation } from "../hooks/use-update-product-mutation.hook";
import { useUpdateProductForm } from "../hooks/use-update-product-form.hook";
import { UpdateProductFormData } from "../schemas/update-product.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { X, Pencil } from "lucide-react";

interface EditProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    productId: number;
    defaultValues: UpdateProductFormData;
}

export const EditProductModal = ({ isOpen, onClose, productId, defaultValues }: EditProductModalProps) => {
    const updateMutation = useUpdateProductMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useUpdateProductForm({ defaultValues });

    if (!isOpen) return null;

    const onSubmit = (data: UpdateProductFormData) => {
        updateMutation.mutate(
            { id: productId, data },
            {
                onSuccess: () => {
                    onClose();
                },
            },
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
            <div
                className="bg-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 bg-card border-b px-6 py-4 flex justify-between items-center z-10">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-light">
                            <Pencil className="w-4 h-4 text-brand-primary" />
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-brand-primary"></span>
                                <p className="text-xs font-medium text-brand-primary uppercase tracking-wider">Catálogo</p>
                            </div>
                            <h2 className="text-base font-bold leading-tight">Editar Produto</h2>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-accent rounded-full transition-colors text-muted-foreground hover:text-foreground"
                        disabled={updateMutation.isPending}
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
                    {/* Title */}
                    <Field>
                        <FieldLabel htmlFor="title">Título</FieldLabel>
                        <Input
                            id="title"
                            {...register("title")}
                            placeholder="Nome do produto"
                            disabled={updateMutation.isPending}
                        />
                        {errors.title && <p className="text-sm text-destructive mt-1">{errors.title.message}</p>}
                    </Field>

                    {/* Price + Category side by side */}
                    <div className="grid grid-cols-2 gap-4">
                        <Field>
                            <FieldLabel htmlFor="price">Preço</FieldLabel>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                {...register("price")}
                                placeholder="0.00"
                                disabled={updateMutation.isPending}
                            />
                            {errors.price && <p className="text-sm text-destructive mt-1">{errors.price.message}</p>}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="category">Categoria</FieldLabel>
                            <Input
                                id="category"
                                {...register("category")}
                                placeholder="Ex: electronics"
                                disabled={updateMutation.isPending}
                            />
                            {errors.category && <p className="text-sm text-destructive mt-1">{errors.category.message}</p>}
                        </Field>
                    </div>

                    {/* Description */}
                    <Field>
                        <FieldLabel htmlFor="description">Descrição</FieldLabel>
                        <textarea
                            id="description"
                            {...register("description")}
                            placeholder="Descreva o produto..."
                            disabled={updateMutation.isPending}
                            rows={4}
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                        />
                        {errors.description && <p className="text-sm text-destructive mt-1">{errors.description.message}</p>}
                    </Field>

                    {/* Image URL */}
                    <Field>
                        <FieldLabel htmlFor="image">
                            URL da Imagem <span className="text-muted-foreground font-normal">(opcional)</span>
                        </FieldLabel>
                        <Input id="image" {...register("image")} placeholder="https://..." disabled={updateMutation.isPending} />
                        {errors.image && <p className="text-sm text-destructive mt-1">{errors.image.message}</p>}
                    </Field>

                    {/* Actions */}
                    <div className="flex gap-3 justify-end pt-2 border-t">
                        <Button type="button" onClick={onClose} variant="outline" disabled={updateMutation.isPending}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={updateMutation.isPending} className="min-w-36">
                            {updateMutation.isPending ? "Salvando..." : "Salvar Alterações"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
