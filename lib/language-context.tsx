'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
    fr: {
        // Navigation
        'nav.home': 'Accueil',
        'nav.about': 'À propos',
        'nav.services': 'Services',
        'nav.formation': 'Formation',
        'nav.academy': 'Académie',
        'nav.blog': 'Blog',
        'nav.contact': 'Contact',
        'nav.cta': 'Démarrer',

        // Hero
        'hero.title': 'Transformer les possibilités en progrès mesurables',
        'hero.subtitle': 'Nous accompagnons les organisations dans leur transformation digitale grâce à la formation, la technologie cloud et une approche centrée sur l\'humain.',
        'hero.cta': 'Découvrir notre approche',

        // About
        'about.label': 'Qui sommes-nous',
        'about.title': 'Accompagner vos transformations humaines et technologiques',
        'about.intro': 'LB Advisory accompagne les organisations dans leur transformation digitale et humaine en combinant expertise Cloud, IA, cybersécurité et modernisation des méthodes de travail. Notre ambition : créer des environnements où les équipes gagnent en autonomie et en impact.',
        'about.story': 'Notre approche',
        'about.story.subtitle': 'Lier technologie, méthodes de travail et humain',
        'about.story.text': 'Forts d’expériences acquises au sein de grands programmes de transformation internationaux, nous mettons cette expertise au service de vos équipes. LB Advisory intervient là où la technologie, les méthodes de travail et l’humain se rencontrent, pour rendre vos équipes plus confiantes, plus efficaces et plus autonomes.',

        // Services
        'services.label': 'Nos domaines d\'expertise',
        'services.title': 'Des services de transformation intégrés',
        'service1.title': 'Coaching & Leadership',
        'service1.desc': 'Coaching individuel et d’équipe pour développer la posture, la confiance et la capacité à embarquer les autres dans la transformation, côté IT comme métier.',
        'service2.title': 'Formations & Académies internes',
        'service2.desc': 'Parcours sur mesure en Cloud, IA, cybersécurité, DevOps/DevSecOps, ITIL et SAFe pour construire des communautés d’experts et de référents en interne.',
        'service3.title': 'Cloud, IA & DevSecOps',
        'service3.desc': 'De la stratégie à l’implémentation : architectures Cloud, automatisation, pipelines DevOps sécurisés, Zero Trust et conformité.',
        'service4.title': 'Modern Workplace & Méthodes de travail',
        'service4.desc': 'Moderniser les outils, les processus et les modes de collaboration (Microsoft 365, Teams, Intune, ITIL, SAFe) pour un environnement de travail fluide, sécurisé et efficace.',

        // Formation
        'formation.label': 'Notre pilier fondamental',
        'formation.title': 'La formation au cœur de la transformation',
        'formation.intro': 'Tout commence par un apprentissage qui a du sens. Nous concevons des parcours de formation et de coaching qui partent de votre réalité, de vos contraintes et de vos objectifs, pour créer des changements visibles dans le quotidien de vos équipes.',
        'formation.subtitle': 'Planter des compétences qui continuent de grandir',
        'formation.text': 'Nous construisons des expériences d’apprentissage où chaque personne devient plus autonome, plus confiante et plus capable de faire évoluer les autres : ateliers interactifs, coaching individuel et d’équipe, parcours hybridant Cloud, IA, cybersécurité, DevOps et Modern Workplace.',

        // Stats
        'stats.years': 'Années d\'expertise en transformation cloud',
        'stats.projects': 'Projets réalisés à l\'international',
        'stats.servers': 'Serveurs migrés vers le cloud',
        'stats.possibilities': 'Possibilités d\'évolution',

        // Philosophy
        'philosophy.quote': 'Nous plantons des graines partout où nous allons : des graines de connaissance, de confiance et d’autonomie. Notre mission est de créer des écosystèmes où chacun grandit, puis aide les autres à grandir à son tour.',
        'philosophy.author': 'Vision de LB Advisory',

        // Contact
        'contact.title': 'Prêt à évoluer ?',
        'contact.subtitle': 'Discutons de vos défis et créons ensemble votre feuille de route vers la transformation.',
        'contact.form.name': 'Nom complet',
        'contact.form.email': 'Email',
        'contact.form.company': 'Entreprise',
        'contact.form.phone': 'Téléphone',
        'contact.form.subject': 'Sujet',
        'contact.form.message': 'Message',
        'contact.form.send': 'Envoyer le message',
        'contact.form.success': 'Message envoyé avec succès ! Nous vous recontacterons bientôt.',

        // Footer
        'footer.description': 'Formation, Cloud et Transformation Digitale au service de votre évolution. Basé à Montréal, intervenant à l\'international.',
        'footer.services': 'Services',
        'footer.company': 'Entreprise',
        'footer.contact': 'Contact',
        'footer.expertise': 'Expertise',
        'footer.vision': 'Notre Vision',
        'footer.rights': 'Tous droits réservés.',

        // Services Section Extras
        'services.integrated': 'Des services de transformation intégrés',
        'services.discover': 'Découvrir',
        'services.achievements': 'Réalisations',
        'services.back': 'Retour',

        // About Section Features
        'about.feature1': 'Expertise Cloud & IA',
        'about.feature2': 'Transformation Humaine',
        'about.feature3': 'Approche Sur Mesure',
        'about.feature4': 'Impact Durable',
        'about.commitment': 'Engagement envers votre réussite',

        // Formation Section Features
        'formation.feature1': 'Parcours sur mesure',
        'formation.feature2': 'Coaching d\'équipe',
        'formation.feature3': 'Learning by doing',
        'formation.feature4': 'Mentoring continu',
        'formation.excellence': 'Excellence',

        // Service 1 Projects - Coaching & Leadership
        'service1.project1.title': 'Programme de coaching de leadership - Groupe bancaire international',
        'service1.project1.desc': 'Accompagnement individuel et d\'équipe pour des leaders IT et métiers, clarification de la vision, posture de leadership et capacité à embarquer les équipes dans la transformation.',
        'service1.project2.title': 'Coaching d\'équipes produit - Scale-up technologique',
        'service1.project2.desc': 'Coaching d\'équipes pluridisciplinaires pour améliorer la collaboration, la prise de décision et la responsabilisation autour de la livraison de valeur.',
        'service1.project3.title': 'Parcours de coaching pour experts techniques',
        'service1.project3.desc': 'Accompagnement de référents techniques vers des rôles d\'influence et de transmission, afin de créer des relais internes de transformation.',

        // Service 2 Projects - Training & Academies
        'service2.project1.title': 'Académie Cloud & DevOps - Organisation publique',
        'service2.project1.desc': 'Conception d\'un curriculum Cloud, IA et DevOps pour les équipes IT, incluant ateliers pratiques, laboratoires guidés et accompagnement sur projets réels.',
        'service2.project2.title': 'Programme de formation cybersécurité - Entreprise de services',
        'service2.project2.desc': 'Sensibilisation et montée en compétence des équipes sur les risques cloud, la gestion des identités, la conformité et les bonnes pratiques de sécurité.',
        'service2.project3.title': 'Parcours ITIL & SAFe - Organisation internationale',
        'service2.project3.desc': 'Conception et animation de parcours ITIL et SAFe pour harmoniser les pratiques de gestion des services et de delivery à l\'échelle.',

        // Service 3 Projects - Cloud, AI & DevSecOps
        'service3.project1.title': 'Stratégie Cloud & DevSecOps - Groupe d\'assurance',
        'service3.project1.desc': 'Définition d\'une stratégie cloud sécurisée, mise en place de pipelines CI/CD avec contrôles de sécurité intégrés et gouvernance des environnements.',
        'service3.project2.title': 'Migration vers le cloud - Secteur public',
        'service3.project2.desc': 'Migration de centaines de serveurs vers une plateforme cloud, automatisation de l\'infrastructure et mise en place de mécanismes de supervision et d\'optimisation des coûts.',
        'service3.project3.title': 'Plateforme de données & IA - Acteur du secteur retail',
        'service3.project3.desc': 'Mise en place d\'une plateforme de données et de cas d\'usage IA pour améliorer la prévision de la demande et l\'efficacité opérationnelle.',

        // Service 4 Projects - Modern Workplace
        'service4.project1.title': 'Modern Workplace Microsoft 365 - 5000+ utilisateurs',
        'service4.project1.desc': 'Déploiement et adoption de Microsoft 365 (Teams, SharePoint, OneDrive), accompagnement au changement et formation des utilisateurs.',
        'service4.project2.title': 'Gestion moderne des postes - Intune & Autopilot',
        'service4.project2.desc': 'Modernisation de la gestion des postes avec Intune et Autopilot, zero-touch provisioning et renforcement de la sécurité des endpoints.',
        'service4.project3.title': 'Amélioration des processus collaboratifs',
        'service4.project3.desc': 'Optimisation des processus de collaboration et d\'automatisation avec Power Platform, gouvernance des espaces collaboratifs et alignement avec les pratiques ITIL.',

        // Stats Section
        'stats.label': 'Impact',
        'stats.title': 'Une expertise internationale au service de votre évolution',

        // Contact Section (Additional)
        'contact.label': 'Contact',
        'contact.title.ready': 'Prêt à',
        'contact.title.evolve': 'évoluer',
        'contact.office.label': 'Bureau',
        'contact.office.location': 'Montréal, QC, Canada',
        'contact.form.nameLabel': 'Nom',
        'contact.form.emailLabel': 'Email',
        'contact.form.companyLabel': 'Entreprise',
        'contact.form.phoneLabel': 'Téléphone',
        'contact.form.subjectLabel': 'Sujet',
        'contact.form.messageLabel': 'Message',
        'contact.form.sending': 'Envoi...',
        'contact.form.sendButton': 'Envoyer le message',
        'contact.form.thankYou': 'Message envoyé !',
        'contact.form.thankYouMessage': 'Merci pour votre message. Nous vous recontacterons très bientôt.',
        'contact.form.error': 'Erreur lors de l\'envoi du message. Veuillez réessayer.',
        'contact.form.emailSubject': 'Nouveau contact depuis lb-advisor.com',
        'contact.form.emailBodyPrefix': 'Nom: {name}\nEmail: {email}\nEntreprise: {company}\nTéléphone: {phone}\n\nMessage:\n{message}',

        // Footer (Additional)
        'footer.location': 'Montréal, Québec, Canada',
        'footer.service1': 'Cloud & IA',
        'footer.service2': 'Cybersécurité',
        'footer.service3': 'DevOps',
        'footer.service4': 'Formation',
        'footer.privacy': 'Privacy Policy',
        'footer.terms': 'Terms of Service',

        // Contact Form Validation
        'contact.validation.nameRequired': 'Le nom est requis',
        'contact.validation.nameMin': 'Le nom doit contenir au moins 2 caractères',
        'contact.validation.emailRequired': 'L\'email est requis',
        'contact.validation.emailInvalid': 'Veuillez entrer un email valide',
        'contact.validation.messageRequired': 'Le message est requis',
        'contact.validation.messageMin': 'Le message doit contenir au moins 10 caractères',
        'contact.validation.phoneInvalid': 'Format de téléphone invalide',

        // Contact Form Categories
        'contact.form.requestType': 'Type de demande',
        'contact.form.selectType': 'Sélectionnez un type',
        'contact.form.type.consulting': 'Conseil & Stratégie',
        'contact.form.type.training': 'Formation',
        'contact.form.type.implementation': 'Mise en œuvre',
        'contact.form.type.support': 'Support & Assistance',
        'contact.form.type.partnership': 'Partenariat',
        'contact.form.type.other': 'Autre',

        'contact.form.serviceInterest': 'Service qui vous intéresse',
        'contact.form.selectService': 'Sélectionnez un service',
        'contact.form.service1': 'Coaching & Leadership',
        'contact.form.service2': 'Formation & Académies',
        'contact.form.service3': 'Cloud, IA & DevSecOps',
        'contact.form.service4': 'Modern Workplace',
        'contact.form.service.multi': 'Plusieurs services',
        'contact.form.service.notSure': 'Pas encore sûr',

        // Academy Page
        'academy.title': 'LB Académie',
        'academy.subtitle': 'Maîtrisez le Multi-Cloud et le DevOps avec nos formations expertes.',
        'academy.featured': 'À la une',
        'academy.latest': 'Dernières vidéos',
        'academy.watch': 'Regarder',
        'academy.duration': 'Durée',
        'academy.level': 'Niveau',
        'academy.level.beginner': 'Débutant',
        'academy.level.intermediate': 'Intermédiaire',
        'academy.level.advanced': 'Avancé',

        // Blog Page
        'blog.title': 'Insights & Articles',
        'blog.subtitle': 'Analyses approfondies sur le Cloud, l\'IA et la transformation numérique.',
        'blog.readMore': 'Lire la suite',
        'blog.published': 'Publié le',
        'blog.readTime': 'min de lecture',
        'blog.category': 'Catégorie',
    },
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.services': 'Services',
        'nav.formation': 'Training',
        'nav.academy': 'Academy',
        'nav.blog': 'Blog',
        'nav.contact': 'Contact',
        'nav.cta': 'Contact us',

        // Hero
        'hero.title': 'Transform possibilities into measurable progress',
        'hero.subtitle': 'We help organizations in their digital transformation through training, cloud technology and a human-centered approach.',
        'hero.cta': 'Discover our approach',

        // About
        'about.label': 'Who we are',
        'about.title': 'Supporting your human and technological transformations',
        'about.intro': 'LB Advisory supports organizations in their digital and human transformation by combining expertise in Cloud, AI, cybersecurity and modern ways of working. Our ambition: create environments where teams gain autonomy and impact.',
        'about.story': 'Our approach',
        'about.story.subtitle': 'Connecting technology, ways of working and people',
        'about.story.text': 'With experience gained in large international transformation programs, we put this expertise at the service of your teams. LB Advisory operates where technology, ways of working and people meet, to make your teams more confident, more effective and more autonomous.',

        // Services
        'services.label': 'Our areas of expertise',
        'services.title': 'Integrated transformation services',
        'service1.title': 'Coaching & Leadership',
        'service1.desc': 'Individual and team coaching to develop posture, confidence and the ability to lead others through transformation, across IT and business.',
        'service2.title': 'Training & Internal Academies',
        'service2.desc': 'Tailor-made learning journeys in Cloud, AI, cybersecurity, DevOps/DevSecOps, ITIL and SAFe to build internal experts and champions.',
        'service3.title': 'Cloud, AI & DevSecOps',
        'service3.desc': 'From strategy to implementation: Cloud architectures, automation, secure DevOps pipelines, Zero Trust and compliance.',
        'service4.title': 'Modern Workplace & Ways of working',
        'service4.desc': 'Modernize tools, processes and collaboration models (Microsoft 365, Teams, Intune, ITIL, SAFe) for a secure and efficient work environment.',

        // Formation
        'formation.label': 'Our fundamental pillar',
        'formation.title': 'Learning at the heart of transformation',
        'formation.intro': 'Everything starts with meaningful learning. We design training and coaching journeys grounded in your reality, constraints and objectives, to create visible changes in the day-to-day work of your teams.',
        'formation.subtitle': 'Planting skills that keep growing',
        'formation.text': 'We build learning experiences where each person becomes more autonomous, more confident and more capable of helping others grow: interactive workshops, individual and team coaching, journeys combining Cloud, AI, cybersecurity, DevOps and Modern Workplace.',

        // Stats
        'stats.years': 'Years of expertise in cloud transformation',
        'stats.projects': 'Projects completed internationally',
        'stats.servers': 'Servers migrated to the cloud',
        'stats.possibilities': 'Evolution possibilities',

        // Philosophy
        'philosophy.quote': 'We plant seeds wherever we go: seeds of knowledge, confidence and autonomy. Our mission is to create ecosystems where everyone grows, then helps others grow in turn.',
        'philosophy.author': 'LB Advisory Vision',

        // Contact
        'contact.title': 'Ready to evolve?',
        'contact.subtitle': 'Let\'s discuss your challenges and create together your roadmap to transformation.',
        'contact.form.name': 'Full name',
        'contact.form.email': 'Email',
        'contact.form.company': 'Company',
        'contact.form.phone': 'Phone',
        'contact.form.subject': 'Subject',
        'contact.form.message': 'Message',
        'contact.form.send': 'Send message',
        'contact.form.success': 'Message sent successfully! We will contact you soon.',

        // Footer
        'footer.description': 'Training, Cloud and Digital Transformation at the service of your evolution. Based in Montreal, operating internationally.',
        'footer.services': 'Services',
        'footer.company': 'Company',
        'footer.contact': 'Contact',
        'footer.expertise': 'Expertise',
        'footer.vision': 'Our Vision',
        'footer.rights': 'All rights reserved.',

        // Services Section Extras
        'services.integrated': 'Integrated transformation services',
        'services.discover': 'Discover',
        'services.achievements': 'Achievements',
        'services.back': 'Back',

        // About Section Features
        'about.feature1': 'Cloud & AI Expertise',
        'about.feature2': 'Human Transformation',
        'about.feature3': 'Tailored Approach',
        'about.feature4': 'Lasting Impact',
        'about.commitment': 'Commitment to your success',

        // Formation Section Features
        'formation.feature1': 'Tailor-made journeys',
        'formation.feature2': 'Team coaching',
        'formation.feature3': 'Learning by doing',
        'formation.feature4': 'Continuous mentoring',
        'formation.excellence': 'Excellence',

        // Service 1 Projects - Coaching & Leadership
        'service1.project1.title': 'Leadership Coaching Program - International Banking Group',
        'service1.project1.desc': 'Individual and team coaching for IT and business leaders, clarifying vision, leadership posture and ability to bring teams through transformation.',
        'service1.project2.title': 'Product Team Coaching - Tech Scale-up',
        'service1.project2.desc': 'Coaching multidisciplinary teams to improve collaboration, decision-making and accountability around value delivery.',
        'service1.project3.title': 'Coaching Journey for Technical Experts',
        'service1.project3.desc': 'Supporting technical experts transitioning into influential and mentoring roles, creating internal transformation champions.',

        // Service 2 Projects - Training & Academies
        'service2.project1.title': 'Cloud & DevOps Academy - Public Organization',
        'service2.project1.desc': 'Design of a Cloud, AI and DevOps curriculum for IT teams, including hands-on workshops, guided labs and real-project support.',
        'service2.project2.title': 'Cybersecurity Training Program - Service Company',
        'service2.project2.desc': 'Raising awareness and upskilling teams on cloud risks, identity management, compliance and security best practices.',
        'service2.project3.title': 'ITIL & SAFe Journey - International Organization',
        'service2.project3.desc': 'Design and delivery of ITIL and SAFe learning paths to harmonize service management and delivery practices at scale.',

        // Service 3 Projects - Cloud, AI & DevSecOps
        'service3.project1.title': 'Cloud & DevSecOps Strategy - Insurance Group',
        'service3.project1.desc': 'Defining a secure cloud strategy, implementing CI/CD pipelines with integrated security controls and environment governance.',
        'service3.project2.title': 'Cloud Migration - Public Sector',
        'service3.project2.desc': 'Migration of hundreds of servers to a cloud platform, infrastructure automation and implementation of monitoring and cost optimization mechanisms.',
        'service3.project3.title': 'Data & AI Platform - Retail Sector',
        'service3.project3.desc': 'Implementation of a data platform and AI use cases to improve demand forecasting and operational efficiency.',

        // Service 4 Projects - Modern Workplace
        'service4.project1.title': 'Microsoft 365 Modern Workplace - 5000+ Users',
        'service4.project1.desc': 'Deployment and adoption of Microsoft 365 (Teams, SharePoint, OneDrive), change management and user training.',
        'service4.project2.title': 'Modern Device Management - Intune & Autopilot',
        'service4.project2.desc': 'Modernizing device management with Intune and Autopilot, zero-touch provisioning and endpoint security hardening.',
        'service4.project3.title': 'Collaborative Process Improvement',
        'service4.project3.desc': 'Optimizing collaboration and automation processes with Power Platform, collaborative workspace governance and alignment with ITIL practices.',

        // Stats Section
        'stats.label': 'Impact',
        'stats.title': 'International expertise at the service of your evolution',

        // Contact Section (Additional)
        'contact.label': 'Contact',
        'contact.title.ready': 'Ready to',
        'contact.title.evolve': 'evolve',
        'contact.office.label': 'Office',
        'contact.office.location': 'Montreal, QC, Canada',
        'contact.form.nameLabel': 'Name',
        'contact.form.emailLabel': 'Email',
        'contact.form.companyLabel': 'Company',
        'contact.form.phoneLabel': 'Phone',
        'contact.form.subjectLabel': 'Subject',
        'contact.form.messageLabel': 'Message',
        'contact.form.sending': 'Sending...',
        'contact.form.sendButton': 'Send message',
        'contact.form.thankYou': 'Message sent!',
        'contact.form.thankYouMessage': 'Thank you for your message. We will contact you very soon.',
        'contact.form.error': 'Error sending message. Please try again.',
        'contact.form.emailSubject': 'New contact from lb-advisor.com',
        'contact.form.emailBodyPrefix': 'Name: {name}\nEmail: {email}\nCompany: {company}\nPhone: {phone}\n\nMessage:\n{message}',

        // Footer (Additional)
        'footer.location': 'Montreal, Quebec, Canada',
        'footer.service1': 'Cloud & AI',
        'footer.service2': 'Cybersecurity',
        'footer.service3': 'DevOps',
        'footer.service4': 'Training',
        'footer.privacy': 'Privacy Policy',
        'footer.terms': 'Terms of Service',

        // Contact Form Validation
        'contact.validation.nameRequired': 'Name is required',
        'contact.validation.nameMin': 'Name must be at least 2 characters',
        'contact.validation.emailRequired': 'Email is required',
        'contact.validation.emailInvalid': 'Please enter a valid email',
        'contact.validation.messageRequired': 'Message is required',
        'contact.validation.messageMin': 'Message must be at least 10 characters',
        'contact.validation.phoneInvalid': 'Invalid phone format',

        // Contact Form Categories
        'contact.form.requestType': 'Request Type',
        'contact.form.selectType': 'Select a type',
        'contact.form.type.consulting': 'Consulting & Strategy',
        'contact.form.type.training': 'Training',
        'contact.form.type.implementation': 'Implementation',
        'contact.form.type.support': 'Support & Assistance',
        'contact.form.type.partnership': 'Partnership',
        'contact.form.type.other': 'Other',

        'contact.form.serviceInterest': 'Service of Interest',
        'contact.form.selectService': 'Select a service',
        'contact.form.service1': 'Coaching & Leadership',
        'contact.form.service2': 'Training & Academies',
        'contact.form.service3': 'Cloud, AI & DevSecOps',
        'contact.form.service4': 'Modern Workplace',
        'contact.form.service.multi': 'Multiple services',
        'contact.form.service.notSure': 'Not sure yet',

        // Academy Page
        'academy.title': 'LB Academy',
        'academy.subtitle': 'Master Multi-Cloud and DevOps with our expert training.',
        'academy.featured': 'Featured',
        'academy.latest': 'Latest Videos',
        'academy.watch': 'Watch Now',
        'academy.duration': 'Duration',
        'academy.level': 'Level',
        'academy.level.beginner': 'Beginner',
        'academy.level.intermediate': 'Intermediate',
        'academy.level.advanced': 'Advanced',

        // Blog Page
        'blog.title': 'Insights & Articles',
        'blog.subtitle': 'In-depth analysis on Cloud, AI, and digital transformation.',
        'blog.readMore': 'Read More',
        'blog.published': 'Published on',
        'blog.readTime': 'min read',
        'blog.category': 'Category',
    }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('fr');

    useEffect(() => {
        const savedLang = localStorage.getItem('language') as Language;
        if (savedLang) setLanguage(savedLang);
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    const t = (key: string) => {
        return translations[language][key as keyof typeof translations['fr']] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
