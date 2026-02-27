export function StatsSection() {
    const stats = [
        {
            value: "500+",
            label: "Produtos Disponíveis",
        },
        {
            value: "10K+",
            label: "Clientes Satisfeitos",
        },
        {
            value: "15K+",
            label: "Entregas Realizadas",
        },
        {
            value: "5+",
            label: "Anos de Experiência",
        },
    ];

    return (
        <div className="w-full py-16 lg:py-24">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center space-y-2 p-6 rounded-lg bg-accent hover:bg-brand-light transition-colors duration-300"
                        >
                            <div className="text-4xl lg:text-5xl xl:text-6xl font-bold text-brand-primary">{stat.value}</div>
                            <div className="text-sm lg:text-base text-muted-foreground font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
