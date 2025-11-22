'use client';

import React, { useState, useRef } from 'react';
import { useLanguage } from '@/lib/language-context';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';

interface Wave {
    x: number;
    y: number;
    id: number;
    delay: number;
}

export function HeroSection() {
    const { t, language } = useLanguage();
    const [waves, setWaves] = useState<Wave[]>([]);
    const waveIdRef = useRef(0);
    const lastWaveTime = useRef(0);

    // Parallax effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const backgroundX = useTransform(mouseX, [0, 1000], [-20, 20]);
    const backgroundY = useTransform(mouseY, [0, 1000], [-20, 20]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);

        // Create continuous wave effect while mouse moves
        const now = Date.now();
        if (now - lastWaveTime.current > 50) { // Create wave every 50ms
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Create multiple waves with slight delays for more realistic water effect
            for (let i = 0; i < 2; i++) {
                const newWave = {
                    x,
                    y,
                    id: waveIdRef.current++,
                    delay: i * 0.1
                };

                setWaves(prev => [...prev, newWave]);

                // Remove wave after animation
                setTimeout(() => {
                    setWaves(prev => prev.filter(w => w.id !== newWave.id));
                }, 2000);
            }

            lastWaveTime.current = now;
        }
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-900"
            onMouseMove={handleMouseMove}
        >
            {/* Animated Background with Parallax */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ x: backgroundX, y: backgroundY }}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center scale-110"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop')",
                        filter: 'brightness(0.3) contrast(1.2)'
                    }}
                />
            </motion.div>
            {/* Static Gradient Overlay */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-navy-900/50 via-navy-900/30 to-navy-900 pointer-events-none" />

            {/* Water Wave Effects */}
            {waves.map(wave => (
                <React.Fragment key={wave.id}>
                    {/* Main wave */}
                    <motion.div
                        className="absolute pointer-events-none z-10"
                        style={{
                            left: wave.x,
                            top: wave.y,
                        }}
                        initial={{ scale: 0, opacity: 0.6 }}
                        animate={{
                            scale: 3,
                            opacity: 0
                        }}
                        transition={{
                            duration: 2,
                            ease: "easeOut",
                            delay: wave.delay
                        }}
                    >
                        <svg width="200" height="200" viewBox="0 0 200 200" style={{ transform: 'translate(-50%, -50%)' }}>
                            <ellipse
                                cx="100"
                                cy="100"
                                rx="80"
                                ry="60"
                                fill="none"
                                stroke="rgba(212, 175, 55, 0.3)"
                                strokeWidth="2"
                            />
                        </svg>
                    </motion.div>

                    {/* Secondary wave for depth */}
                    <motion.div
                        className="absolute pointer-events-none z-10"
                        style={{
                            left: wave.x,
                            top: wave.y,
                        }}
                        initial={{ scale: 0, opacity: 0.4 }}
                        animate={{
                            scale: 4,
                            opacity: 0
                        }}
                        transition={{
                            duration: 2.5,
                            ease: "easeOut",
                            delay: wave.delay + 0.2
                        }}
                    >
                        <svg width="200" height="200" viewBox="0 0 200 200" style={{ transform: 'translate(-50%, -50%)' }}>
                            <ellipse
                                cx="100"
                                cy="100"
                                rx="90"
                                ry="70"
                                fill="none"
                                stroke="rgba(212, 175, 55, 0.2)"
                                strokeWidth="1.5"
                            />
                        </svg>
                    </motion.div>
                </React.Fragment>
            ))}

            {/* Floating Elements */}
            <motion.div
                className="absolute top-20 left-10 w-2 h-2 bg-gold-500/20 rounded-full z-5"
                animate={{
                    y: [0, -20, 0],
                    opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-40 right-20 w-3 h-3 bg-gold-500/20 rounded-full z-5"
                animate={{
                    y: [0, -30, 0],
                    opacity: [0.2, 0.6, 0.2]
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            />

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col justify-center max-w-7xl mx-auto px-6 sm:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="max-w-4xl"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-[1px] w-12 bg-gold-500" />
                        <span className="text-gold-500 uppercase tracking-[0.3em] text-xs font-bold">
                            LB Advisor
                        </span>
                    </div>

                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-8">
                        {t('hero.title').split(' ').map((word, i) => {
                            const isHighlight = (language === 'fr' && word === 'possibilités') ||
                                (language === 'en' && word === 'possibilities');
                            return (
                                <React.Fragment key={i}>
                                    {isHighlight ? (
                                        <span className="italic text-gold-400">{word}</span>
                                    ) : (
                                        word
                                    )}{' '}
                                </React.Fragment>
                            );
                        })}
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed mb-12 font-light border-l-2 border-gold-500/30 pl-6">
                        {t('hero.subtitle')}
                    </p>

                    <motion.button
                        whileHover={{ x: 10 }}
                        onClick={() => scrollToSection('about')}
                        className="group flex items-center gap-4 text-white uppercase tracking-[0.2em] text-sm font-medium"
                    >
                        <span className="border-b border-gold-500 pb-1 group-hover:text-gold-500 transition-colors">
                            {t('hero.cta')}
                        </span>
                        <ArrowRight className="text-gold-500 group-hover:translate-x-2 transition-transform" size={20} />
                    </motion.button>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
            >
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Scroll</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <ChevronDown className="text-gold-500" size={24} />
                </motion.div>
            </motion.div>
        </section>
    );
}
