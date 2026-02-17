import { toast } from "sonner";
import { RegisterFormData } from "../schemas/register.schema";
import { registerUserAction } from "../actions/register.action";
import { RegisterResponseDTO } from "../types/auth.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

/**
 * Hook para mutação de registro com React Query
 *
 * Integra Server Action com React Query para:
 * - Loading states
 * - Error handling
 * - Cache invalidation
 * - Optimistic updates (se necessário)
 */
export const useRegisterMutation = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation<RegisterResponseDTO, Error, RegisterFormData>({
        mutationKey: ["register"],

        mutationFn: async (data: RegisterFormData) => {
            // Chama a Server Action
            const result = await registerUserAction(data);

            // Verifica resultado
            if (!result.success) {
                throw new Error(result.error);
            }

            return result.data;
        },

        onSuccess: () => {
            toast.success("Conta criada com sucesso!", {
                description: "Você será redirecionado para fazer login.",
            });

            // Invalida queries relacionadas
            queryClient.invalidateQueries({ queryKey: ["users"] });

            // Redireciona após delay
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
