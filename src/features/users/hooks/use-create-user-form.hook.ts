"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUserFormData, createUserSchema } from "../schemas/create-user.schema";

export const useCreateUserForm = () => {
    return useForm<CreateUserFormData>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
            firstname: "",
            lastname: "",
            city: "",
            street: "",
            number: "",
            zipcode: "",
            lat: "",
            long: "",
            phone: "",
        },
    });
};
