import { useForm } from "react-hook-form";
import { RegisterFormData, registerSchema } from "../schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";

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
