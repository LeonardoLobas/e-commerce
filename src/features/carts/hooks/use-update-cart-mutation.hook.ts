"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateCartAction } from "../actions/update-cart.action";
import { type UpdateCartRequestDTO } from "../types/update-cart.types";

export const useUpdateCartMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: UpdateCartRequestDTO }) => {
            const result = await updateCartAction(id, data);

            if (!result.success) {
                throw new Error(result.error || "Erro ao atualizar carrinho");
            }

            return result.data;
        },
        onSuccess: (data) => {
            if (data) {
                queryClient.invalidateQueries({ queryKey: ["carts", data.userId] });
                toast.success("Carrinho atualizado!");
            }
        },
        onError: (error: Error) => {
            toast.error(error.message || "Erro ao atualizar carrinho");
        },
    });
};
