import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { loginAction } from "../actions/auth.action";
import { type LoginFormData } from "../schemas/login.schema";
import { type LoginResponseDTO } from "../types/auth.types";
import { useAuth } from "./use-auth.hook";

export const useLoginMutation = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { refreshUser } = useAuth();

    return useMutation<LoginResponseDTO, Error, LoginFormData>({
        mutationKey: ["login"],

        mutationFn: async (data: LoginFormData): Promise<LoginResponseDTO> => {
            const result = await loginAction(data);

            if (!result.success) {
                throw new Error(result.error);
            }

            if (!result.data) {
                throw new Error("No data returned from login");
            }

            return result.data;
        },

        onSuccess: async () => {
            await refreshUser();

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
            toast.error(error.message || "Usuário ou senha incorretos.");
        },
    });
};
