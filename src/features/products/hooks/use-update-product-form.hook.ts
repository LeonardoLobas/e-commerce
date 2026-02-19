"use client";

import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateProductFormData, updateProductSchema } from "../schemas/update-product.schema";

interface UseUpdateProductFormProps {
    defaultValues: UpdateProductFormData;
}

export const useUpdateProductForm = ({ defaultValues }: UseUpdateProductFormProps): UseFormReturn<UpdateProductFormData> => {
    return useForm<UpdateProductFormData>({
        resolver: zodResolver(updateProductSchema),
        defaultValues,
    });
};
