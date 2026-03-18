"use client";

import { useQuery } from "@tanstack/react-query";

import { getAllUsersAction } from "../actions/get-all-users.action";
import { type UsersListResponseDTO } from "../types/get-all-users.types";

export const useUsersQuery = () => {
    return useQuery<UsersListResponseDTO, Error>({
        queryKey: ["users"],

        queryFn: async () => {
            const result = await getAllUsersAction();

            if (!result.success || !result.data) {
                throw new Error(result.error || "Erro ao buscar usuários");
            }

            return result.data;
        },

        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
};
