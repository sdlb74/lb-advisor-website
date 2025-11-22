'use client';

import { useLanguage } from '@/lib/language-context';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

export function AboutSection() {
    const { t } = useLanguage();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    return (
        <section id="about" className="min-h-screen flex items-center bg-white overflow-hidden" ref={ref}>
            <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full py-20">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <span className="inline-block text-gold-500 tracking-[0.2em] uppercase text-xs font-bold mb-6">
                            {t('about.label')}
                        </span>
                        <h2 className="font-serif text-4xl lg:text-6xl text-navy-900 mb-8 leading-tight">
                            {t('about.title')}
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed font-light">
                            {t('about.intro')}
                        </p>

                        <div className="space-y-8">
                            <div className="bg-navy-50 p-8 border-l-4 border-gold-500">
                                <h3 className="font-serif text-xl text-navy-900 mb-4 italic">
                                    {t('about.story.subtitle')}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {t('about.story.text')}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    t('about.feature1'),
                                    t('about.feature2'),
                                    t('about.feature3'),
                                    t('about.feature4')
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                        className="flex items-center gap-3"
                                    >
                                        <CheckCircle2 className="text-gold-500" size={20} />
                                        <span className="text-navy-800 font-medium text-sm uppercase tracking-wide">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Image Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="relative h-[60vh] lg:h-[70vh] w-full"
                    >
                        <div className="absolute inset-0 bg-navy-900 transform translate-x-4 translate-y-4 z-0" />
                        <div className="relative h-full w-full z-10 overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=85&auto=format&fit=crop"
                                alt="Team Collaboration"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-navy-900/10 mix-blend-multiply" />
                        </div>

                        {/* Floating Stat */}
                        <motion.div
                            className="absolute bottom-12 -left-8 bg-white p-8 shadow-2xl max-w-xs z-20 border-t-4 border-gold-500"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <span className="block text-4xl font-serif text-navy-900 mb-2">100%</span>
                            <span className="text-xs text-gray-500 uppercase tracking-wider">{t('about.commitment')}</span>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
