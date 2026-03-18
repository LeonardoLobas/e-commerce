"use server";

import { type UpdateUserRequestDTO, type UpdateUserResponseDTO } from "../types/update-user.types";

export const updateUserService = async (id: number, data: UpdateUserRequestDTO): Promise<UpdateUserResponseDTO> => {
    const response = await fetch(`${process.env.BASE_URL}/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `Falha ao atualizar usuário (${response.status})`);
    }

    return response.json();
};
