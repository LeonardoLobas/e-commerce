"use server";

import { SingleUserResponseDTO } from "../types/single-user.types";

export const userFindByIdService = async (id: number): Promise<SingleUserResponseDTO> => {
    const response = await fetch(`${process.env.BASE_URL}/users/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `Falha ao buscar usuário (${response.status})`);
    }

    return response.json();
};
