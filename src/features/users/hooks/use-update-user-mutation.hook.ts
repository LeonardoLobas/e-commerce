"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUserAction } from "../actions/update-user.action";
import { UpdateUserFormData } from "../schemas/update-user.schema";
import { UpdateUserResponseDTO } from "../types/update-user.types";

export const useUpdateUserMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: UpdateUserFormData }): Promise<UpdateUserResponseDTO> => {
            const result = await updateUserAction(id, data);

            if (!result.success || !result.data) {
                throw new Error(result.error || "Erro ao atualizar usuário");
            }

            return result.data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["user", variables.id] });

            toast.success("Usuário atualizado com sucesso!");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Erro ao atualizar usuário");
        },
    });
};
