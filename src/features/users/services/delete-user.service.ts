"use server";

import { DeleteUserResponseDTO } from "../types/delete-user.types";

export const userDeleteService = async (id: number): Promise<DeleteUserResponseDTO> => {
    const response = await fetch(`${process.env.BASE_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `Falha ao deletar usuário (${response.status})`);
    }

    return response.json();
};
