"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addToCartAction } from "../actions/add-to-cart.action";
import { type AddToCartRequestDTO } from "../types/add-to-cart.types";

export const useAddToCartMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: AddToCartRequestDTO) => {
            const result = await addToCartAction(data);

            if (!result.success) {
                throw new Error(result.error || "Erro ao adicionar ao carrinho");
            }

            return result.data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["carts", variables.userId] });
            toast.success("Produto adicionado ao carrinho!");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Erro ao adicionar ao carrinho");
        },
    });
};
