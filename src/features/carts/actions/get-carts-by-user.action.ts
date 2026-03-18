"use server";

import { type ActionResponse } from "@/shared/types/action-response.types";

import { getCartsByUserService } from "../services/get-carts-by-user.service";
import { type CartListResponseDTO } from "../types/get-carts-by-user.types";

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
