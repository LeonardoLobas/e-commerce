"use server";

import { ActionResponse } from "@/shared/types/action-response.types";
import { AddToCartRequestDTO, AddToCartResponseDTO } from "../types/add-to-cart.types";
import { addToCartService } from "../services/add-to-cart.service";

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
