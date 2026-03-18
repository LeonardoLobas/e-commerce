import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { registerUserAction } from "../actions/register.action";
import { type RegisterFormData } from "../schemas/register.schema";
import { type RegisterResponseDTO } from "../types/auth.types";

export const useRegisterMutation = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation<RegisterResponseDTO, Error, RegisterFormData>({
        mutationKey: ["register"],

        mutationFn: async (data: RegisterFormData): Promise<RegisterResponseDTO> => {
            const result = await registerUserAction(data);

            if (!result.success) {
                throw new Error(result.error);
            }

            return result.data as RegisterResponseDTO;
        },

        onSuccess: () => {
            toast.success("Conta criada com sucesso!", {
                description: "Você será redirecionado para fazer login.",
            });

            queryClient.invalidateQueries({ queryKey: ["users"] });

            setTimeout(() => {
                router.push("/login");
            }, 3000);
        },

        onError: (error) => {
            toast.error("Erro ao criar conta", {
                description: error.message || "Tente novamente mais tarde.",
            });
        },
    });
};
