'use client';

import { useLanguage } from '@/lib/language-context';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

export function FormationSection() {
    const { t } = useLanguage();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    return (
        <section id="formation" className="snap-section min-h-screen flex items-center bg-white overflow-hidden" ref={ref}>
            <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Image Content (Left) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="relative h-[60vh] lg:h-[70vh] w-full order-2 lg:order-1"
                    >
                        <div className="absolute inset-0 bg-gold-500 transform -translate-x-4 translate-y-4 z-0" />
                        <div className="relative h-full w-full z-10 overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=85&auto=format&fit=crop"
                                alt="Formation Session"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-navy-900/20 mix-blend-multiply" />
                        </div>

                        {/* Floating Label */}
                        <motion.div
                            className="absolute top-8 -right-8 bg-navy-900 text-white px-8 py-4 shadow-2xl z-20"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <span className="text-sm uppercase tracking-[0.2em] font-bold">{t('formation.excellence')}</span>
                        </motion.div>
                    </motion.div>

                    {/* Text Content (Right) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="order-1 lg:order-2"
                    >
                        <span className="inline-block text-gold-500 tracking-[0.2em] uppercase text-xs font-bold mb-6">
                            {t('formation.label')}
                        </span>
                        <h2 className="font-serif text-4xl lg:text-6xl text-navy-900 mb-8 leading-tight">
                            {t('formation.title')}
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed font-light">
                            {t('formation.intro')}
                        </p>

                        <div className="space-y-6">
                            <h3 className="font-serif text-2xl text-navy-800 italic">
                                {t('formation.subtitle')}
                            </h3>
                            <div className="h-[1px] w-24 bg-gold-500 mb-6" />

                            <div className="grid gap-4">
                                {[
                                    t('formation.feature1'),
                                    t('formation.feature2'),
                                    t('formation.feature3'),
                                    t('formation.feature4')
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                        className="flex items-center gap-4 group"
                                    >
                                        <span className="w-1.5 h-1.5 bg-navy-900 rounded-full group-hover:bg-gold-500 transition-colors duration-300" />
                                        <span className="text-navy-800 font-medium tracking-wide group-hover:translate-x-2 transition-transform duration-300">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
