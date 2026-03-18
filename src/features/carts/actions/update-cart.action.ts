"use server";

import { type ActionResponse } from "@/shared/types/action-response.types";

import { updateCartService } from "../services/update-cart.service";
import { type UpdateCartRequestDTO, type UpdateCartResponseDTO } from "../types/update-cart.types";

export const updateCartAction = async (
    id: number,
    data: UpdateCartRequestDTO,
): Promise<ActionResponse<UpdateCartResponseDTO>> => {
    try {
        const result = await updateCartService(id, data);
        return {
            success: true,
            data: result,
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Erro desconhecido ao atualizar carrinho",
        };
    }
};
