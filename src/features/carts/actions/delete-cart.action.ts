"use server";

import { type ActionResponse } from "@/shared/types/action-response.types";

import { deleteCartService } from "../services/delete-cart.service";
import { type DeleteCartResponseDTO } from "../types/delete-cart.types";

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
