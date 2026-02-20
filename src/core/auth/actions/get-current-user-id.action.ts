"use server";

import { getUserIdFromToken } from "../services/get-user-id.service";

export const getCurrentUserIdAction = async (): Promise<number | null> => {
    return await getUserIdFromToken();
};
