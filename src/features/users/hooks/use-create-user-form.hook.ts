"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { type CreateUserFormData, createUserSchema } from "../schemas/create-user.schema";

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
