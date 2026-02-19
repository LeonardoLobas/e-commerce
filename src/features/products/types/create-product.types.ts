export interface CreateProductResponseDTO {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export interface CreateProductRequestDTO {
    title: string;
    price: number;
    description: string;
    category: string;
    image?: string;
}
