"use server";

import { type CreateUserRequestDTO, type CreateUserResponseDTO } from "../types/create-user.types";

export const createUserService = async (data: CreateUserRequestDTO): Promise<CreateUserResponseDTO> => {
    const response = await fetch(`${process.env.BASE_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `Falha ao criar usuário (${response.status})`);
    }

    return response.json();
};
