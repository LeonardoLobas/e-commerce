import { type DeleteProductResponseDTO } from "../types/product.types";

export const productDeleteService = async (id: number): Promise<DeleteProductResponseDTO> => {
    const response = await fetch(`${process.env.BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `Falha ao deletar produto (${response.status})`);
    }

    return response.json();
};
