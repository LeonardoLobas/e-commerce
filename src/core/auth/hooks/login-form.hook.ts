import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function useLoginForm() {
    return useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });
}
