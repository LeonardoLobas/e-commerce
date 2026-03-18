"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn } from "react-hook-form";

import { type UpdateProductFormData, updateProductSchema } from "../schemas/update-product.schema";

interface UseUpdateProductFormProps {
    defaultValues?: UpdateProductFormData;
}

export const useUpdateProductForm = ({ defaultValues }: UseUpdateProductFormProps = {}): UseFormReturn<UpdateProductFormData> => {
    return useForm<UpdateProductFormData>({
        resolver: zodResolver(updateProductSchema),
        defaultValues,
        mode: "onChange",
    });
};
