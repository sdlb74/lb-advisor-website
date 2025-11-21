'use client';

import { useLanguage } from '@/lib/language-context';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
    const { language } = useLanguage();

    const content = {
        fr: {
            title: 'Conditions d\'Utilisation',
            lastUpdated: 'Dernière mise à jour : 21 Novembre 2025',
            sections: [
                {
                    heading: '1. Acceptation des conditions',
                    text: 'En accédant à ce site web, vous acceptez d\'être lié par ces conditions d\'utilisation, toutes les lois et réglementations applicables, et acceptez que vous êtes responsable du respect des lois locales applicables.'
                },
                {
                    heading: '2. Licence d\'utilisation',
                    text: 'La permission est accordée de télécharger temporairement une copie des documents (information ou logiciel) sur le site web de LB Advisor pour une visualisation transitoire personnelle et non commerciale uniquement.'
                },
                {
                    heading: '3. Avis de non-responsabilité',
                    text: 'Les documents sur le site web de LB Advisor sont fournis "tels quels". LB Advisor ne donne aucune garantie, expresse ou implicite, et décline et nie par la présente toutes les autres garanties.'
                },
                {
                    heading: '4. Limitations',
                    text: 'En aucun cas LB Advisor ou ses fournisseurs ne seront responsables de tout dommage (y compris, sans limitation, les dommages pour perte de données ou de profit, ou en raison d\'une interruption d\'activité) découlant de l\'utilisation ou de l\'incapacité d\'utiliser les documents sur le site Internet de LB Advisor.'
                },
                {
                    heading: '5. Exactitude des documents',
                    text: 'Les documents apparaissant sur le site web de LB Advisor pourraient inclure des erreurs techniques, typographiques ou photographiques. LB Advisor ne garantit pas que l\'un des documents sur son site web est exact, complet ou à jour.'
                },
                {
                    heading: '6. Liens',
                    text: 'LB Advisor n\'a pas examiné tous les sites liés à son site web et n\'est pas responsable du contenu de ces sites liés. L\'inclusion de tout lien n\'implique pas l\'approbation par LB Advisor du site.'
                }
            ]
        },
        en: {
            title: 'Terms of Service',
            lastUpdated: 'Last Updated: November 21, 2025',
            sections: [
                {
                    heading: '1. Acceptance of Terms',
                    text: 'By accessing this website, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.'
                },
                {
                    heading: '2. Use License',
                    text: 'Permission is granted to temporarily download one copy of the materials (information or software) on LB Advisor\'s website for personal, non-commercial transitory viewing only.'
                },
                {
                    heading: '3. Disclaimer',
                    text: 'The materials on LB Advisor\'s website are provided on an "as is" basis. LB Advisor makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.'
                },
                {
                    heading: '4. Limitations',
                    text: 'In no event shall LB Advisor or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on LB Advisor\'s website.'
                },
                {
                    heading: '5. Accuracy of Materials',
                    text: 'The materials appearing on LB Advisor\'s website could include technical, typographical, or photographic errors. LB Advisor does not warrant that any of the materials on its website are accurate, complete or current.'
                },
                {
                    heading: '6. Links',
                    text: 'LB Advisor has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by LB Advisor of the site.'
                }
            ]
        }
    };

    const t = content[language as keyof typeof content];

    return (
        <div className="min-h-screen bg-navy-900 text-white p-8 md:p-16">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-gold-500 hover:text-white transition-colors mb-12 group">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="uppercase tracking-widest text-sm font-medium">
                        {language === 'fr' ? 'Retour à l\'accueil' : 'Back to Home'}
                    </span>
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="font-serif text-4xl md:text-5xl mb-4">{t.title}</h1>
                    <p className="text-gray-400 mb-12">{t.lastUpdated}</p>

                    <div className="space-y-12">
                        {t.sections.map((section, index) => (
                            <div key={index}>
                                <h2 className="text-xl font-serif text-gold-400 mb-4">{section.heading}</h2>
                                <p className="text-gray-300 leading-relaxed">{section.text}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
