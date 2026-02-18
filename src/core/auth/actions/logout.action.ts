"use server";

import { removeAuthToken } from "../services/token.service";
import { redirect } from "next/navigation";

export async function logoutAction() {
    await removeAuthToken();
    redirect("/login");
}
