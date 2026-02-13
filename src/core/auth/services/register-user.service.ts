import { RegisterFormData } from "../schemas/register.schema";
import { RegisterResponse } from "../types/auth.types";

export const registerUserService = async (data: RegisterFormData): Promise<RegisterResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error("Falha ao registrar usuário");
    }
    return response.json();
};
