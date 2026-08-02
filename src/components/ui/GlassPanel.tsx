import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  accentColor?: string;
  noPadding?: boolean;
}

export function GlassPanel({ children, className, accentColor, noPadding }: GlassPanelProps) {
  return (
    <div
      className={cn(
        'rounded-xl border shadow-2xl overflow-hidden',
        'bg-white/70 dark:bg-gray-900/75',
        'backdrop-blur-xl backdrop-saturate-150',
        'border-white/30 dark:border-gray-700/30',
        !noPadding && 'p-5',
        className
      )}
      style={accentColor ? {
        boxShadow: `0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px ${accentColor}20 inset`,
      } : undefined}
    >
      {children}
    </div>
  );
}

export function GlassCard({ children, className, accentColor }: GlassPanelProps) {
  return (
    <div
      className={cn(
        'rounded-xl border p-4 transition-all duration-200',
        'bg-white/50 dark:bg-gray-800/50',
        'backdrop-blur-md',
        'border-white/20 dark:border-gray-700/30',
        'hover:bg-white/70 dark:hover:bg-gray-800/70',
        'hover:shadow-lg hover:-translate-y-0.5',
        className
      )}
      style={accentColor ? {
        boxShadow: `0 4px 16px rgba(0,0,0,0.04)`,
        borderLeft: `3px solid ${accentColor}`,
      } : undefined}
    >
      {children}
    </div>
  );
}
