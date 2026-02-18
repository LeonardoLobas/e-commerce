export default function CarrinhoPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-8">
            <div className="max-w-4xl w-full space-y-8">
                <div className="space-y-4 text-center">
                    <h1 className="text-4xl font-bold tracking-tight">Carrinho de Compras 🛒</h1>
                    <p className="text-muted-foreground">Seus itens selecionados aparecerão aqui</p>
                </div>

                <div className="rounded-lg border bg-card p-8 text-center">
                    <p className="text-muted-foreground">Seu carrinho está vazio</p>
                </div>
            </div>
        </div>
    );
}
