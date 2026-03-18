"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteUserAction } from "../actions/delete-user.action";
import { type DeleteUserResponseDTO } from "../types/delete-user.types";

export const useDeleteUserMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number): Promise<DeleteUserResponseDTO> => {
            const result = await deleteUserAction(id);

            if (!result.success || !result.data) {
                throw new Error(result.error || "Erro ao deletar usuário");
            }

            return result.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });

            toast.success("Usuário deletado com sucesso!");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Erro ao deletar usuário");
        },
    });
};
