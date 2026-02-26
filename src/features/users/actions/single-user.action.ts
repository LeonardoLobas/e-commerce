"use server";

import { userFindByIdService } from "../services/single-user.service";
import { SingleUserResponseDTO } from "../types/single-user.types";
import { ActionResponse } from "@/shared/types/action-response.types";

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
