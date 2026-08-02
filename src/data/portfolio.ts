export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  title: string;
  icon: string;
  color: string;
  skills: Skill[];
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  highlights: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  type: 'fulltime' | 'intern' | 'freelance';
  bullets: string[];
  color: string;
}

export interface Education {
  institution: string;
  degree: string;
  year: string;
  details: string[];
  cgpa: string;
  rank: string;
}

export interface DesktopIcon {
  id: string;
  label: string;
  iconUrl: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  githubUsername: string;
  linkedinUsername: string;
  about: {
    bio: string;
    interests: string[];
    philosophy: string;
  };
  projects: Project[];
  skillCategories: SkillCategory[];
  experience: Experience[];
  education: Education[];
  desktopIcons: DesktopIcon[];
}

const CDN = 'https://cdn-icons-png.flaticon.com/512';

export const portfolioData: PortfolioData = {
  name: 'Roop Lala',
  title: 'Platform & DevOps Engineer',
  tagline: 'I build the infrastructure that helps teams ship faster.',
  location: 'Hyderabad, India',
  email: 'whoisroop.work@gmail.com',
  phone: '+91 997940xxxx',
  github: 'https://github.com/whoisroop',
  linkedin: 'https://linkedin.com/in/roop-lala',
  githubUsername: 'whoisroop',
  linkedinUsername: 'roop-lala',

  about: {
    bio: `Hey, I'm Roop — a Platform & DevOps Engineer passionate about building robust, scalable infrastructure. I design and maintain CI/CD pipelines for 200+ repositories, saving $48K/year through automated infrastructure optimization. I empower 15+ teams with self-service deployment platforms and use Claude, OpenCode, and MCP daily to accelerate development workflows. Currently at GE Vernova, I build the internal developer platforms that make shipping software feel invisible.`,
    interests: [
      'Kubernetes & GitOps',
      'AI-Assisted Development',
      'Platform Engineering',
      'Developer Experience (DevEx)',
      'Cloud-Native Architecture',
      'Infrastructure as Code',
    ],
    philosophy: 'Make the platform invisible. Build things that empower others.',
  },

  projects: [
    {
      title: 'Embryo Viability Classifier',
      description: 'CNN-based embryo viability classifier achieving 70-75% accuracy with 15% cost reduction for IVF applications.',
      tags: ['PyTorch', 'CNN', 'Python', 'Medical AI'],
      link: 'https://github.com/whoisroop',
      highlights: [
        '70-75% classification accuracy',
        '15% reduction in operational costs',
        'Delivered production-ready inference API',
      ],
    },
    {
      title: 'SPARK — Smart Park',
      description: 'A smart parking platform that connects drivers with unused private parking spaces while enabling property owners to monetize available spots.',
      tags: ['Node.js', 'Express.js', 'MongoDB', 'MapQuest API', 'MapBox'],
      link: 'https://github.com/whoisroop/Smart-Park',
      highlights: [
        'ML-powered parking recommendations',
        'Geolocation-based parking discovery',
        'Address conversion via MapQuest Geocoding API',
        'Interactive parking availability maps using MapBox',
      ],
    },
    {
      title: 'Cloud Cost Optimizer',
      description: 'Automated cloud resource right-sizing using ML-driven recommendations and policy-based enforcement, achieving $48K in annual savings.',
      tags: ['Python', 'AWS', 'Terraform', 'ML'],
      highlights: [
        '$48K/year in cloud cost savings',
        'Automated 200+ resource optimization rules',
        'Real-time cost anomaly detection',
      ],
    },
    {
      title: 'Energy Load Forecaster',
      description: 'ML pipeline for predicting energy consumption patterns with 90%+ accuracy, achieving 35% faster inference using optimized models.',
      tags: ['Python', 'MLflow', 'PyTorch', 'Apache Kafka'],
      highlights: [
        '90%+ forecast accuracy on test data',
        '35% faster inference with optimized models',
        'Deployed as production MLOps pipeline',
      ],
    },
  ],

  skillCategories: [
    {
      title: 'Cloud & Infrastructure',
      icon: 'cloud',
      color: '#6366f1',
      skills: [
        { name: 'AWS', level: 90 },
        { name: 'Kubernetes', level: 92 },
        { name: 'Docker', level: 90 },
        { name: 'Terraform', level: 85 },
        { name: 'Helm', level: 82 },
        { name: 'Linux', level: 88 },
      ],
    },
    {
      title: 'CI/CD & Delivery',
      icon: 'devops',
      color: '#8b5cf6',
      skills: [
        { name: 'GitHub Actions', level: 95 },
        { name: 'ArgoCD', level: 88 },
        { name: 'Jenkins', level: 80 },
        { name: 'Backstage', level: 85 },
        { name: 'GitOps', level: 92 },
        { name: 'Artifactory', level: 78 },
      ],
    },
    {
      title: 'Languages & Scripting',
      icon: 'coding',
      color: '#06b6d4',
      skills: [
        { name: 'Python', level: 90 },
        { name: 'Bash', level: 88 },
        { name: 'Groovy', level: 75 },
        { name: 'TypeScript', level: 82 },
        { name: 'Go', level: 70 },
      ],
    },
    {
      title: 'AI & Automation',
      icon: 'ai',
      color: '#ec4899',
      skills: [
        { name: 'Claude / LLMs', level: 90 },
        { name: 'MCP Servers', level: 85 },
        { name: 'Sub-agents', level: 80 },
        { name: 'OpenCode', level: 88 },
        { name: 'MLflow', level: 85 },
        { name: 'MLOps', level: 82 },
      ],
    },
    {
      title: 'Observability & Practices',
      icon: 'observe',
      color: '#10b981',
      skills: [
        { name: 'Grafana', level: 85 },
        { name: 'Prometheus', level: 82 },
        { name: 'SRE', level: 85 },
        { name: 'DevEx', level: 88 },
        
        { name: 'Microservices', level: 85 },
      ],
    },
  ],

  experience: [
    {
      company: 'GE Vernova',
      role: 'Software Engineer',
      period: 'Aug 2024 – Present',
      type: 'fulltime',
      color: '#6366f1',
      bullets: [
        'Architected SIRE — CI/CD platform serving 200+ repositories and 10+ production applications',
        'Achieved 94% pipeline reliability across multi-region deployments',
        'Led Backstage adoption across 15+ engineering teams for self-service infrastructure',
        'Reduced AWS infrastructure spin-up time by 30% through automated provisioning',
        'Built self-service deployment workflows with GitHub Actions and ArgoCD',
        'Mentored 2 interns on platform engineering and DevOps best practices',
      ],
    },
    {
      company: 'GE Vernova',
      role: 'SWE Intern — MLOps',
      period: 'Jan – Jul 2024',
      type: 'intern',
      color: '#8b5cf6',
      bullets: [
        'Developed energy load forecasting pipeline achieving 90%+ accuracy',
        'Implemented MLflow-based experiment tracking and model registry',
        'Achieved 35% faster inference through model optimization',
        'Built automated retraining pipeline triggered on data drift detection',
      ],
    },
    {
      company: 'MetaLoop Marketing',
      role: 'Freelance ML Engineer',
      period: 'Aug – Oct 2023',
      type: 'freelance',
      color: '#ec4899',
      bullets: [
        'Designed CNN architecture for embryo viability classification',
        'Achieved 70-75% classification accuracy on clinical dataset',
        'Delivered production-ready inference API with FastAPI',
        'Reduced operational costs by 15% through model optimization',
      ],
    },
  ],

  education: [
    {
      institution: 'IIIT Surat',
      degree: 'B.Tech Computer Science & Engineering',
      year: '2020 – 2024',
      cgpa: '9.57/10',
      rank: 'Rank 1',
      details: [
        'GE Vernova Impact Award — Outstanding contribution to platform engineering',
        'DotSlash National Hackathon top-10 finalist (1,000+ participants)',
        '1000+ LeetCode/GfG problems solved across platforms',
        'Mentored 2 interns on DevOps and cloud infrastructure',
        'Open source contributor to CNCF projects',
      ],
    },
  ],

  desktopIcons: [
    { id: 'about', label: 'About Me', iconUrl: `${CDN}/7340/7340710.png` },
    { id: 'projects', label: 'Projects', iconUrl: `${CDN}/6577/6577281.png` },
    { id: 'skills', label: 'Skills', iconUrl: `${CDN}/18043/18043561.png` },
    { id: 'experience', label: 'Experience', iconUrl: `${CDN}/11321/11321307.png` },
    { id: 'education', label: 'Education', iconUrl: `${CDN}/2987/2987867.png` },
    { id: 'resume', label: 'Resume', iconUrl: `${CDN}/12908/12908904.png` },
    { id: 'contact', label: 'Contact', iconUrl: `${CDN}/2132/2132622.png` },
    { id: 'terminal', label: 'Terminal', iconUrl: `${CDN}/9825/9825966.png` },
  ],
};

export const SKILL_ICON_MAP: Record<string, string> = {
  cloud: `${CDN}/6800/6800631.png`,
  devops: `${CDN}/16942/16942846.png`,
  coding: `${CDN}/4013/4013275.png`,
  ai: `${CDN}/8131/8131880.png`,
  observe: `${CDN}/470/470979.png`,
};

// No external icons to preload — using lucide-react (bundled SVG)
export const ALL_ICON_URLS: string[] = [];
