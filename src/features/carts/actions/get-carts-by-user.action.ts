"use server";

import { ActionResponse } from "@/shared/types/action-response.types";
import { CartListResponseDTO } from "../types/get-carts-by-user.types";
import { getCartsByUserService } from "../services/get-carts-by-user.service";

export const getCartsByUserAction = async (userId: number): Promise<ActionResponse<CartListResponseDTO>> => {
    try {
        const data = await getCartsByUserService(userId);
        return {
            success: true,
            data,
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Erro desconhecido ao buscar carrinhos",
        };
    }
};
