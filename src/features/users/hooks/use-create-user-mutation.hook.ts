"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createUserAction } from "../actions/create-user.action";
import { type CreateUserFormData } from "../schemas/create-user.schema";
import { type CreateUserResponseDTO } from "../types/create-user.types";

export const useCreateUserMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateUserFormData): Promise<CreateUserResponseDTO> => {
            const result = await createUserAction(data);

            if (!result.success || !result.data) {
                throw new Error(result.error || "Erro ao criar usuário");
            }

            return result.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });

            toast.success("Usuário criado com sucesso!");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Erro ao criar usuário");
        },
    });
};
