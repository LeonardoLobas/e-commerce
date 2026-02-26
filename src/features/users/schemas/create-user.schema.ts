import { z } from "zod";

export const createUserSchema = z.object({
    email: z.string().email("Email inválido"),
    username: z.string().min(3, "Username deve ter no mínimo 3 caracteres"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    firstname: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
    lastname: z.string().min(2, "Sobrenome deve ter no mínimo 2 caracteres"),
    city: z.string().min(2, "Cidade deve ter no mínimo 2 caracteres"),
    street: z.string().min(3, "Rua deve ter no mínimo 3 caracteres"),
    number: z.string().min(1, "Número é obrigatório"),
    zipcode: z.string().min(5, "CEP deve ter no mínimo 5 caracteres"),
    lat: z.string().optional(),
    long: z.string().optional(),
    phone: z.string().min(8, "Telefone deve ter no mínimo 8 caracteres"),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;
