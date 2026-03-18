"use server";

import { type ActionResponse } from "@/shared/types/action-response.types";

import { productDeleteService } from "../services/delete-product.service";
import { type DeleteProductResponseDTO } from "../types/product.types";

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
