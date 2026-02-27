"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const images = ["/carrosel-1.jpg", "/carrosel-2.jpg", "/carrosel-3.jpg"];

export function HeroCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-play: troca de imagem a cada 3 segundos
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative w-full h-100 md:h-125 lg:h-150 overflow-hidden rounded-2xl bg-muted/20">
            {/* Imagem Principal com Animação */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src={images[currentIndex]}
                        alt={`Produto ${currentIndex + 1}`}
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>
            </AnimatePresence>

            {/* Indicadores (dots) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`h-2 rounded-full transition-all cursor-pointer duration-300 ${
                            index === currentIndex ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/75"
                        }`}
                        aria-label={`Ir para imagem ${index + 1}`}
                    />
                ))}
            </div>

            {/* Gradiente para melhor legibilidade dos dots */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-black/30 to-transparent pointer-events-none" />
        </div>
    );
}
