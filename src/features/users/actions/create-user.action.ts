"use server";

import { type ActionResponse } from "@/shared/types/action-response.types";

import { type CreateUserFormData, createUserSchema } from "../schemas/create-user.schema";
import { createUserService } from "../services/create-user.service";
import { type CreateUserResponseDTO } from "../types/create-user.types";

export const createUserAction = async (data: CreateUserFormData): Promise<ActionResponse<CreateUserResponseDTO>> => {
    const validatedFields = createUserSchema.safeParse(data);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors as Record<string, string[]>,
        };
    }

    try {
        const { firstname, lastname, city, street, number, zipcode, lat, long, ...rest } = validatedFields.data;

        const result = await createUserService({
            ...rest,
            name: {
                firstname,
                lastname,
            },
            address: {
                city,
                street,
                number: Number(number),
                zipcode,
                geolocation: {
                    lat: lat || "-37.3159",
                    long: long || "81.1496",
                },
            },
        });

        return {
            success: true,
            data: result,
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Erro desconhecido ao criar usuário",
        };
    }
};
