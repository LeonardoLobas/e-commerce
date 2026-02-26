"use server";

import { UsersListResponseDTO } from "../types/get-all-users.types";

export const usersFindAllService = async (): Promise<UsersListResponseDTO> => {
    const response = await fetch(`${process.env.BASE_URL}/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `Falha ao buscar usuários (${response.status})`);
    }

    return response.json();
};
