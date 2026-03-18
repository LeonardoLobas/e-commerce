"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn } from "react-hook-form";

import { type CreateProductFormData, createProductSchema } from "../schemas/create-product.schema";

export const useCreateProductForm = (): UseFormReturn<CreateProductFormData> => {
    return useForm<CreateProductFormData>({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            title: "",
            price: "",
            description: "",
            category: "",
            image: "",
        },
        mode: "onChange",
    });
};
