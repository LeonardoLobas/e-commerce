"use server";

import { type ActionResponse } from "@/shared/types/action-response.types";

import { userFindByIdService } from "../services/single-user.service";
import { type SingleUserResponseDTO } from "../types/single-user.types";

export async function getSingleUserAction(id: number): Promise<ActionResponse<SingleUserResponseDTO>> {
    try {
        const user = await userFindByIdService(id);

        return {
            success: true,
            data: user,
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Erro ao buscar usuário",
        };
    }
}
