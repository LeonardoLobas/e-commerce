"use server";

import { ActionResponse } from "@/shared/types/action-response.types";
import { UpdateProductFormData, updateProductSchema } from "../schemas/update-product.schema";
import { UpdateProductResponseDTO } from "../types/update-product.types";
import { updateProductService } from "../services/update-product.service";

export const updateProductAction = async (
    id: number,
    data: UpdateProductFormData,
): Promise<ActionResponse<UpdateProductResponseDTO>> => {
    const validatedFields = updateProductSchema.safeParse(data);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors as Record<string, string[]>,
        };
    }

    try {
        const result = await updateProductService(id, {
            ...validatedFields.data,
            price: Number(validatedFields.data.price),
        });
        return {
            success: true,
            data: result,
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Erro desconhecido ao atualizar produto",
        };
    }
};
