"use server";

import { type ActionResponse } from "@/shared/types/action-response.types";

import { userDeleteService } from "../services/delete-user.service";
import { type DeleteUserResponseDTO } from "../types/delete-user.types";

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
