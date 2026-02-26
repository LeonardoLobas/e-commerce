"use server";

import { ActionResponse } from "@/shared/types/action-response.types";
import { UpdateUserFormData, updateUserSchema } from "../schemas/update-user.schema";
import { UpdateUserRequestDTO, UpdateUserResponseDTO } from "../types/update-user.types";
import { updateUserService } from "../services/update-user.service";

export const updateUserAction = async (id: number, data: UpdateUserFormData): Promise<ActionResponse<UpdateUserResponseDTO>> => {
    const validatedFields = updateUserSchema.safeParse(data);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors as Record<string, string[]>,
        };
    }

    try {
        const { firstname, lastname, city, street, number, zipcode, lat, long, ...rest } = validatedFields.data;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updateData: any = { ...rest };

        if (firstname || lastname) {
            updateData.name = {
                ...(firstname && { firstname }),
                ...(lastname && { lastname }),
            };
        }

        if (city || street || number || zipcode || lat || long) {
            updateData.address = {
                ...(city && { city }),
                ...(street && { street }),
                ...(number && { number: Number(number) }),
                ...(zipcode && { zipcode }),
                geolocation: {
                    ...(lat && { lat }),
                    ...(long && { long }),
                },
            };
        }

        const result = await updateUserService(id, updateData as UpdateUserRequestDTO);

        return {
            success: true,
            data: result,
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Erro desconhecido ao atualizar usuário",
        };
    }
};
