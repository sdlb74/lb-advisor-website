'use client';

import { useLanguage } from '@/lib/language-context';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
    const { language } = useLanguage();

    const content = {
        fr: {
            title: 'Politique de Confidentialité',
            lastUpdated: 'Dernière mise à jour : 21 Novembre 2025',
            sections: [
                {
                    heading: '1. Collecte des informations',
                    text: 'Nous recueillons des informations lorsque vous utilisez notre formulaire de contact. Les informations recueillies incluent votre nom, votre adresse e-mail, votre numéro de téléphone et votre entreprise.'
                },
                {
                    heading: '2. Utilisation des informations',
                    text: 'Toute les informations que nous recueillons auprès de vous peuvent être utilisées pour : Personnaliser votre expérience et répondre à vos besoins individuels, fournir un contenu publicitaire personnalisé, améliorer notre site Web, améliorer le service client et vos besoins de prise en charge, vous contacter par e-mail.'
                },
                {
                    heading: '3. Confidentialité du commerce en ligne',
                    text: 'Nous sommes les seuls propriétaires des informations recueillies sur ce site. Vos informations personnelles ne seront pas vendues, échangées, transférées, ou données à une autre société pour n\'importe quelle raison, sans votre consentement.'
                },
                {
                    heading: '4. Divulgation à des tiers',
                    text: 'Nous ne vendons, n\'échangeons et ne transférons pas vos informations personnelles identifiables à des tiers. Cela ne comprend pas les tierce parties de confiance qui nous aident à exploiter notre site Web ou à mener nos affaires, tant que ces parties conviennent de garder ces informations confidentielles.'
                },
                {
                    heading: '5. Protection des informations',
                    text: 'Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles.'
                },
                {
                    heading: '6. Consentement',
                    text: 'En utilisant notre site, vous consentez à notre politique de confidentialité.'
                }
            ]
        },
        en: {
            title: 'Privacy Policy',
            lastUpdated: 'Last Updated: November 21, 2025',
            sections: [
                {
                    heading: '1. Information Collection',
                    text: 'We collect information from you when you use our contact form. The collected information includes your name, email address, phone number, and company.'
                },
                {
                    heading: '2. Information Usage',
                    text: 'Any of the information we collect from you may be used to: Personalize your experience and respond to your individual needs, provide personalized advertising content, improve our website, improve customer service and support needs, contact you via email.'
                },
                {
                    heading: '3. E-commerce Privacy',
                    text: 'We are the sole owners of the information collected on this site. Your personally identifiable information will not be sold, exchanged, transferred, or given to any other company for any reason whatsoever, without your consent.'
                },
                {
                    heading: '4. Third Party Disclosure',
                    text: 'We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.'
                },
                {
                    heading: '5. Information Protection',
                    text: 'We implement a variety of security measures to maintain the safety of your personal information.'
                },
                {
                    heading: '6. Consent',
                    text: 'By using our site, you consent to our privacy policy.'
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
