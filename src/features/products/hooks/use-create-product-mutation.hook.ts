"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createProductAction } from "../actions/create-product.action";
import { CreateProductFormData } from "../schemas/create-product.schema";
import { CreateProductResponseDTO } from "../types/create-product.types";

export const useCreateProductMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateProductFormData): Promise<CreateProductResponseDTO> => {
            const result = await createProductAction(data);

            if (!result.success || !result.data) {
                throw new Error(result.error || "Erro ao criar produto");
            }

            return result.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["product"] });

            toast.success("Produto criado com sucesso!");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Erro ao criar produto");
        },
    });
};
