"use server";

import { type DeleteCartResponseDTO } from "../types/delete-cart.types";

export const deleteCartService = async (id: number): Promise<DeleteCartResponseDTO> => {
    const response = await fetch(`${process.env.BASE_URL}/carts/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `Falha ao deletar carrinho (${response.status})`);
    }

    return response.json();
};
