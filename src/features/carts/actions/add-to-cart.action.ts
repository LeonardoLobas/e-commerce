"use server";

import { type ActionResponse } from "@/shared/types/action-response.types";

import { addToCartService } from "../services/add-to-cart.service";
import { type AddToCartRequestDTO, type AddToCartResponseDTO } from "../types/add-to-cart.types";

export const addToCartAction = async (data: AddToCartRequestDTO): Promise<ActionResponse<AddToCartResponseDTO>> => {
    try {
        const result = await addToCartService(data);
        return {
            success: true,
            data: result,
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Erro desconhecido ao adicionar ao carrinho",
        };
    }
};
