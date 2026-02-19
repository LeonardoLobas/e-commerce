"use server";

import { ActionResponse } from "@/shared/types/action-response.types";
import { CreateProductFormData, createProductSchema } from "../schemas/create-product.schema";
import { CreateProductResponseDTO } from "../types/create-product.types";
import { createProductService } from "../services/create-product.service";

export const createProductAction = async (data: CreateProductFormData): Promise<ActionResponse<CreateProductResponseDTO>> => {
    const validatedFields = createProductSchema.safeParse(data);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors as Record<string, string[]>,
        };
    }

    try {
        const result = await createProductService({
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
            error: error instanceof Error ? error.message : "Erro desconhecido ao criar produto",
        };
    }
};
