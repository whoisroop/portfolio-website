import type { ComponentType } from 'react';
import { 
  IconAbout, IconProjects, IconSkills, IconExperience,
  IconEducation, IconResume, IconContact, IconTerminal,
  IconCloud, IconObserve, IconDevops, IconCoding, IconAi
} from '@/components/ui/FlaticonIcons';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  demo: string;
  category: 'platform' | 'ai-ml' | 'devops' | 'infra';
}

export interface Skill {
  name: string;
  level: number;
  icon: ComponentType<{ size?: number; className?: string }>;
  color: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Experience {
  company: string;
  position: string;
  dates: string;
  responsibilities: string[];
  technologies: string[];
  logo: string;
}

export interface Education {
  institution: string;
  degree: string;
  year: string;
  coursework: string[];
  achievements: string[];
  logo: string;
}

export interface DesktopIcon {
  id: string;
  label: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  color: string;
  windowId: string;
}

export const portfolioData = {
  name: "Roop Lala",
  title: "Platform & DevOps Engineer",
  tagline: "I build the infrastructure that helps teams ship faster.",
  location: "Hyderabad, India",
  email: "whoisroop.work@gmail.com",
  phone: "+91 997940xxxx",
  github: "https://github.com/whoisroop",
  linkedin: "https://linkedin.com/in/roop-lala",
  twitter: "https://github.com/whoisroop",
  website: "https://github.com/whoisroop",
  
  about: {
    bio: `Hey, I'm Roop — I work on platforms and pipelines at GE Vernova, where I spend my days 
    wrangling Kubernetes clusters, automating deployments, and making sure things don't break at 3 AM.

    I fell in love with infrastructure because I believe great platforms disappear into the background — 
    they just work. Over the past couple of years, I've built CI/CD systems that serve 200+ repositories, 
    saved $48K/year by right-sizing cloud resources, and helped 15+ teams adopt self-service deployments.

    Outside of work, I'm deep into the AI-assisted development space. I use Claude and OpenCode daily, 
    tinker with MCP servers, and experiment with sub-agents to automate the boring parts of engineering. 
    I also enjoy competitive programming (1000+ problems solved), mentoring, and the occasional hackathon.`,
    interests: [
      "Kubernetes & GitOps",
      "AI-Assisted Development",
      "Platform Engineering",
      "Cloud Cost Optimization",
      "Competitive Programming",
      "Open Source"
    ],
    philosophy: "Make the platform invisible. Build things that empower others."
  },

  projects: [
    {
      id: "1",
      title: "SIRE — CI/CD Platform",
      description: "Architected GE Vernova's core CI/CD platform for product release readiness. Shipped 10+ applications to production Kubernetes with automated quality gates, and scaled it to handle 200+ repos.",
      image: "",
      technologies: ["Kubernetes", "GitHub Actions", "ArgoCD", "GitOps", "Helm", "Backstage"],
      github: "https://github.com/whoisroop",
      demo: "",
      category: "platform"
    },
    {
      id: "2",
      title: "Cloud Cost Optimizer",
      description: "Re-architected the provisioning model to stop paying for idle environments. Automated resource allocation and tuned Kubernetes clusters for actual workload patterns — saved $48K/year.",
      image: "",
      technologies: ["AWS", "Terraform", "Kubernetes", "Python", "Prometheus", "Grafana"],
      github: "https://github.com/whoisroop",
      demo: "",
      category: "infra"
    },
    {
      id: "3",
      title: "Energy Load Forecaster",
      description: "Built a short-term load forecasting system for real-time grid dispatch using OpenSTEF and XGBoost with an MLflow tracking backend. Hit 90%+ accuracy and sped up inference by 35%.",
      image: "",
      technologies: ["Python", "XGBoost", "MLflow", "OpenSTEF", "Docker", "AWS"],
      github: "https://github.com/whoisroop",
      demo: "",
      category: "ai-ml"
    },
    {
      id: "4",
      title: "Backstage Developer Portal",
      description: "Rolled out Backstage to 15+ engineering teams, giving everyone a single pane of glass for self-service deployments. Shared GitHub Actions workflows meant anyone could ship without waiting.",
      image: "",
      technologies: ["Backstage", "GitHub Actions", "TypeScript", "React", "Kubernetes"],
      github: "https://github.com/whoisroop",
      demo: "",
      category: "devops"
    },
    {
      id: "5",
      title: "Embryo Viability Classifier",
      description: "Built a CNN pipeline to classify embryo viability from time-lapse microscope images. Not perfect at 70-75% accuracy, but enough to cut a client's manual screening costs by 15%.",
      image: "",
      technologies: ["Python", "TensorFlow", "CNN", "Computer Vision", "MLflow"],
      github: "https://github.com/whoisroop",
      demo: "",
      category: "ai-ml"
    }
  ] as Project[],

  skillCategories: [
    {
      title: "Cloud & Infrastructure",
      skills: [
        { name: "AWS", level: 90, icon: IconCloud, color: "#FF9900" },
        { name: "Kubernetes", level: 92, icon: IconCloud, color: "#326CE5" },
        { name: "Docker", level: 90, icon: IconCloud, color: "#2496ED" },
        { name: "Terraform", level: 85, icon: IconCloud, color: "#7B42BC" },
        { name: "Helm", level: 82, icon: IconCloud, color: "#0F1689" },
        { name: "Linux", level: 88, icon: IconCloud, color: "#FCC624" },
      ]
    },
    {
      title: "CI/CD & Delivery",
      skills: [
        { name: "GitHub Actions", level: 95, icon: IconDevops, color: "#2088FF" },
        { name: "ArgoCD", level: 88, icon: IconDevops, color: "#EF7B4D" },
        { name: "Jenkins", level: 80, icon: IconDevops, color: "#D24939" },
        { name: "Backstage", level: 85, icon: IconDevops, color: "#6C43E0" },
        { name: "GitOps", level: 92, icon: IconDevops, color: "#F05032" },
        { name: "Artifactory", level: 78, icon: IconDevops, color: "#41BF47" },
      ]
    },
    {
      title: "Languages & Scripting",
      skills: [
        { name: "Python", level: 90, icon: IconCoding, color: "#3776AB" },
        { name: "Bash", level: 88, icon: IconCoding, color: "#4EAA25" },
        { name: "Groovy", level: 75, icon: IconCoding, color: "#4298B8" },
      ]
    },
    {
      title: "AI & Automation",
      skills: [
        { name: "Claude / LLMs", level: 90, icon: IconAi, color: "#D97706" },
        { name: "MCP Servers", level: 85, icon: IconAi, color: "#7C3AED" },
        { name: "Sub-agents", level: 80, icon: IconAi, color: "#2563EB" },
        { name: "OpenCode", level: 88, icon: IconAi, color: "#DB2777" },
        { name: "MLflow", level: 85, icon: IconAi, color: "#0194E2" },
        { name: "MLOps", level: 82, icon: IconAi, color: "#16A34A" },
      ]
    },
    {
      title: "Observability & Practices",
      skills: [
        { name: "Grafana", level: 85, icon: IconObserve, color: "#F46800" },
        { name: "Prometheus", level: 82, icon: IconObserve, color: "#E6522C" },
        { name: "SRE", level: 85, icon: IconObserve, color: "#4285F4" },
        { name: "DevEx", level: 88, icon: IconObserve, color: "#0D9488" },
        { name: "Multi-Cluster K8s", level: 80, icon: IconObserve, color: "#326CE5" },
        { name: "Microservices", level: 85, icon: IconObserve, color: "#FF0055" },
      ]
    },
  ] as SkillCategory[],

  experience: [
    {
      company: "GE Vernova — Grid Software",
      position: "Software Engineer | Platform & DevOps Engineering",
      dates: "Aug 2024 – Present",
      responsibilities: [
        "Built SIRE, the CI/CD backbone for product releases at GE Vernova — it now handles 200+ repos and 10+ production apps",
        "Saved $48K/year by killing idle cloud environments and right-sizing our Kubernetes clusters for actual workloads",
        "Pushed pipeline reliability from flaky to 94% success rate by adding automated failure recovery and smarter deployment controls",
        "Led a small team of 3 to integrate a geospatial network management platform into our release pipeline — shipped 20+ packages in 2 sprints",
        "Championed Backstage adoption across 15+ teams so engineers could self-serve deployments without filing tickets or waiting on ops",
        "Cut AWS environment spin-up time by 30% and set up persistent GitOps environments with ArgoCD so staging actually mirrors production"
      ],
      technologies: ["Kubernetes", "GitHub Actions", "ArgoCD", "Terraform", "AWS", "Backstage", "Helm", "GitOps"],
      logo: ""
    },
    {
      company: "GE Vernova — Grid Software",
      position: "Software Engineer Intern | MLOps Engineering",
      dates: "Jan 2024 – Jul 2024",
      responsibilities: [
        "Built a load forecasting model for real-time grid dispatch — hit 90%+ accuracy with OpenSTEF and XGBoost, which is pretty solid for energy data",
        "Set up an MLflow-based experiment tracking system so the team could stop losing model versions and reproduce results reliably. Also squeezed 35% more speed out of inference with better feature engineering"
      ],
      technologies: ["Python", "XGBoost", "MLflow", "OpenSTEF", "MLOps", "AWS"],
      logo: ""
    },
    {
      company: "MetaLoop Marketing",
      position: "Freelance Machine Learning Engineer",
      dates: "Aug 2023 – Oct 2023",
      responsibilities: [
        "Trained a CNN to classify embryo viability from time-lapse microscope images — not medical-grade, but good enough at 70-75% to cut the client's manual review costs by 15%"
      ],
      technologies: ["Python", "TensorFlow", "CNN", "Computer Vision", "MLflow"],
      logo: ""
    }
  ] as Experience[],

  education: [
    {
      institution: "IIIT Surat",
      degree: "B.Tech, Computer Science & Engineering",
      year: "2020 – 2024",
      coursework: ["Data Structures", "Algorithms", "Operating Systems", "Computer Networks", "Database Systems", "Machine Learning"],
      achievements: [
        "CGPA 9.57 / 10 — Rank 1 in the batch",
        "GE Vernova Impact Award for 'Delivering with Accountability'",
        "Top 10 finalist at DotSlash National Hackathon (out of 1,000+)",
        "1000+ problems solved on LeetCode & GeeksforGeeks",
        "Mentored 2 interns — both converted to full-time"
      ],
      logo: ""
    }
  ] as Education[],

  desktopIcons: [
    { id: "about", label: "About Me", icon: IconAbout, color: "#4F46E5", windowId: "about" },
    { id: "projects", label: "Projects", icon: IconProjects, color: "#7C3AED", windowId: "projects" },
    { id: "skills", label: "Skills", icon: IconSkills, color: "#0D9488", windowId: "skills" },
    { id: "experience", label: "Experience", icon: IconExperience, color: "#EA580C", windowId: "experience" },
    { id: "education", label: "Education", icon: IconEducation, color: "#DB2777", windowId: "education" },
    { id: "resume", label: "Resume", icon: IconResume, color: "#16A34A", windowId: "resume" },
    { id: "contact", label: "Contact", icon: IconContact, color: "#2563EB", windowId: "contact" },
    { id: "terminal", label: "Terminal", icon: IconTerminal, color: "#1E293B", windowId: "terminal" },
  ] as DesktopIcon[]
};

export const windowMeta: Record<string, { 
  title: string; 
  accentColor: string; 
  icon: ComponentType<{ size?: number; className?: string }>; 
  width: number; 
  height: number 
}> = {
  about: { title: "About Me", accentColor: "#4F46E5", icon: IconAbout, width: 580, height: 500 },
  projects: { title: "Projects", accentColor: "#7C3AED", icon: IconProjects, width: 750, height: 550 },
  skills: { title: "Skills", accentColor: "#0D9488", icon: IconSkills, width: 680, height: 520 },
  experience: { title: "Experience", accentColor: "#EA580C", icon: IconExperience, width: 660, height: 540 },
  education: { title: "Education", accentColor: "#DB2777", icon: IconEducation, width: 600, height: 520 },
  resume: { title: "Resume", accentColor: "#16A34A", icon: IconResume, width: 650, height: 580 },
  contact: { title: "Contact", accentColor: "#2563EB", icon: IconContact, width: 550, height: 520 },
  terminal: { title: "Terminal", accentColor: "#1E293B", icon: IconTerminal, width: 600, height: 420 },
};
