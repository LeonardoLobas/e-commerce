// auth.service.ts
"use server";

import { LoginFormData } from "../schemas/login.schema";
import { LoginResponseDTO } from "../types/auth.types";

export const authService = async (data: LoginFormData): Promise<LoginResponseDTO> => {
    const response = await fetch(`${process.env.BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `Falha ao fazer login (${response.status})`);
    }

    const result = await response.json();
    return result;
};
