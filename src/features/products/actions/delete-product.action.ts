"use server";

import { ActionResponse } from "@/shared/types/action-response.types";
import { DeleteProductResponseDTO } from "../types/product.types";
import { productDeleteService } from "../services/delete-product.service";

export const deleteProductAction = async (id: number): Promise<ActionResponse<DeleteProductResponseDTO>> => {
    try {
        const data = await productDeleteService(id);
        return {
            success: true,
            data,
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Erro desconhecido ao deletar produto",
        };
    }
};
