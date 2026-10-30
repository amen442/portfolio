/**
 * Toutes les données du portfolio vivent ici.
 * Modifie ce fichier pour mettre à jour le contenu du site sans toucher aux composants.
 */

export type IconName =
  | 'code'
  | 'globe'
  | 'database'
  | 'wrench'
  | 'palette'
  | 'sparkles'
  | 'crown'
  | 'rocket'
  | 'blocks'
  | 'brain'

export interface CertificationGroup {
  organization: string
  category?: string
  icon: IconName
  featured?: boolean
  certs: { name: string; href: string }[]
}

export interface Profile {
  name: string
  initials: string
  roles: string[]
  tagline: string
  location: string
  email: string
  phone: string
  cvUrl: string
  /** Nom du fichier proposé au téléchargement (attribut `download`). */
  cvFileName: string
  socials: { label: string; href: string; icon: 'github' | 'linkedin' }[]
  about: string
  stats: { label: string; value: number; suffix?: string }[]
}

export interface Experience {
  company: string
  role: string
  period: string
  highlights: string[]
}

export interface Project {
  title: string
  category: string
  badge?: string
  description: string
  details: string[]
  tech: string[]
  link?: { label: string; href: string }
  team?: string[]
  featured?: boolean
}

export interface SkillCategory {
  name: string
  icon: IconName
  items: string[]
}

export interface Leadership {
  title: string
  organization: string
  period: string
  icon: IconName
  description?: string
  progression?: string[]
  points: string[]
  /** `featured` : carte pleine largeur ; `chips` : points affichés en pastilles animées. */
  layout?: 'featured' | 'chips'
}

export interface Language {
  name: string
  level: string
  /** Niveau de 1 (A1) à 6 (C2 / langue maternelle). */
  score: 1 | 2 | 3 | 4 | 5 | 6
}

export const profile: Profile = {
  name: 'Amen Allah Ibrahmi',
  initials: 'AAI',
  roles: ['Full-Stack Developer', 'AI Enthusiast', 'Aspiring Entrepreneur', 'Digital Innovator'],
  tagline:
    'Business Computing Student @ ESEN | Full-Stack Developer | Aspiring Entrepreneur | AI & Digital Innovation',
  location: 'Ariana, Tunisie',
  email: 'amenallah.ibrahmi@esen.tn',
  phone: '+216 23 022 403',
  cvUrl: '/CV_Amen_Allah_Ibrahmi.pdf',
  cvFileName: 'CV_Amen_Allah_Ibrahmi.pdf',
  socials: [
    { label: 'GitHub', href: '', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ibrahmi-amen-allah-0125a32a6/', icon: 'linkedin' },
  ],
  about:
    "Étudiant en 3e année Business Computing à ESEN (Université de la Manouba), avec une expérience concrète en développement web full-stack, conception de bases de données, et création d'applications assistées par IA — acquise à travers deux stages et plusieurs projets académiques et communautaires. Allie exécution technique et leadership en tant que Président des ESEN Ambassadors. À la recherche d'un stage en développement web, logiciel, ou applications liées à l'IA.",
  stats: [
    { label: 'Projets', value: 6, suffix: '+' },
    { label: 'Stages', value: 2 },
    { label: 'Certifications', value: 11 },
  ],
}

export const experiences: Experience[] = [
  {
    company: 'Treetronix',
    role: 'Full-Stack Developer Intern',
    period: '16 juin – 16 juillet 2025',
    highlights: [
      "Développement d'un dashboard avec authentification (HTML, React, Node.js, MongoDB)",
      "Module de gestion d'inventaire (produits, mouvements de stock)",
      'Contribution front-end et back-end',
    ],
  },
  {
    company: 'ENDA Inter-Arabe',
    role: 'Full-Stack Developer Intern',
    period: '17 juillet – 17 sept 2025',
    highlights: [
      "Développement de la plateforme J'Active (inclusion sociale, entrepreneuriat)",
      'Site intégré avec HTML, CSS, JavaScript, PHP, SQL',
      'Conception et gestion de la base de données',
    ],
  },
]

export const projects: Project[] = [
  {
    title: 'ESENet',
    category: 'Projet académique',
    badge: 'Note : 20/20',
    description:
      'Plateforme connectant étudiants, entreprises, enseignants et administrateurs ESEN.',
    details: [
      'Fil social et offres de stage/emploi',
      'Participation aux événements',
      'Dashboard admin',
    ],
    tech: ['PHP', 'MySQL', 'CSS', 'JavaScript'],
    featured: true,
  },
  {
    title: 'Company AI Analyzer',
    category: 'Projet personnel',
    description:
      'Application web « local-first » qui lit les pages publiques d’un site d’entreprise et génère un rapport structuré (veille entreprise, prospection commerciale, stages & emplois) grâce à un modèle Ollama hébergé en local.',
    details: [
      'API Express avec validation Zod',
      'Crawler respectant robots.txt, avec protections SSRF',
      'Historique des rapports dans SQLite',
      'Conteneurisation Docker et tests automatisés',
    ],
    tech: ['Node.js', 'Express', 'SQLite', 'Ollama', 'Zod', 'HTML', 'CSS', 'JavaScript', 'Docker'],
    // TODO : renseigner l'URL du repo GitHub dans `href` pour activer le bouton.
    link: { label: 'Voir le repo GitHub', href: '' },
  },
  {
    title: 'TalentMatch TN',
    category: 'Projet personnel',
    description:
      'Plateforme web de gestion des profils étudiants et des entreprises, avec recherche d’entreprises tunisiennes réelles par domaine et score de compatibilité étudiant–entreprise.',
    details: [
      'Score basé sur le domaine, les compétences et les mots-clés du profil, avec raisons et compétences manquantes',
      'Recherche d’entreprises et association des pages LinkedIn automatisées via workflows n8n et API Tavily',
      'Filtrage des annuaires, sites d’emploi et résultats qui ne sont pas des entreprises',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'n8n', 'Tavily API'],
    // TODO : renseigner l'URL du repo GitHub dans `href` pour activer le bouton.
    link: { label: 'Voir le repo GitHub', href: '' },
  },
  {
    title: 'Custom Sticker E-commerce Marketplace',
    category: 'Projet personnel',
    description: 'Marketplace complet de vente de stickers personnalisés, développé from scratch.',
    details: ['Gestion des produits', 'Panier et checkout', 'Suivi des commandes'],
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    link: { label: 'Voir le projet', href: 'https://lnkd.in/d8yPRkFa' },
  },
  {
    title: 'Bowstring Agency Website & KPI BOW',
    category: "Projet d'équipe universitaire",
    description:
      'Site web pour une agence événementielle fictive (cours Social Media & Community Management).',
    details: ['Service KPI BOW : calcul de KPIs Instagram/Facebook', 'Suivi de trafic'],
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'SQL'],
    team: ['Mohamed Adel Amdouni', 'Kmar Mejri'],
  },
  {
    title: 'E-Commerce: The Comeback',
    category: 'Événement ESEN',
    description: "Site officiel de l'événement du 22e anniversaire de l'ESEN.",
    details: ['Intégration Google Sheets', 'Workflow QR code'],
    tech: ['React', 'Node.js'],
    link: { label: 'Voir le projet', href: 'https://esenthecomeback.tn' },
  },
]

export const skillCategories: SkillCategory[] = [
  { name: 'Langages', icon: 'code', items: ['Python', 'C', 'Java', 'JavaScript', 'C#'] },
  { name: 'Web', icon: 'globe', items: ['HTML', 'CSS', 'JavaScript', 'PHP', 'React', 'Node.js'] },
  {
    name: 'Bases de données',
    icon: 'database',
    items: ['SQL', 'PL/SQL', 'Oracle', 'MongoDB', 'MySQL'],
  },
  { name: 'Outils', icon: 'wrench', items: ['GitHub', 'Visual Studio Code', 'Eclipse'] },
  { name: 'Design', icon: 'palette', items: ['Adobe Illustrator', 'Canva'] },
  {
    name: 'IA',
    icon: 'sparkles',
    items: ['Fondamentaux IA & IA générative', 'Applications web assistées par IA'],
  },
]

export const leadership: Leadership[] = [
  {
    title: 'Président — ESEN Ambassadors',
    organization: 'École Supérieure d’Économie Numérique (ESEN), Université de la Manouba',
    period: '2024 – présent',
    icon: 'crown',
    layout: 'featured',
    progression: ['Media Manager', 'Vice-Président', 'Président'],
    points: [
      'Engagement étudiant et coordination d’équipe',
      'Organisation d’événements',
      'Communication média',
      'Intégration des nouveaux étudiants',
    ],
  },
  {
    title: 'Statut National Étudiant Entrepreneur (SNEE)',
    organization: 'Université de la Manouba – Programme Étudiant Entrepreneur',
    period: '2025 / 2026',
    icon: 'rocket',
    description:
      "Développement de TalebUp.tn, plateforme d'orientation et d'accompagnement étudiant.",
    points: [],
  },
  {
    title: 'Autres activités associatives',
    organization: 'Vie associative & extracurriculaire',
    period: '2023 – présent',
    icon: 'globe',
    layout: 'chips',
    points: [
      'JOKER ESEN (2024 – présent)',
      "Association de Robotique de l'ENSI (2025 – présent)",
      'Green UMA ESEN (2025 – présent)',
      'BIL: LPM (2023 – 2024)',
    ],
  },
]

/** Renseigne `href` avec le lien du diplôme pour activer le bouton « Voir le diplôme ». */
export const certificationGroups: CertificationGroup[] = [
  {
    organization: 'The Hashgraph Association',
    category: 'Blockchain / Web3',
    icon: 'blocks',
    featured: true,
    certs: [
      { name: 'Hedera Certified Developer Associate (HCDA)', href: '/certificates/hedera-hcda.pdf' },
      { name: 'Hedera Certified Foundation (HCF)', href: '/certificates/hedera-hcf.pdf' },
      { name: 'Hedera Business Foundation (HBF)', href: '/certificates/hedera-hbf.pdf' },
    ],
  },
  {
    organization: 'DataCamp',
    icon: 'database',
    certs: [
      { name: 'Introduction to Python', href: '/certificates/datacamp-intro-python.pdf' },
      { name: 'Intermediate Python', href: '/certificates/datacamp-intermediate-python.pdf' },
      { name: 'Introduction to Relational Databases in SQL', href: '/certificates/datacamp-relational-databases-sql.pdf' },
      { name: 'Joining Data in SQL', href: '' },
    ],
  },
  {
    organization: '365 Data Science',
    icon: 'brain',
    certs: [
      { name: 'Intro to AI', href: '/certificates/365-intro-ai.pdf' },
      { name: 'Intro to ChatGPT and Generative AI', href: '/certificates/365-intro-chatgpt-genai.pdf' },
      { name: 'ChatGPT for SQL Beginners', href: '/certificates/365-chatgpt-sql-beginners.pdf' },
      { name: 'SQL', href: '/certificates/365-sql.pdf' },
    ],
  },
]

export const languages: Language[] = [
  { name: 'Arabic', level: 'Native', score: 6 },
  { name: 'French', level: 'B1', score: 3 },
  { name: 'English', level: 'B2', score: 4 },
]

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const
