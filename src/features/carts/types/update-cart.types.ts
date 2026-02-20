import { CartProductDTO } from "./cart-product.types";

export interface UpdateCartRequestDTO {
    userId: number;
    date: string;
    products: CartProductDTO[];
}

export interface UpdateCartResponseDTO {
    id: number;
    userId: number;
    date: string;
    products: CartProductDTO[];
}
