"use server";

import { ActionResponse } from "@/shared/types/action-response.types";
import { DeleteCartResponseDTO } from "../types/delete-cart.types";
import { deleteCartService } from "../services/delete-cart.service";

export const deleteCartAction = async (id: number): Promise<ActionResponse<DeleteCartResponseDTO>> => {
    try {
        const data = await deleteCartService(id);
        return {
            success: true,
            data,
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Erro desconhecido ao deletar carrinho",
        };
    }
};
