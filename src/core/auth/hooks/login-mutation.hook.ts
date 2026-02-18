import { toast } from "sonner";
import { LoginFormData } from "../schemas/login.schema";
import { loginAction } from "../actions/auth.action";
import { LoginResponseDTO } from "../types/auth.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLoginMutation = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation<LoginResponseDTO, Error, LoginFormData>({
        mutationKey: ["login"],

        mutationFn: async (data: LoginFormData) => {
            const result = await loginAction(data);

            if (!result.success) {
                throw new Error(result.error);
            }

            return result.data;
        },

        onSuccess: () => {
            toast.success("Login realizado com sucesso!", {
                description: "Você será redirecionado.",
            });

            queryClient.invalidateQueries({ queryKey: ["auth", "user"] });

            setTimeout(() => {
                router.push("/");
                router.refresh();
            }, 1000);
        },

        onError: (error) => {
            toast.error("Erro ao fazer login", {
                description: error.message || "Verifique suas credenciais.",
            });
        },
    });
};
