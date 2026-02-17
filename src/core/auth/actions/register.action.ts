"use server";

import { registerSchema, type RegisterFormData } from "../schemas/register.schema";
import { registerUserService } from "../services/register-user.service";
import type { RegisterResponseDTO } from "../types/auth.types";

/**
 * Tipo de retorno padronizado para Server Actions
 * Facilita tratamento de erros no cliente
 */
type ActionResult =
    | {
          success: true;
          data: RegisterResponseDTO;
      }
    | {
          success: false;
          error: string;
      };

/**
 * Server Action para registro de usuário
 *
 * Responsabilidades:
 * - Validação dos dados (segurança server-side)
 * - Orquestração da lógica de negócio
 * - Tratamento de erros padronizado
 * - Proteção CSRF automática (Next.js)
 */
export async function registerUserAction(formData: RegisterFormData): Promise<ActionResult> {
    try {
        // 1. Validação server-side obrigatória (mesmo que valide no client)
        const validatedData = registerSchema.parse(formData);

        // 2. Delega a lógica de negócio para o service
        const data = await registerUserService(validatedData);

        // 3. Opcional: Revalidar cache do Next.js se necessário
        // import { revalidatePath } from 'next/cache';
        // revalidatePath('/users');

        // 4. Retorna sucesso
        return {
            success: true,
            data,
        };
    } catch (error) {
        // Log para debugging (não expõe ao cliente)
        console.error("[Register Action Error]", error);

        // Retorna erro tratado
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
