"use server";

import { redirect } from "next/navigation";

import { removeAuthToken } from "../services/token.service";

export async function logoutAction() {
    await removeAuthToken();
    redirect("/login");
}
