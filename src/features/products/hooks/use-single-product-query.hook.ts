"use client";

import { useQuery } from "@tanstack/react-query";
import { getSingleProductAction } from "../actions/single-product.action";
import { SingleProductResponseDTO } from "../types/single-product.types";

export function useSingleProductQuery(id: number) {
    return useQuery<SingleProductResponseDTO, Error>({
        queryKey: ["product", id],

        queryFn: async () => {
            const result = await getSingleProductAction(id);

            if (!result.success) {
                throw new Error(result.error);
            }

            return result.data!;
        },

        enabled: !!id && id > 0, // Só executa se tiver ID válido
        staleTime: 1000 * 60 * 5, // 5 minutos
        refetchOnWindowFocus: false,
    });
}
