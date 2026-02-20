"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteCartAction } from "../actions/delete-cart.action";

export const useDeleteCartMutation = (userId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (cartId: number) => {
            const result = await deleteCartAction(cartId);

            if (!result.success) {
                throw new Error(result.error || "Erro ao deletar carrinho");
            }

            return result.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["carts", userId] });
            toast.success("Carrinho removido!");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Erro ao deletar carrinho");
        },
    });
};
