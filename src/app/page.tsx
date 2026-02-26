import Link from "next/link";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-8">
            <div className="max-w-2xl w-full space-y-8 text-center">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight">Bem-vindo ao E-commerce! 🛒</h1>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 pt-8">
                    <Link
                        href="/products"
                        className="cursor-pointer rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-all hover:bg-accent hover:scale-105"
                    >
                        <h3 className="text-lg font-semibold mb-2">Produtos</h3>
                        <p className="text-sm text-muted-foreground">Navegue pelo nosso catálogo de produtos</p>
                    </Link>

                    <Link
                        href="/cart"
                        className="rounded-lg cursor-pointer border bg-card p-6 text-card-foreground shadow-sm transition-all hover:bg-accent hover:scale-105"
                    >
                        <h3 className="text-lg font-semibold mb-2">Carrinho</h3>
                        <p className="text-sm text-muted-foreground">Veja seus itens selecionados</p>
                    </Link>

                    <Link
                        href="/users"
                        className="rounded-lg cursor-pointer border bg-card p-6 text-card-foreground shadow-sm transition-all hover:bg-accent hover:scale-105"
                    >
                        <h3 className="text-lg font-semibold mb-2">Usuários</h3>
                        <p className="text-sm text-muted-foreground">Gerencie os usuários do sistema</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
