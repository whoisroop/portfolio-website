import {
  User, FolderGit2, Wrench, Briefcase, GraduationCap,
  FileText, Mail, Terminal, Cloud, Cog, Code, Bot, Eye,
  type LucideIcon
} from 'lucide-react';

export const DESKTOP_ICON_MAP: Record<string, LucideIcon> = {
  about: User,
  projects: FolderGit2,
  skills: Wrench,
  experience: Briefcase,
  education: GraduationCap,
  resume: FileText,
  contact: Mail,
  terminal: Terminal,
};

export const SKILL_LUCIDE_ICON_MAP: Record<string, LucideIcon> = {
  cloud: Cloud,
  devops: Cog,
  coding: Code,
  ai: Bot,
  observe: Eye,
};

export const DESKTOP_ICON_COLORS: Record<string, string> = {
  about: '#6366f1',
  projects: '#8b5cf6',
  skills: '#06b6d4',
  experience: '#ec4899',
  education: '#f59e0b',
  resume: '#10b981',
  contact: '#f43f5e',
  terminal: '#22c55e',
};

export function AppIcon({ id, size = 24, className }: { id: string; size?: number; className?: string }) {
  const Icon = DESKTOP_ICON_MAP[id];
  if (!Icon) return null;
  const color = DESKTOP_ICON_COLORS[id] || '#6366f1';
  return <Icon size={size} className={className} style={{ color }} />;
}
