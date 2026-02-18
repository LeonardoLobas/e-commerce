export default function PerfilPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-8">
            <div className="max-w-2xl w-full space-y-8">
                <div className="space-y-4 text-center">
                    <h1 className="text-4xl font-bold tracking-tight">Perfil 👤</h1>
                    <p className="text-muted-foreground">Gerencie suas informações pessoais</p>
                </div>

                <div className="rounded-lg border bg-card p-8 space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Informações da Conta</h3>
                        <p className="text-sm text-muted-foreground">Suas informações de perfil aparecerão aqui</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
