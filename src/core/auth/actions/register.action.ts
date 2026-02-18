"use server";

import { registerSchema, type RegisterFormData } from "../schemas/register.schema";
import { registerUserService } from "../services/register-user.service";
import type { RegisterResponseDTO } from "../types/auth.types";

type ActionResult =
    | {
          success: true;
          data: RegisterResponseDTO;
      }
    | {
          success: false;
          error: string;
      };

export async function registerUserAction(formData: RegisterFormData): Promise<ActionResult> {
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
