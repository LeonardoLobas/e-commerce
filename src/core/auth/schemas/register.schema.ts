import { z } from "zod";
export const registerSchema = z.object({
    username: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
