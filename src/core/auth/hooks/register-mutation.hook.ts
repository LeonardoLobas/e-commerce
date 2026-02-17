import { toast } from "sonner";
import { RegisterFormData } from "../schemas/register.schema";
import { registerUserAction } from "../actions/register.action";
import { RegisterResponseDTO } from "../types/auth.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useRegisterMutation = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation<RegisterResponseDTO, Error, RegisterFormData>({
        mutationKey: ["register"],

        mutationFn: async (data: RegisterFormData) => {
            const result = await registerUserAction(data);

            if (!result.success) {
                throw new Error(result.error);
            }

            return result.data;
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
