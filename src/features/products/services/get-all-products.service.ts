import { ProductsListResponseDTO } from "../types/get-all-products.types";

export const productsFindAllService = async (): Promise<ProductsListResponseDTO> => {
    const response = await fetch(`${process.env.BASE_URL}/products`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `Falha ao trazer produtos (${response.status})`);
    }

    return response.json();
};
