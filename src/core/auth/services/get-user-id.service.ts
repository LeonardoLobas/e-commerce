"use server";

import { getAuthToken } from "./token.service";

interface JWTPayload {
    sub: number;
    user: number;
    iat: number;
}

export const getUserIdFromToken = async (): Promise<number | null> => {
    try {
        const token = await getAuthToken();

        if (!token) {
            return null;
        }

        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join(""),
        );

        const payload: JWTPayload = JSON.parse(jsonPayload);

        return payload.sub || payload.user || null;
    } catch (error) {
        console.error("Erro ao decodificar token:", error);
        return null;
    }
};
