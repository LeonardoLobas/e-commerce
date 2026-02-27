import Link from "next/link";
import { HeroCarousel } from "@/components/ui/hero-carousel";
import { StatsSection } from "@/components/ui/stats-section";

export default function Home() {
    return (
        <div className="p-4 md:p-8 lg:p-16 xl:p-24">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center min-h-[70vh]">
                {/* Conteúdo Hero - Lado Esquerdo */}
                <div className="max-w-2xl space-y-6 md:space-y-8">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-brand-primary"></span>
                        <p className="text-sm font-medium text-brand-primary uppercase tracking-wider">Novo - Coleção 2025</p>
                    </div>

                    {/* Hero Title */}
                    <div className="space-y-2">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-tight wrap-break-word">
                            Sua loja.
                        </h1>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-brand-primary italic leading-tight wrap-break-word">
                            Do seu jeito.
                        </h2>
                    </div>

                    {/* Description */}
                    <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                        Explore nosso catálogo curado, gerencie seu carrinho e descubra produtos incríveis com uma experiência de
                        compra sem igual.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link
                            href="/products"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-foreground rounded-lg hover:bg-foreground/90 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            Explorar Produtos
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </Link>

                        <Link
                            href="/cart"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-foreground bg-background border-2 border-border rounded-lg hover:bg-accent transition-all duration-200"
                        >
                            Ver Carrinho
                        </Link>
                    </div>
                </div>
                <div className="w-full">
                    <HeroCarousel />
                </div>
            </div>
            <StatsSection />
        </div>
    );
}
