"use client";

import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProductFormData, createProductSchema } from "../schemas/create-product.schema";

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
