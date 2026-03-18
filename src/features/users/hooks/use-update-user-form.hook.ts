"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { type UpdateUserFormData, updateUserSchema } from "../schemas/update-user.schema";
import { type SingleUserResponseDTO } from "../types/single-user.types";

export const useUpdateUserForm = (user?: SingleUserResponseDTO) => {
    return useForm<UpdateUserFormData>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            email: user?.email || "",
            username: user?.username || "",
            password: "",
            firstname: user?.name.firstname || "",
            lastname: user?.name.lastname || "",
            city: user?.address.city || "",
            street: user?.address.street || "",
            number: user?.address.number.toString() || "",
            zipcode: user?.address.zipcode || "",
            lat: user?.address.geolocation.lat || "",
            long: user?.address.geolocation.long || "",
            phone: user?.phone || "",
        },
    });
};
