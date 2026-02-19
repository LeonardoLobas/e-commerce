import { z } from "zod";

export const createProductSchema = z.object({
    title: z.string().min(3, "Título deve ter no mínimo 3 caracteres"),
    price: z.string().min(3, "Preço deve ser maior que zero"),
    description: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
    category: z.string().min(3, "Categoria deve ter no mínimo 3 caracteres"),
    image: z.string().url("URL da imagem inválida").optional(),
});

export type CreateProductFormData = z.infer<typeof createProductSchema>;
