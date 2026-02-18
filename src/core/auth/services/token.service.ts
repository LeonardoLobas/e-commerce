"use server";

import { cookies } from "next/headers";

const TOKEN_NAME = "auth_token";
const TOKEN_MAX_AGE = 60 * 60 * 24 * 7;

export const setAuthToken = async (token: string) => {
    const cookieStore = await cookies();
    cookieStore.set(TOKEN_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: TOKEN_MAX_AGE,
        path: "/",
    });
};

export const getAuthToken = async (): Promise<string | undefined> => {
    const cookieStore = await cookies();
    return cookieStore.get(TOKEN_NAME)?.value;
};

export const removeAuthToken = async () => {
    const cookieStore = await cookies();
    cookieStore.delete(TOKEN_NAME);
};
