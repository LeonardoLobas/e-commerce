"use service";
import { RegisterFormData } from "../schemas/register.schema";
import { RegisterResponseDTO } from "../types/auth.types";

export const registerUserService = async (data: RegisterFormData): Promise<RegisterResponseDTO> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `Falha ao registrar usuário (${response.status})`);
    }

    return response.json();
};
