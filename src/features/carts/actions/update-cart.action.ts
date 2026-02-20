"use server";

import { ActionResponse } from "@/shared/types/action-response.types";
import { UpdateCartRequestDTO, UpdateCartResponseDTO } from "../types/update-cart.types";
import { updateCartService } from "../services/update-cart.service";

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
