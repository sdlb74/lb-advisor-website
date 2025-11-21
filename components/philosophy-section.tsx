'use client';

import { useLanguage } from '@/lib/language-context';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function PhilosophySection() {
    const { t } = useLanguage();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    return (
        <section className="snap-section min-h-screen flex items-center bg-white relative overflow-hidden" ref={ref}>
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-gray-50 to-transparent opacity-50" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <div className="mb-12 flex justify-center">
                        <div className="w-16 h-16 border border-gold-500/30 rounded-full flex items-center justify-center">
                            <span className="font-serif text-4xl text-gold-500 leading-none mt-2">"</span>
                        </div>
                    </div>

                    <blockquote className="font-serif text-4xl lg:text-6xl text-navy-900 leading-tight mb-12">
                        {t('philosophy.quote')}
                    </blockquote>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <div className="h-12 w-[1px] bg-gold-500" />
                        <span className="text-sm uppercase tracking-[0.3em] text-navy-800 font-bold">
                            {t('philosophy.author')}
                        </span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
