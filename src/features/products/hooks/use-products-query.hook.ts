"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllProductsAction } from "../actions/get-all-products.action";
import { ProductsListResponseDTO } from "../types/get-all-products.types";

export const useProductsQuery = () => {
    return useQuery<ProductsListResponseDTO, Error>({
        queryKey: ["products"],

        queryFn: async () => {
            const result = await getAllProductsAction();

            if (!result.success) {
                throw new Error(result.error);
            }

            return result.data;
        },

        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
};
