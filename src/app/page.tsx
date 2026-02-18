export default function Home() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-8">
            <div className="max-w-2xl w-full space-y-8 text-center">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight">Bem-vindo ao E-commerce! 🛒</h1>
                    <p className="text-xl text-muted-foreground">Você está logado e autenticado com sucesso.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 pt-8">
                    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">Produtos</h3>
                        <p className="text-sm text-muted-foreground">Navegue pelo nosso catálogo de produtos</p>
                    </div>

                    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">Carrinho</h3>
                        <p className="text-sm text-muted-foreground">Veja seus itens selecionados</p>
                    </div>

                    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">Pedidos</h3>
                        <p className="text-sm text-muted-foreground">Acompanhe seus pedidos</p>
                    </div>

                    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">Perfil</h3>
                        <p className="text-sm text-muted-foreground">Gerencie suas informações</p>
                    </div>
                </div>

                <div className="pt-8">
                    <p className="text-sm text-muted-foreground">✅ Sistema de autenticação funcionando corretamente</p>
                </div>
            </div>
        </div>
    );
}
