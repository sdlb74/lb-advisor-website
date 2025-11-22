'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language-context';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Cloud, Shield, Cog, Users, ArrowRight, X } from 'lucide-react';

const services = [
    {
        number: '01',
        icon: Users,
        titleKey: 'service1.title',
        descKey: 'service1.desc',
        technologies: [
            { name: 'AWS', logo: 'https://cdn.simpleicons.org/amazonaws/FF9900' },
            { name: 'Azure', logo: 'https://cdn.simpleicons.org/microsoftazure/0078D4' },
            { name: 'GCP', logo: 'https://cdn.simpleicons.org/googlecloud/4285F4' }
        ],
        projectKeys: [
            { titleKey: 'service1.project1.title', descKey: 'service1.project1.desc' },
            { titleKey: 'service1.project2.title', descKey: 'service1.project2.desc' },
            { titleKey: 'service1.project3.title', descKey: 'service1.project3.desc' }
        ]
    },
    {
        number: '02',
        icon: Cloud,
        titleKey: 'service2.title',
        descKey: 'service2.desc',
        technologies: [
            { name: 'Terraform', logo: 'https://cdn.simpleicons.org/terraform/7B42BC' },
            { name: 'AWS', logo: 'https://cdn.simpleicons.org/amazonaws/FF9900' },
            { name: 'Azure', logo: 'https://cdn.simpleicons.org/microsoftazure/0078D4' }
        ],
        projectKeys: [
            { titleKey: 'service2.project1.title', descKey: 'service2.project1.desc' },
            { titleKey: 'service2.project2.title', descKey: 'service2.project2.desc' },
            { titleKey: 'service2.project3.title', descKey: 'service2.project3.desc' }
        ]
    },
    {
        number: '03',
        icon: Shield,
        titleKey: 'service3.title',
        descKey: 'service3.desc',
        technologies: [
            { name: 'Docker', logo: 'https://cdn.simpleicons.org/docker/2496ED' },
            { name: 'Kubernetes', logo: 'https://cdn.simpleicons.org/kubernetes/326CE5' },
            { name: 'Helm', logo: 'https://cdn.simpleicons.org/helm/0F1689' }
        ],
        projectKeys: [
            { titleKey: 'service3.project1.title', descKey: 'service3.project1.desc' },
            { titleKey: 'service3.project2.title', descKey: 'service3.project2.desc' },
            { titleKey: 'service3.project3.title', descKey: 'service3.project3.desc' }
        ]
    },
    {
        number: '04',
        icon: Cog,
        titleKey: 'service4.title',
        descKey: 'service4.desc',
        technologies: [
            { name: 'GitLab', logo: 'https://cdn.simpleicons.org/gitlab/FC6D26' },
            { name: 'GitHub', logo: 'https://cdn.simpleicons.org/github/181717' },
            { name: 'Jenkins', logo: 'https://cdn.simpleicons.org/jenkins/D24939' }
        ],
        projectKeys: [
            { titleKey: 'service4.project1.title', descKey: 'service4.project1.desc' },
            { titleKey: 'service4.project2.title', descKey: 'service4.project2.desc' },
            { titleKey: 'service4.project3.title', descKey: 'service4.project3.desc' }
        ]
    }
];


export function ServicesSection() {
    const { t } = useLanguage();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    return (
        <section id="services" className="min-h-screen flex flex-col justify-center bg-navy-900 py-20" ref={ref}>
            <div className="max-w-7xl mx-auto px-8 sm:px-8 w-full h-full flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-gold-500 uppercase tracking-[0.2em] text-xs font-bold mb-4 block">
                        {t('services.label')}
                    </span>
                    <h2 className="font-serif text-4xl lg:text-5xl text-white mb-6">
                        {t('services.integrated')}
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={service.number} service={service} index={index} t={t} inView={inView} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ServiceCard({ service, index, t, inView }: { service: any, index: number, t: any, inView: boolean }) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="h-[450px] group perspective-1000">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                className="w-full h-full relative preserve-3d transition-all duration-300 cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
                onClick={() => !isFlipped && setIsFlipped(true)}
            >
                {/* Front of Card */}
                <div
                    className="absolute inset-0 backface-hidden bg-navy-800/50 border border-white/5 p-8 flex flex-col justify-between hover:border-gold-500/30 transition-colors duration-300"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <div>
                        <div className="flex items-start justify-between mb-6">
                            <span className="text-4xl font-serif text-white/10 group-hover:text-gold-500/20 transition-colors duration-500">
                                {service.number}
                            </span>
                            <service.icon size={24} className="text-gold-500" />
                        </div>

                        <h3 className="text-xl font-serif text-white mb-4 group-hover:text-gold-400 transition-colors duration-300">
                            {t(service.titleKey)}
                        </h3>

                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            {t(service.descKey)}
                        </p>
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsFlipped(true);
                        }}
                        className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-300 w-fit"
                    >
                        <span>{t('services.discover')}</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </button>

                    {/* Hover Overlay Effect (Front only) */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                {/* Back of Card */}
                <div
                    className="absolute inset-0 backface-hidden bg-navy-800 border border-gold-500/30 p-8 flex flex-col rotate-y-180"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-serif text-gold-400">
                            {t('services.achievements')}
                        </h3>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsFlipped(false);
                            }}
                            className="text-white/50 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="space-y-4 overflow-y-auto scrollbar-hide flex-grow">
                        {service.projectKeys.map((project: any, i: number) => (
                            <div key={i} className="border-l-2 border-white/10 pl-4 hover:border-gold-500 transition-colors duration-300">
                                <h4 className="text-white text-sm font-medium mb-1">{t(project.titleKey)}</h4>
                                <p className="text-gray-500 text-xs leading-relaxed">{t(project.descKey)}</p>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsFlipped(false);
                        }}
                        className="mt-6 text-xs uppercase tracking-widest text-gold-500 hover:text-white transition-colors duration-300 text-center w-full"
                    >
                        {t('services.back')}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
