'use client';

import { useLanguage } from '@/lib/language-context';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const stats = [
    { number: 10, suffix: '+', labelKey: 'stats.years' },
    { number: 100, suffix: '+', labelKey: 'stats.projects' },
    { number: 1100, suffix: '+', labelKey: 'stats.servers' },
    { number: '∞', suffix: '', labelKey: 'stats.possibilities' }
];

function AnimatedNumber({ number, suffix, inView }: { number: number | string, suffix: string, inView: boolean }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        if (inView && typeof number === 'number') {
            const controls = animate(count, number, {
                duration: 2,
                ease: 'easeOut'
            });
            return controls.stop;
        }
    }, [count, number, inView]);

    if (typeof number === 'string') {
        return <span>{number}</span>;
    }

    return (
        <motion.div>
            <motion.span>{rounded}</motion.span>
            <span>{suffix}</span>
        </motion.div>
    );
}

export function StatsSection() {
    const { t } = useLanguage();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.5
    });

    return (
        <section id="stats" className="min-h-screen flex items-center bg-navy-900 relative overflow-hidden" ref={ref}>
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=85&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-900/90 to-navy-900" />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full relative z-10">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-gold-500 uppercase tracking-[0.2em] text-xs font-bold mb-6 block">
                        {t('stats.label')}
                    </span>
                    <h2 className="font-serif text-4xl lg:text-6xl text-white max-w-4xl mx-auto leading-tight">
                        {t('stats.title')}
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="text-center group"
                        >
                            <div className="text-6xl lg:text-7xl font-serif text-white mb-4 group-hover:text-gold-500 transition-colors duration-500">
                                <AnimatedNumber number={stat.number} suffix={stat.suffix} inView={inView} />
                            </div>
                            <div className="h-[1px] w-12 bg-white/20 mx-auto mb-6 group-hover:bg-gold-500 transition-colors duration-500" />
                            <div className="text-gray-400 uppercase tracking-widest text-sm font-light group-hover:text-white transition-colors duration-300">
                                {t(stat.labelKey)}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
