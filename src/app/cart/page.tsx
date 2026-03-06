"use client";

import { Button } from "@/components/ui/button";
import { useCartsByUserQuery } from "@/features/carts/hooks/use-carts-query.hook";
import { useUpdateCartMutation } from "@/features/carts/hooks/use-update-cart-mutation.hook";
import { useDeleteCartMutation } from "@/features/carts/hooks/use-delete-cart-mutation.hook";
import { CartItem } from "@/features/carts/components/cart-item";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/core/auth/hooks/use-auth.hook";
import { useState, useCallback } from "react";
import { formatCurrency } from "@/lib/formatCurrency";

export default function CarrinhoPage() {
    const { userId, isLoading: isLoadingAuth } = useAuth();
    const { data: carts, isLoading, isError } = useCartsByUserQuery(userId as number);
    const updateCartMutation = useUpdateCartMutation();
    const deleteCartMutation = useDeleteCartMutation(userId as number);
    const [subtotals, setSubtotals] = useState<Record<number, number>>({});

    const handleSubtotalChange = useCallback((productId: number, subtotal: number) => {
        setSubtotals((prev) => {
            if (prev[productId] === subtotal) return prev;
            return { ...prev, [productId]: subtotal };
        });
    }, []);

    const cartTotal = Object.values(subtotals).reduce((sum, v) => sum + v, 0);

    const activeCart = carts?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

    const handleUpdateQuantity = (productId: number, quantity: number) => {
        if (!activeCart) return;

        const updatedProducts = activeCart.products.map((p) => (p.productId === productId ? { ...p, quantity } : p));

        updateCartMutation.mutate({
            id: activeCart.id,
            data: {
                userId: activeCart.userId,
                date: new Date().toISOString(),
                products: updatedProducts,
            },
        });
    };

    const handleRemoveItem = (productId: number) => {
        if (!activeCart) return;

        const updatedProducts = activeCart.products.filter((p) => p.productId !== productId);

        if (updatedProducts.length === 0) {
            deleteCartMutation.mutate(activeCart.id);
        } else {
            updateCartMutation.mutate({
                id: activeCart.id,
                data: {
                    userId: activeCart.userId,
                    date: new Date().toISOString(),
                    products: updatedProducts,
                },
            });
        }
    };

    const handleClearCart = () => {
        if (activeCart) {
            deleteCartMutation.mutate(activeCart.id);
        }
    };

    return (
        <div className="min-h-screen px-4 py-8 sm:px-8">
            <div className="max-w-6xl mx-auto space-y-10">
                {/* Page header */}
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-brand-primary"></span>
                        <p className="text-xs font-medium text-brand-primary uppercase tracking-wider">Minha Conta</p>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Carrinho de Compras</h1>
                    <p className="text-muted-foreground text-sm">Gerencie os itens selecionados antes de finalizar</p>
                </div>

                {/* Skeleton loading */}
                {(isLoading || isLoadingAuth) && (
                    <div className="grid lg:grid-cols-3 gap-8 animate-pulse">
                        <div className="lg:col-span-2 space-y-4">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 bg-card rounded-xl border">
                                    <div className="w-20 h-20 bg-muted rounded-lg shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-3 bg-muted rounded w-3/4" />
                                        <div className="h-3 bg-muted rounded w-1/3" />
                                    </div>
                                    <div className="h-8 w-28 bg-muted rounded-lg" />
                                    <div className="h-6 w-16 bg-muted rounded" />
                                </div>
                            ))}
                        </div>
                        <div className="h-64 bg-card rounded-2xl border" />
                    </div>
                )}

                {/* Error */}
                {isError && (
                    <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-10 text-center space-y-2">
                        <p className="font-semibold text-destructive">Erro ao carregar carrinho</p>
                        <p className="text-sm text-muted-foreground">Tente recarregar a página.</p>
                    </div>
                )}

                {/* Empty state */}
                {!isLoading && !isError && (!userId || !activeCart) && (
                    <div className="rounded-2xl border bg-card p-16 text-center space-y-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-light mx-auto">
                            <ShoppingBag className="w-7 h-7 text-brand-primary" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-xl font-semibold">Seu carrinho está vazio</p>
                            <p className="text-sm text-muted-foreground">Adicione produtos para começar suas compras</p>
                        </div>
                        <Link href="/products">
                            <Button className="mt-2 gap-2">
                                <ShoppingBag className="w-4 h-4" />
                                Ver Produtos
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Cart content */}
                {activeCart && activeCart.products.length > 0 && (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Items list */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-lg font-semibold">Itens</h2>
                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-light text-xs font-bold text-brand-primary">
                                        {activeCart.products.length}
                                    </span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleClearCart}
                                    disabled={deleteCartMutation.isPending}
                                    className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-1.5 text-xs"
                                >
                                    Limpar carrinho
                                </Button>
                            </div>

                            {activeCart.products.map((item) => (
                                <CartItem
                                    key={item.productId}
                                    item={item}
                                    onUpdateQuantity={handleUpdateQuantity}
                                    onRemove={handleRemoveItem}
                                    onSubtotalChange={handleSubtotalChange}
                                />
                            ))}
                        </div>

                        {/* Summary */}
                        <div>
                            <div className="sticky top-24 bg-card h-full rounded-2xl content-center  border p-6 space-y-5">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-brand-primary"></span>
                                    <h2 className="text-sm font-medium text-brand-primary uppercase tracking-wider">
                                        Resumo do pedido
                                    </h2>
                                </div>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="font-medium">{cartTotal > 0 ? formatCurrency(cartTotal) : "--"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Frete</span>
                                        <span className="text-green-600 font-medium">Grátis</span>
                                    </div>
                                </div>

                                <div className="border-t pt-4">
                                    <div className="flex justify-between items-baseline">
                                        <span className="font-semibold">Total</span>
                                        <span className="text-2xl font-bold text-brand-primary">
                                            {cartTotal > 0 ? formatCurrency(cartTotal) : "--"}
                                        </span>
                                    </div>
                                </div>

                                <Button className="w-full gap-2" size="lg">
                                    <ShoppingBag className="w-4 h-4" />
                                    Finalizar Compra
                                </Button>

                                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                                    FakeStoreAPI — carrinho não persiste ao recarregar
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
