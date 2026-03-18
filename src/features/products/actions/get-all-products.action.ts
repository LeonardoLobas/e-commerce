"use server";

import { type ActionResponse } from "@/shared/types/action-response.types";

import { productsFindAllService } from "../services/get-all-products.service";
import { type ProductsListResponseDTO } from "../types/get-all-products.types";

export async function getAllProductsAction(): Promise<ActionResponse<ProductsListResponseDTO>> {
    try {
        const products = await productsFindAllService();

        return {
            success: true,
            data: products,
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                error: error.message,
            };
        }
        return {
            success: false,
            error: "Erro inesperado ao buscar produtos",
        };
    }
}
