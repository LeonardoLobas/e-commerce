"use server";

import { type ActionResponse } from "@/shared/types/action-response.types";

import { type RegisterFormData,registerSchema } from "../schemas/register.schema";
import { registerUserService } from "../services/register-user.service";
import type { RegisterResponseDTO } from "../types/auth.types";

export async function registerUserAction(formData: RegisterFormData): Promise<ActionResponse<RegisterResponseDTO>> {
    try {
        const validatedData = registerSchema.parse(formData);
        const data = await registerUserService(validatedData);
        return {
            success: true,
            data,
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
            error: "Erro inesperado ao criar conta",
        };
    }
}
