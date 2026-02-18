import { LogoutButton } from "@/core/auth/components/logout-button";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-8 relative">
            <LogoutButton />
            <div className="max-w-2xl w-full space-y-8 text-center">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight">Bem-vindo ao E-commerce! 🛒</h1>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 pt-8">
                    <button className="cursor-pointer rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">Produtos</h3>
                        <p className="text-sm text-muted-foreground">Navegue pelo nosso catálogo de produtos</p>
                    </button>

                    <button className="rounded-lg cursor-pointer border bg-card p-6 text-card-foreground shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">Carrinho</h3>
                        <p className="text-sm text-muted-foreground">Veja seus itens selecionados</p>
                    </button>

                    <button className="rounded-lg cursor-pointer border bg-card p-6 text-card-foreground shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">Pedidos</h3>
                        <p className="text-sm text-muted-foreground">Acompanhe seus pedidos</p>
                    </button>

                    <button className="rounded-lg cursor-pointer border bg-card p-6 text-card-foreground shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">Perfil</h3>
                        <p className="text-sm text-muted-foreground">Gerencie suas informações</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
