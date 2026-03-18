"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateProductAction } from "../actions/update-product.action";
import { type UpdateProductFormData } from "../schemas/update-product.schema";

export const useUpdateProductMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: UpdateProductFormData }) => {
            const result = await updateProductAction(id, data);

            if (!result.success) {
                throw new Error(result.error || "Erro ao atualizar produto");
            }

            return result.data;
        },
        onSuccess: (updatedProduct) => {
            if (!updatedProduct) return;

            queryClient.invalidateQueries({ queryKey: ["product", updatedProduct.id] });

            toast.success("Produto atualizado com sucesso!");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Erro ao atualizar produto");
        },
    });
};
