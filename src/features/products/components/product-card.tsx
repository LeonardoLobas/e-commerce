"use client";

import Image from "next/image";
import { ProductsResponseDTO } from "../types/get-all-products.types";

interface ProductCardProps {
    product: ProductsResponseDTO;
    onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
    return (
        <button
            onClick={onClick}
            className="rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-lg hover:scale-105 cursor-pointer w-full text-left"
        >
            <div className="relative w-full h-48 mb-4">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            <div className="space-y-2">
                <h3 className="font-semibold text-sm line-clamp-2 min-h-10">{product.title}</h3>

                <p className="text-xs text-muted-foreground capitalize">{product.category}</p>

                <div className="flex items-center justify-between pt-2">
                    <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
                </div>
            </div>
        </button>
    );
}
