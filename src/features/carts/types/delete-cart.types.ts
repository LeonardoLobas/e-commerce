import { CartProductDTO } from "./cart-product.types";

export interface DeleteCartResponseDTO {
    id: number;
    userId: number;
    date: string;
    products: CartProductDTO[];
}
