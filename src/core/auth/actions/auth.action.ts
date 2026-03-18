"use server";

import { type ActionResponse } from "@/shared/types/action-response.types";

import { type LoginFormData, loginSchema } from "../schemas/login.schema";
import { authService } from "../services/auth.service";
import { setAuthToken } from "../services/token.service";
import { type LoginResponseDTO } from "../types/auth.types";

export async function loginAction(data: LoginFormData): Promise<ActionResponse<LoginResponseDTO>> {
    try {
        const validatedFields = loginSchema.safeParse(data);

        if (!validatedFields.success) {
            return {
                success: false,
                error: "Dados inválidos. Verifique os campos e tente novamente.",
            };
        }
        const response = await authService(validatedFields.data);

        await setAuthToken(response.token);

        return {
            success: true,
            data: response,
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                error: error.message,
            };
        }
        return {
            success: false,
            error: "Erro inesperado ao autenticar conta",
        };
    }
}
