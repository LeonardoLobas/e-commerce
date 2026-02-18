"use server";

import { productsFindAllService } from "../services/get-all-products.service";
import { ProductsListResponseDTO } from "../types/get-all-products.types";

type ActionResult =
    | {
          success: true;
          data: ProductsListResponseDTO;
      }
    | {
          success: false;
          error: string;
      };

export async function getAllProductsAction(): Promise<ActionResult> {
    try {
        const products = await productsFindAllService();

        return {
            success: true,
            data: products,
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                error: error.message,
            };
        }
        return {
            success: false,
            error: "Erro inesperado ao buscar produtos",
        };
    }
}
