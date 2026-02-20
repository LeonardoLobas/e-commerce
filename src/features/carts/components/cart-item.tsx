"use client";

import { CartProductDTO } from "../types/cart-product.types";
import { useSingleProductQuery } from "@/features/products/hooks/use-single-product-query.hook";
import { formatCurrency } from "@/lib/formatCurrency";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";

interface CartItemProps {
    item: CartProductDTO;
    onUpdateQuantity: (productId: number, quantity: number) => void;
    onRemove: (productId: number) => void;
}

export const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
    const { data: product, isLoading } = useSingleProductQuery(item.productId);

    if (isLoading) {
        return (
            <div className="flex items-center gap-4 p-4 bg-card rounded-lg border animate-pulse">
                <div className="w-20 h-20 bg-gray-200 rounded" />
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
            </div>
        );
    }

    if (!product) return null;

    const subtotal = product.price * item.quantity;

    return (
        <div className="flex items-center gap-4 p-4 bg-card rounded-lg border">
            <div className="relative w-20 h-20 shrink-0">
                <Image src={product.image} alt={product.title} fill className="object-contain" sizes="80px" />
            </div>

            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate">{product.title}</h3>
                <p className="text-sm text-muted-foreground">{formatCurrency(product.price)}</p>
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onUpdateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                    disabled={item.quantity <= 1}
                >
                    <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </div>

            <div className="text-right min-w-20">
                <p className="font-bold">{formatCurrency(subtotal)}</p>
            </div>

            <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(item.productId)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
                <Trash2 className="h-5 w-5" />
            </Button>
        </div>
    );
};
