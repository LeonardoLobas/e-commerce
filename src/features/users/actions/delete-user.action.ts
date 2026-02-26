"use server";

import { ActionResponse } from "@/shared/types/action-response.types";
import { DeleteUserResponseDTO } from "../types/delete-user.types";
import { userDeleteService } from "../services/delete-user.service";

export const deleteUserAction = async (id: number): Promise<ActionResponse<DeleteUserResponseDTO>> => {
    try {
        const data = await userDeleteService(id);
        return {
            success: true,
            data,
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Erro desconhecido ao deletar usuário",
        };
    }
};
