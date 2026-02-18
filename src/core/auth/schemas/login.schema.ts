import { z } from "zod";
export const loginSchema = z.object({
    username: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    password: z.string().min(3, "Senha deve ter no mínimo 8 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
