import { type SingleProductResponseDTO } from "../types/single-product.types";

export const productFindByIdService = async (id: number): Promise<SingleProductResponseDTO> => {
    const response = await fetch(`${process.env.BASE_URL}/products/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `Falha ao buscar produto (${response.status})`);
    }

    return response.json();
};
