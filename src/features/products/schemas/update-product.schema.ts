import { z } from "zod";

export const updateProductSchema = z.object({
    title: z.string().min(3, "Título deve ter no mínimo 3 caracteres"),
    price: z.coerce.number().positive("Preço deve ser maior que zero"),
    description: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
    category: z.string().min(3, "Categoria deve ter no mínimo 3 caracteres"),
    image: z.string().url("URL da imagem inválida").optional(),
});

export type UpdateProductFormData = z.infer<typeof updateProductSchema>;
