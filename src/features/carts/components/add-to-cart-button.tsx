"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { useAddToCartMutation } from "../hooks/use-add-to-cart-mutation.hook";

interface AddToCartButtonProps {
    productId: number;
    userId?: number;
}

export const AddToCartButton = ({ productId, userId = 1 }: AddToCartButtonProps) => {
    const addToCartMutation = useAddToCartMutation();
    const [quantity] = useState(1);

    const handleAddToCart = () => {
        addToCartMutation.mutate({
            userId,
            date: new Date().toISOString(),
            products: [
                {
                    productId,
                    quantity,
                },
            ],
        });
    };

    return (
        <Button onClick={handleAddToCart} disabled={addToCartMutation.isPending} className="w-full" size="lg">
            <ShoppingCart className="w-5 h-5 mr-2" />
            {addToCartMutation.isPending ? "Adicionando..." : "Adicionar ao Carrinho"}
        </Button>
    );
};
