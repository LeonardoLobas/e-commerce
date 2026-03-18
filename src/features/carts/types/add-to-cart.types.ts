import { type CartProductDTO } from "./cart-product.types";

export interface AddToCartRequestDTO {
    userId: number;
    date: string;
    products: CartProductDTO[];
}

export interface AddToCartResponseDTO {
    id: number;
    userId: number;
    date: string;
    products: CartProductDTO[];
}
