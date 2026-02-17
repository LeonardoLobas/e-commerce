"use service";
import { RegisterFormData } from "../schemas/register.schema";
import { RegisterResponseDTO } from "../types/auth.types";

/**
 * Service para comunicação com a API de registro
 *
 * Responsabilidades:
 * - Fazer chamada HTTP para API externa
 * - Transformar dados se necessário
 * - Lançar erros descritivos
 *
 * Nota: Este service é puro (sem dependências do Next.js)
 * podendo ser facilmente testado e reutilizado
 */
export const registerUserService = async (data: RegisterFormData): Promise<RegisterResponseDTO> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    // Tratamento de erro com mensagem mais detalhada
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `Falha ao registrar usuário (${response.status})`);
    }

    return response.json();
};
