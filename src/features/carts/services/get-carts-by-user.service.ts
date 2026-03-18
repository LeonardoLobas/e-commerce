"use server";

import { type CartListResponseDTO } from "../types/get-carts-by-user.types";

export const getCartsByUserService = async (userId: number): Promise<CartListResponseDTO> => {
    const response = await fetch(`${process.env.BASE_URL}/carts/user/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `Falha ao buscar carrinhos (${response.status})`);
    }

    return response.json();
};
