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
            <div className="flex items-center gap-4 p-4 bg-card rounded-xl border animate-pulse">
                <div className="w-20 h-20 bg-muted rounded-lg shrink-0" />
                <div className="flex-1 space-y-2">
                    <div className="h-3 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/4" />
                </div>
                <div className="h-8 w-28 bg-muted rounded-lg" />
                <div className="h-5 w-16 bg-muted rounded" />
            </div>
        );
    }

    if (!product) return null;

    const subtotal = product.price * item.quantity;

    return (
        <div className="flex items-center gap-4 p-4 bg-card rounded-xl border transition-shadow hover:shadow-sm">
            {/* Image */}
            <div className="relative w-20 h-20 shrink-0 bg-white rounded-lg border overflow-hidden">
                <Image src={product.image} alt={product.title} fill className="object-contain p-2" sizes="80px" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm line-clamp-2 leading-snug">{product.title}</h3>
                <p className="text-sm text-brand-primary font-medium mt-1">{formatCurrency(product.price)}</p>
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-1.5 bg-muted/50 rounded-lg p-1">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-md hover:bg-background"
                    onClick={() => onUpdateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                    disabled={item.quantity <= 1}
                >
                    <Minus className="h-3.5 w-3.5" />
                </Button>
                <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-md hover:bg-background"
                    onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                >
                    <Plus className="h-3.5 w-3.5" />
                </Button>
            </div>

            {/* Subtotal */}
            <div className="text-right min-w-20 hidden sm:block">
                <p className="text-xs text-muted-foreground">Subtotal</p>
                <p className="font-bold text-sm">{formatCurrency(subtotal)}</p>
            </div>

            {/* Remove */}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(item.productId)}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
};
