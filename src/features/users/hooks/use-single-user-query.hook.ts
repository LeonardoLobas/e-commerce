"use client";

import { useQuery } from "@tanstack/react-query";
import { getSingleUserAction } from "../actions/single-user.action";
import { SingleUserResponseDTO } from "../types/single-user.types";

export const useSingleUserQuery = (id: number) => {
    return useQuery<SingleUserResponseDTO, Error>({
        queryKey: ["user", id],

        queryFn: async () => {
            const result = await getSingleUserAction(id);

            if (!result.success || !result.data) {
                throw new Error(result.error || "Erro ao buscar usuário");
            }

            return result.data;
        },

        enabled: !!id,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
};
