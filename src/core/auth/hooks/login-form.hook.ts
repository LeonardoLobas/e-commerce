import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { type LoginFormData, loginSchema } from "../schemas/login.schema";

export function useLoginForm() {
    return useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });
}
