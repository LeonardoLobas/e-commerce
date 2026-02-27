import Link from "next/link";
import { ShoppingCart, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t bg-muted/30">
            <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Logo e Descrição */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 group">
                            <ShoppingCart className="text-brand-primary h-6 w-6 group-hover:scale-110 transition-transform" />
                            <span className="text-2xl font-serif font-bold">E-commerce</span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Sua loja online com os melhores produtos e a melhor experiência de compra.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-accent hover:bg-brand-primary hover:text-white transition-all"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-accent hover:bg-brand-primary hover:text-white transition-all"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-accent hover:bg-brand-primary hover:text-white transition-all"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links Rápidos */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Links Rápidos</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/products"
                                    className="text-sm text-muted-foreground hover:text-brand-primary transition-colors inline-flex items-center gap-1"
                                >
                                    <span className="text-brand-primary">›</span> Produtos
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/cart"
                                    className="text-sm text-muted-foreground hover:text-brand-primary transition-colors inline-flex items-center gap-1"
                                >
                                    <span className="text-brand-primary">›</span> Carrinho
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/users"
                                    className="text-sm text-muted-foreground hover:text-brand-primary transition-colors inline-flex items-center gap-1"
                                >
                                    <span className="text-brand-primary">›</span> Usuários
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Atendimento */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Atendimento</h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-brand-primary transition-colors inline-flex items-center gap-1"
                                >
                                    <span className="text-brand-primary">›</span> Central de Ajuda
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-brand-primary transition-colors inline-flex items-center gap-1"
                                >
                                    <span className="text-brand-primary">›</span> Política de Privacidade
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-brand-primary transition-colors inline-flex items-center gap-1"
                                >
                                    <span className="text-brand-primary">›</span> Termos de Uso
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-brand-primary transition-colors inline-flex items-center gap-1"
                                >
                                    <span className="text-brand-primary">›</span> Trocas e Devoluções
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contato */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Contato</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <Mail className="h-5 w-5 text-brand-primary mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-medium">Email</p>
                                    <a
                                        href="mailto:contato@ecommerce.com"
                                        className="text-sm text-muted-foreground hover:text-brand-primary transition-colors"
                                    >
                                        contato@ecommerce.com
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="h-5 w-5 text-brand-primary mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-medium">Telefone</p>
                                    <a
                                        href="tel:+5511999999999"
                                        className="text-sm text-muted-foreground hover:text-brand-primary transition-colors"
                                    >
                                        (11) 99999-9999
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-brand-primary mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-medium">Endereço</p>
                                    <p className="text-sm text-muted-foreground">São Paulo, SP</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-muted-foreground text-center md:text-left">
                            © {currentYear} E-commerce. Todos os direitos reservados.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="text-sm text-muted-foreground hover:text-brand-primary transition-colors">
                                Política de Cookies
                            </a>
                            <a href="#" className="text-sm text-muted-foreground hover:text-brand-primary transition-colors">
                                Sitemap
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
