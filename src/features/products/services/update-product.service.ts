"use server";

import { UpdateProductRequestDTO, UpdateProductResponseDTO } from "../types/update-product.types";

export const updateProductService = async (id: number, data: UpdateProductRequestDTO): Promise<UpdateProductResponseDTO> => {
    const response = await fetch(`${process.env.BASE_URL}/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `Falha ao atualizar produto (${response.status})`);
    }

    return response.json();
};
