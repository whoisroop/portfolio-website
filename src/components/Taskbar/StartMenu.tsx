import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Globe } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { useWindows } from '@/context/WindowContext';
import { AppIcon } from '@/components/ui/AppIcons';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const startApps = [
  { id: 'about', label: 'About Me', iconUrl: portfolioData.desktopIcons[0].iconUrl },
  { id: 'projects', label: 'Projects', iconUrl: portfolioData.desktopIcons[1].iconUrl },
  { id: 'skills', label: 'Skills', iconUrl: portfolioData.desktopIcons[2].iconUrl },
  { id: 'experience', label: 'Experience', iconUrl: portfolioData.desktopIcons[3].iconUrl },
  { id: 'education', label: 'Education', iconUrl: portfolioData.desktopIcons[4].iconUrl },
  { id: 'resume', label: 'Resume', iconUrl: portfolioData.desktopIcons[5].iconUrl },
  { id: 'contact', label: 'Contact', iconUrl: portfolioData.desktopIcons[6].iconUrl },
  { id: 'terminal', label: 'Terminal', iconUrl: portfolioData.desktopIcons[7].iconUrl },
];

export function StartMenu({ onClose }: { onClose: () => void }) {
  const { openWindow } = useWindows();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const timeout = setTimeout(() => {
      document.addEventListener('mousedown', handler);
    }, 0);
    return () => {
      clearTimeout(timeout);
      document.removeEventListener('mousedown', handler);
    };
  }, [onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <>
      <div className="fixed inset-0 z-[6999]" onClick={onClose} />

      <motion.div
        ref={menuRef}
        className="absolute bottom-14 left-2 w-72 glass rounded-xl overflow-hidden shadow-2xl glow-indigo z-[7000]"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.15 }}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Monitor className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{portfolioData.name}</p>
              <p className="text-[10px] text-white/50">{portfolioData.title}</p>
            </div>
          </div>
        </div>

        {/* App list */}
        <div className="p-2 max-h-[280px] overflow-y-auto">
          <p className="text-[10px] text-white/30 px-3 py-1.5 uppercase tracking-wider font-medium">Applications</p>
          {startApps.map((app) => (
            <motion.button
              key={app.id}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-white/10 transition-colors group"
              onClick={() => { openWindow(app.id, app.label, app.iconUrl); onClose(); }}
              whileHover={{ x: 3 }}
              transition={{ duration: 0.1 }}
            >
              <AppIcon id={app.id} size={18} />
              <span className="text-sm text-white/80 group-hover:text-white">{app.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-white/[0.06] p-2 flex items-center justify-between">
          <div className="flex gap-1">
            <motion.a
              href={portfolioData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <GithubIcon className="w-4 h-4" />
            </motion.a>
            <motion.a
              href={portfolioData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <LinkedinIcon className="w-4 h-4" />
            </motion.a>
            <motion.a
              href={`mailto:${portfolioData.email}`}
              className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Globe className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </>
  );
}
