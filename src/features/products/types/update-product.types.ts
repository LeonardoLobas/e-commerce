export interface UpdateProductResponseDTO {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export interface UpdateProductRequestDTO {
    title: string;
    price: number;
    description: string;
    category: string;
    image?: string;
}
