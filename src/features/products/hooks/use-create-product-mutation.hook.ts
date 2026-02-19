"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createProductAction } from "../actions/create-product.action";
import { CreateProductFormData } from "../schemas/create-product.schema";
import { ProductsResponseDTO } from "../types/get-all-products.types";

export const useCreateProductMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateProductFormData) => {
            const result = await createProductAction(data);

            if (!result.success) {
                throw new Error(result.error || "Erro ao criar produto");
            }

            return result.data;
        },
        onSuccess: (newProduct) => {
            if (!newProduct) return;

            // Adiciona o produto no cache localmente (instantâneo!)
            queryClient.setQueryData<ProductsResponseDTO[]>(["products"], (oldData) => {
                return [newProduct as ProductsResponseDTO, ...(oldData || [])];
            });

            toast.success("Produto criado com sucesso!");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Erro ao criar produto");
        },
    });
};
