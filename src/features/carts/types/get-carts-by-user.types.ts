import { CartProductDTO } from "./cart-product.types";

export interface CartResponseDTO {
    id: number;
    userId: number;
    date: string;
    products: CartProductDTO[];
}

export type CartListResponseDTO = CartResponseDTO[];
