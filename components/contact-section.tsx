'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language-context';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, CheckCircle, Mail, Building, AlertCircle, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
    phone?: string;
}

export function ContactSection() {
    const { t, language } = useLanguage();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        contactType: '',
        auditType: '',
        formationType: '',
        consultingNeed: '',
        budget: '',
        timeline: '',
        message: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Set<string>>(new Set());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Options dynamiques selon le type de contact
    const contactTypes = {
        fr: [
            { value: '', label: 'Sélectionnez un type de demande' },
            { value: 'audit', label: '🔍 Audit & Évaluation' },
            { value: 'formation', label: '📚 Formation Enterprise' },
            { value: 'consulting', label: '💼 Conseil Stratégique' },
            { value: 'simple', label: '💬 Simple Contact' }
        ],
        en: [
            { value: '', label: 'Select request type' },
            { value: 'audit', label: '🔍 Audit & Assessment' },
            { value: 'formation', label: '📚 Enterprise Training' },
            { value: 'consulting', label: '💼 Strategic Consulting' },
            { value: 'simple', label: '💬 Simple Contact' }
        ]
    };

    const auditTypes = {
        fr: [
            { value: '', label: 'Type d\'audit souhaité' },
            { value: 'cloud', label: 'Infrastructure Cloud' },
            { value: 'security', label: 'Sécurité & Conformité' },
            { value: 'performance', label: 'Performance & Optimisation' },
            { value: 'architecture', label: 'Architecture Système' }
        ],
        en: [
            { value: '', label: 'Desired audit type' },
            { value: 'cloud', label: 'Cloud Infrastructure' },
            { value: 'security', label: 'Security & Compliance' },
            { value: 'performance', label: 'Performance & Optimization' },
            { value: 'architecture', label: 'System Architecture' }
        ]
    };

    const formationTypes = {
        fr: [
            { value: '', label: 'Type de formation' },
            { value: 'cloud-fundamentals', label: 'Cloud Fundamentals' },
            { value: 'devops', label: 'DevOps & CI/CD' },
            { value: 'kubernetes', label: 'Kubernetes & Conteneurs' },
            { value: 'security', label: 'Sécurité Cloud' },
            { value: 'custom', label: 'Formation sur mesure' }
        ],
        en: [
            { value: '', label: 'Training type' },
            { value: 'cloud-fundamentals', label: 'Cloud Fundamentals' },
            { value: 'devops', label: 'DevOps & CI/CD' },
            { value: 'kubernetes', label: 'Kubernetes & Containers' },
            { value: 'security', label: 'Cloud Security' },
            { value: 'custom', label: 'Custom Training' }
        ]
    };

    const consultingNeeds = {
        fr: [
            { value: '', label: 'Besoin principal' },
            { value: 'strategy', label: 'Stratégie Cloud' },
            { value: 'migration', label: 'Migration Cloud' },
            { value: 'optimization', label: 'Optimisation des coûts' },
            { value: 'transformation', label: 'Transformation digitale' }
        ],
        en: [
            { value: '', label: 'Main need' },
            { value: 'strategy', label: 'Cloud Strategy' },
            { value: 'migration', label: 'Cloud Migration' },
            { value: 'optimization', label: 'Cost Optimization' },
            { value: 'transformation', label: 'Digital Transformation' }
        ]
    };

    const budgetRanges = {
        fr: [
            { value: '', label: 'Budget indicatif (optionnel)' },
            { value: '10k', label: '< 10 000 €' },
            { value: '10-25k', label: '10 000 - 25 000 €' },
            { value: '25-50k', label: '25 000 - 50 000 €' },
            { value: '50k+', label: '> 50 000 €' },
            { value: 'discuss', label: 'À discuter' }
        ],
        en: [
            { value: '', label: 'Indicative budget (optional)' },
            { value: '10k', label: '< €10,000' },
            { value: '10-25k', label: '€10,000 - €25,000' },
            { value: '25-50k', label: '€25,000 - €50,000' },
            { value: '50k+', label: '> €50,000' },
            { value: 'discuss', label: 'To discuss' }
        ]
    };

    const timelines = {
        fr: [
            { value: '', label: 'Échéance souhaitée (optionnel)' },
            { value: 'urgent', label: 'Urgent (< 1 mois)' },
            { value: '1-3months', label: '1-3 mois' },
            { value: '3-6months', label: '3-6 mois' },
            { value: '6months+', label: '> 6 mois' },
            { value: 'flexible', label: 'Flexible' }
        ],
        en: [
            { value: '', label: 'Desired timeline (optional)' },
            { value: 'urgent', label: 'Urgent (< 1 month)' },
            { value: '1-3months', label: '1-3 months' },
            { value: '3-6months', label: '3-6 months' },
            { value: '6months+', label: '> 6 months' },
            { value: 'flexible', label: 'Flexible' }
        ]
    };

    const validateField = (name: string, value: string): string | undefined => {
        switch (name) {
            case 'name':
                if (!value.trim()) return language === 'fr' ? 'Le nom est requis' : 'Name is required';
                if (value.trim().length < 2) return language === 'fr' ? 'Nom trop court' : 'Name too short';
                break;
            case 'email':
                if (!value.trim()) return language === 'fr' ? 'L\'email est requis' : 'Email is required';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return language === 'fr' ? 'Email invalide' : 'Invalid email';
                break;
            case 'message':
                if (!value.trim()) return language === 'fr' ? 'Le message est requis' : 'Message is required';
                if (value.trim().length < 10) return language === 'fr' ? 'Message trop court (min 10 caractères)' : 'Message too short (min 10 characters)';
                break;
            case 'phone':
                if (value && !/^[\d\s\-\+\(\)]+$/.test(value)) return language === 'fr' ? 'Téléphone invalide' : 'Invalid phone';
                break;
        }
        return undefined;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (touched.has(name)) {
            const error = validateField(name, value);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTouched(prev => new Set(prev).add(name));

        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: FormErrors = {};
        ['name', 'email', 'message'].forEach(field => {
            const error = validateField(field, formData[field as keyof typeof formData]);
            if (error) newErrors[field as keyof FormErrors] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setTouched(new Set(['name', 'email', 'message']));
            toast.error(language === 'fr' ? 'Veuillez corriger les erreurs' : 'Please fix the errors');
            return;
        }

        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            console.log('Form submission:', formData);

            setIsSubmitted(true);
            toast.success(
                language === 'fr'
                    ? 'Message envoyé ! Nous vous répondrons dans les 24h.'
                    : 'Message sent! We\'ll respond within 24h.'
            );

            setFormData({
                name: '',
                email: '',
                company: '',
                phone: '',
                contactType: '',
                auditType: '',
                formationType: ' ',
                consultingNeed: '',
                budget: '',
                timeline: '',
                message: ''
            });
            setTouched(new Set());
            setErrors({});
        } catch (error) {
            toast.error(language === 'fr' ? 'Une erreur est survenue' : 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    const showAuditOptions = formData.contactType === 'audit';
    const showFormationOptions = formData.contactType === 'formation';
    const showConsultingOptions = formData.contactType === 'consulting';
    const showDetailedOptions = ['audit', 'formation', 'consulting'].includes(formData.contactType);

    return (
        <section
            id="contact"
            ref={ref}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-navy-900 to-navy-950"
        >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80')] bg-cover bg-center opacity-5" />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 py-20 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column - Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-[1px] w-12 bg-gold-500" />
                            <span className="text-gold-500 uppercase tracking-[0.3em] text-xs font-bold">
                                {language === 'fr' ? 'Parlons-en' : 'Let\'s talk'}
                            </span>
                        </div>

                        <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
                            {language === 'fr' ? 'Démarrez votre transformation' : 'Start your transformation'}
                        </h2>

                        <p className="text-gray-400 text-lg mb-12 leading-relaxed">
                            {language === 'fr'
                                ? 'Que ce soit pour un audit, une formation ou un accompagnement stratégique, notre équipe est là pour vous guider.'
                                : 'Whether for an audit, training or strategic support, our team is here to guide you.'}
                        </p>

                        {/* Contact Info Cards */}
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-6 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                                    <Mail className="text-gold-500" size={20} />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium mb-1">{language === 'fr' ? 'Email' : 'Email'}</h4>
                                    <a href="mailto:contact@lb-advisor.com" className="text-gray-400 hover:text-gold-500 transition-colors">
                                        contact@lb-advisor.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-6 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                                    <Building className="text-gold-500" size={20} />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium mb-1">{language === 'fr' ? 'Localisation' : 'Location'}</h4>
                                    <p className="text-gray-400">
                                        {language === 'fr' ? 'France & International' : 'France & International'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-10"
                    >
                        {isSubmitted ? (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="text-green-500" size={40} />
                                </div>
                                <h3 className="text-2xl font-serif text-white mb-4">
                                    {language === 'fr' ? 'Message envoyé !' : 'Message sent!'}
                                </h3>
                                <p className="text-gray-400 mb-8">
                                    {language === 'fr'
                                        ? 'Nous reviendrons vers vous dans les 24 heures.'
                                        : 'We\'ll get back to you within 24 hours.'}
                                </p>
                                <Button
                                    onClick={() => setIsSubmitted(false)}
                                    className="bg-gold-500 hover:bg-gold-600 text-navy-900"
                                >
                                    {language === 'fr' ? 'Envoyer un autre message' : 'Send another message'}
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Type de contact */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        {language === 'fr' ? 'Type de demande' : 'Request type'} *
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="contactType"
                                            value={formData.contactType}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent appearance-none pr-10"
                                        >
                                            {contactTypes[language as 'fr' | 'en'].map(option => (
                                                <option key={option.value} value={option.value} className="bg-navy-900">
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                                    </div>
                                </div>

                                {/* Options dynamiques selon le type */}
                                {showAuditOptions && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="space-y-6"
                                    >
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                {language === 'fr' ? 'Type d\'audit' : 'Audit type'}
                                            </label>
                                            <div className="relative">
                                                <select
                                                    name="auditType"
                                                    value={formData.auditType}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-500 appearance-none pr-10"
                                                >
                                                    {auditTypes[language as 'fr' | 'en'].map(option => (
                                                        <option key={option.value} value={option.value} className="bg-navy-900">
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {showFormationOptions && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="space-y-6"
                                    >
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                {language === 'fr' ? 'Type de formation' : 'Training type'}
                                            </label>
                                            <div className="relative">
                                                <select
                                                    name="formationType"
                                                    value={formData.formationType}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-500 appearance-none pr-10"
                                                >
                                                    {formationTypes[language as 'fr' | 'en'].map(option => (
                                                        <option key={option.value} value={option.value} className="bg-navy-900">
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {showConsultingOptions && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="space-y-6"
                                    >
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                {language === 'fr' ? 'Besoin principal' : 'Main need'}
                                            </label>
                                            <div className="relative">
                                                <select
                                                    name="consultingNeed"
                                                    value={formData.consultingNeed}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-500 appearance-none pr-10"
                                                >
                                                    {consultingNeeds[language as 'fr' | 'en'].map(option => (
                                                        <option key={option.value} value={option.value} className="bg-navy-900">
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Budget et Timeline (si projet) */}
                                {showDetailedOptions && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="grid grid-cols-2 gap-4"
                                    >
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                {language === 'fr' ? 'Budget' : 'Budget'}
                                            </label>
                                            <div className="relative">
                                                <select
                                                    name="budget"
                                                    value={formData.budget}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-500 appearance-none pr-10 text-sm"
                                                >
                                                    {budgetRanges[language as 'fr' | 'en'].map(option => (
                                                        <option key={option.value} value={option.value} className="bg-navy-900">
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                {language === 'fr' ? 'Échéance' : 'Timeline'}
                                            </label>
                                            <div className="relative">
                                                <select
                                                    name="timeline"
                                                    value={formData.timeline}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-500 appearance-none pr-10 text-sm"
                                                >
                                                    {timelines[language as 'fr' | 'en'].map(option => (
                                                        <option key={option.value} value={option.value} className="bg-navy-900">
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Champs de base */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            {language === 'fr' ? 'Nom' : 'Name'} *
                                        </label>
                                        <Input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            placeholder={language === 'fr' ? 'Votre nom' : 'Your name'}
                                            className={`bg-white/10 border ${errors.name && touched.has('name') ? 'border-red-500' : 'border-white/20'} text-white placeholder-gray-500`}
                                        />
                                        {errors.name && touched.has('name') && (
                                            <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                                <AlertCircle size={12} />
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            {language === 'fr' ? 'Email' : 'Email'} *
                                        </label>
                                        <Input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            placeholder="exemple@entreprise.com"
                                            className={`bg-white/10 border ${errors.email && touched.has('email') ? 'border-red-500' : 'border-white/20'} text-white placeholder-gray-500`}
                                        />
                                        {errors.email && touched.has('email') && (
                                            <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                                <AlertCircle size={12} />
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            {language === 'fr' ? 'Entreprise' : 'Company'}
                                        </label>
                                        <Input
                                            name="company"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                            placeholder={language === 'fr' ? 'Nom de l\'entreprise' : 'Company name'}
                                            className="bg-white/10 border border-white/20 text-white placeholder-gray-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            {language === 'fr' ? 'Téléphone' : 'Phone'}
                                        </label>
                                        <Input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            placeholder="+33 6 12 34 56 78"
                                            className={`bg-white/10 border ${errors.phone && touched.has('phone') ? 'border-red-500' : 'border-white/20'} text-white placeholder-gray-500`}
                                        />
                                        {errors.phone && touched.has('phone') && (
                                            <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                                <AlertCircle size={12} />
                                                {errors.phone}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        {language === 'fr' ? 'Message' : 'Message'} *
                                    </label>
                                    <Textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        rows={5}
                                        placeholder={language === 'fr' ? 'Décrivez votre projet ou votre besoin...' : 'Describe your project or need...'}
                                        className={`bg-white/10 border ${errors.message && touched.has('message') ? 'border-red-500' : 'border-white/20'} text-white placeholder-gray-500 resize-none`}
                                    />
                                    {errors.message && touched.has('message') && (
                                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                            <AlertCircle size={12} />
                                            {errors.message}
                                        </p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gold-500 hover:bg-gold-600 text-navy-900 font-semibold py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-navy-900/30 border-t-navy-900 rounded-full animate-spin" />
                                            {language === 'fr' ? 'Envoi en cours...' : 'Sending...'}
                                        </>
                                    ) : (
                                        <>
                                            {language === 'fr' ? 'Envoyer' : 'Send'}
                                            <Send size={18} />
                                        </>
                                    )}
                                </Button>

                                <p className="text-xs text-gray-500 text-center">
                                    {language === 'fr'
                                        ? '* Champs obligatoires. Vos données sont sécurisées et ne seront jamais partagées.'
                                        : '* Required fields. Your data is secure and will never be shared.'}
                                </p>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
