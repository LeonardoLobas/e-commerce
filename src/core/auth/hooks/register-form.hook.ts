import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { type RegisterFormData, registerSchema } from "../schemas/register.schema";

export function useRegisterForm() {
    return useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });
}
