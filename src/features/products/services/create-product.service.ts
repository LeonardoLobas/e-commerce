"use server";

import { type CreateProductRequestDTO, type CreateProductResponseDTO } from "../types/create-product.types";

export const createProductService = async (data: CreateProductRequestDTO): Promise<CreateProductResponseDTO> => {
    const response = await fetch(`${process.env.BASE_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `Falha ao criar produto (${response.status})`);
    }

    return response.json();
};
