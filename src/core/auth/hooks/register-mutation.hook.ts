import { RegisterFormData } from "../schemas/register.schema";
import { registerUserService } from "../services/register-user.service";
import { RegisterResponse } from "../types/auth.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRegisterMutation = () => {
    const queryClient = useQueryClient();
    return useMutation<RegisterResponse, Error, RegisterFormData>({
        mutationKey: ["register"],
        mutationFn: registerUserService,
        onSuccess: (data) => {
            console.log("Usuario registrado com sucesso", data);
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error) => {
            console.error("Erro ao registrar usuário:", error);
        },
    });
};
