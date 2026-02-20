"use server";

import { UpdateCartRequestDTO, UpdateCartResponseDTO } from "../types/update-cart.types";

export const updateCartService = async (id: number, data: UpdateCartRequestDTO): Promise<UpdateCartResponseDTO> => {
    const response = await fetch(`${process.env.BASE_URL}/carts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `Falha ao atualizar carrinho (${response.status})`);
    }

    return response.json();
};
