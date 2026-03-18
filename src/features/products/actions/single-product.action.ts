"use server";

import { type ActionResponse } from "@/shared/types/action-response.types";

import { productFindByIdService } from "../services/single-product.service";
import { type SingleProductResponseDTO } from "../types/single-product.types";

export async function getSingleProductAction(id: number): Promise<ActionResponse<SingleProductResponseDTO>> {
    try {
        const product = await productFindByIdService(id);

        return {
            success: true,
            data: product,
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Erro ao buscar produto",
        };
    }
}
