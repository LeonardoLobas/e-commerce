"use server";

import { type AddToCartRequestDTO, type AddToCartResponseDTO } from "../types/add-to-cart.types";

export const addToCartService = async (data: AddToCartRequestDTO): Promise<AddToCartResponseDTO> => {
    const response = await fetch(`${process.env.BASE_URL}/carts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `Falha ao adicionar ao carrinho (${response.status})`);
    }

    return response.json();
};
