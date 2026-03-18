"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { formatCurrency } from "@/lib/formatCurrency";

import { type ProductsResponseDTO } from "../types/get-all-products.types";

interface ProductCardProps {
    product: ProductsResponseDTO;
    onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
    return (
        <button
            onClick={onClick}
            className="group rounded-xl border bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer w-full text-left overflow-hidden"
        >
            {/* Image area */}
            <div className="relative w-full h-52 bg-white">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Category badge */}
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-background/90 backdrop-blur-sm border rounded-full px-2.5 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-primary"></span>
                    <span className="text-xs font-medium text-brand-primary capitalize">{product.category}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                <h3 className="font-semibold text-sm line-clamp-2 leading-snug min-h-10 text-card-foreground">{product.title}</h3>

                <div className="flex items-center justify-between pt-1">
                    <span className="text-xl font-bold text-brand-primary">{formatCurrency(product.price)}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-brand-primary transition-colors duration-200">
                        Ver detalhes
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                </div>
            </div>
        </button>
    );
}
