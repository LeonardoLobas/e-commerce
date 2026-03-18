"use server";

import { type ActionResponse } from "@/shared/types/action-response.types";

import { type CreateProductFormData, createProductSchema } from "../schemas/create-product.schema";
import { createProductService } from "../services/create-product.service";
import { type CreateProductResponseDTO } from "../types/create-product.types";

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
