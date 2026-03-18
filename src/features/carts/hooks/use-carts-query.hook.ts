"use client";

import { useQuery } from "@tanstack/react-query";

import { getCartsByUserAction } from "../actions/get-carts-by-user.action";

export const useCartsByUserQuery = (userId: number) => {
    return useQuery({
        queryKey: ["carts", userId],
        queryFn: async () => {
            const result = await getCartsByUserAction(userId);

            if (!result.success) {
                throw new Error(result.error || "Erro ao buscar carrinhos");
            }

            return result.data;
        },
        enabled: !!userId,
    });
};
