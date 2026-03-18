"use server";

import { type ActionResponse } from "@/shared/types/action-response.types";

import { usersFindAllService } from "../services/get-all-users.service";
import { type UsersListResponseDTO } from "../types/get-all-users.types";

export async function getAllUsersAction(): Promise<ActionResponse<UsersListResponseDTO>> {
    try {
        const users = await usersFindAllService();

        return {
            success: true,
            data: users,
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                error: error.message,
            };
        }
        return {
            success: false,
            error: "Erro inesperado ao buscar usuários",
        };
    }
}
