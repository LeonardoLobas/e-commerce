"use client";

import { BackToHomeButton } from "@/components/ui/back-to-home-button";
import { Button } from "@/components/ui/button";
import { useCartsByUserQuery } from "@/features/carts/hooks/use-carts-query.hook";
import { useUpdateCartMutation } from "@/features/carts/hooks/use-update-cart-mutation.hook";
import { useDeleteCartMutation } from "@/features/carts/hooks/use-delete-cart-mutation.hook";
import { CartItem } from "@/features/carts/components/cart-item";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/core/auth/hooks/use-auth.hook";

export default function CarrinhoPage() {
    const { userId, isLoading: isLoadingAuth } = useAuth();
    const { data: carts, isLoading, isError } = useCartsByUserQuery(userId as number);
    const updateCartMutation = useUpdateCartMutation();
    const deleteCartMutation = useDeleteCartMutation(userId as number);

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
        <div className="min-h-screen p-8 relative">
            <BackToHomeButton />
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="space-y-4 text-center">
                    <h1 className="text-4xl font-bold tracking-tight">Carrinho de Compras 🛒</h1>
                    <p className="text-muted-foreground">Gerencie seus itens selecionados</p>
                </div>

                {(isLoading || isLoadingAuth) && (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        <p className="mt-4 text-muted-foreground">Carregando carrinho...</p>
                    </div>
                )}

                {isError && (
                    <div className="rounded-lg border border-red-500 bg-red-50 dark:bg-red-950 p-8 text-center">
                        <p className="text-red-600 dark:text-red-400">Erro ao carregar carrinho</p>
                    </div>
                )}

                {!isLoading && !isError && (!userId || !activeCart) && (
                    <div className="rounded-lg border bg-card p-12 text-center space-y-4">
                        <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground" />
                        <p className="text-xl font-semibold">Seu carrinho está vazio</p>
                        <p className="text-muted-foreground">Adicione produtos para começar suas compras</p>
                        <Link href="/produtos">
                            <Button className="mt-4">Ver Produtos</Button>
                        </Link>
                    </div>
                )}

                {activeCart && activeCart.products.length > 0 && (
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold">Itens ({activeCart.products.length})</h2>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleClearCart}
                                    disabled={deleteCartMutation.isPending}
                                >
                                    Limpar Carrinho
                                </Button>
                            </div>

                            {activeCart.products.map((item) => (
                                <CartItem
                                    key={item.productId}
                                    item={item}
                                    onUpdateQuantity={handleUpdateQuantity}
                                    onRemove={handleRemoveItem}
                                />
                            ))}
                        </div>

                        <div className="lg:col-span-1">
                            <div className="sticky top-8 bg-card rounded-lg border p-6 space-y-4">
                                <h2 className="text-xl font-semibold">Resumo</h2>

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>--</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Frete</span>
                                        <span className="text-green-600">Grátis</span>
                                    </div>
                                </div>

                                <div className="border-t pt-4">
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span>--</span>
                                    </div>
                                </div>

                                <Button className="w-full" size="lg">
                                    Finalizar Compra
                                </Button>

                                <p className="text-xs text-muted-foreground text-center">
                                    ⚠️ FakeStoreAPI: Carrinho não persiste ao recarregar
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
