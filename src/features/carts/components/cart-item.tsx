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
    onSubtotalChange?: (productId: number, subtotal: number) => void;
}

export const CartItem = ({ item, onUpdateQuantity, onRemove, onSubtotalChange }: CartItemProps) => {
    const { data: product, isLoading } = useSingleProductQuery(item.productId);

    if (isLoading) {
        return (
            <div className="flex gap-3 p-4 bg-card rounded-xl border animate-pulse">
                <div className="w-18 h-18 bg-muted rounded-lg shrink-0" />
                <div className="flex-1 space-y-3">
                    <div className="flex justify-between gap-4">
                        <div className="h-3 bg-muted rounded w-2/3" />
                        <div className="h-6 w-6 bg-muted rounded" />
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="h-3 bg-muted rounded w-16" />
                        <div className="h-8 w-32 bg-muted rounded-lg" />
                    </div>
                </div>
            </div>
        );
    }

    if (!product) return null;

    const subtotal = product.price * item.quantity;

    if (onSubtotalChange) {
        onSubtotalChange(item.productId, subtotal);
    }

    return (
        <div className="flex gap-3 p-4 bg-card rounded-xl border transition-shadow hover:shadow-sm">
            {/* Image */}
            <div className="relative w-18 h-18 sm:w-20 sm:h-20 shrink-0 bg-white rounded-lg border overflow-hidden">
                <Image src={product.image} alt={product.title} fill className="object-contain p-2" sizes="80px" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col gap-2">
                {/* Top row: name + remove */}
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-sm line-clamp-2 leading-snug">{product.title}</h3>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemove(item.productId)}
                        className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                </div>

                {/* Bottom row: price + qty + subtotal */}
                <div className="flex items-center justify-between gap-2">
                    <p className="text-sm text-brand-primary font-semibold">{formatCurrency(product.price)}</p>

                    <div className="flex items-center gap-2">
                        {/* Quantity controls */}
                        <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-0.5">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 rounded-md hover:bg-background"
                                onClick={() => onUpdateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                                disabled={item.quantity <= 1}
                            >
                                <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 rounded-md hover:bg-background"
                                onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                            >
                                <Plus className="h-3 w-3" />
                            </Button>
                        </div>

                        {/* Subtotal */}
                        <div className="text-right min-w-16">
                            <p className="text-xs text-muted-foreground">Subtotal</p>
                            <p className="font-bold text-sm">{formatCurrency(subtotal)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
