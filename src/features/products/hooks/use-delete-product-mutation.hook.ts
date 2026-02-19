"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteProductAction } from "../actions/delete-product.action";

export const useDeleteProductMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (productId: number) => {
            const result = await deleteProductAction(productId);

            if (!result.success) {
                throw new Error(result.error || "Erro ao deletar produto");
            }

            return result.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Produto deletado com sucesso!");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Erro ao deletar produto");
        },
    });
};
