import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useWindows } from '@/context/WindowContext';
import { useTheme } from '@/context/ThemeContext';
import { portfolioData, windowMeta } from '@/data/portfolio';
import { Sun, Moon, Globe, ExternalLink } from 'lucide-react';

interface StartMenuProps {
  onClose: () => void;
}

export function StartMenu({ onClose }: StartMenuProps) {
  const { openWindow } = useWindows();
  const { theme, toggleTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    // Delay to avoid the click that opened it from immediately closing it
    const timer = setTimeout(() => window.addEventListener('mousedown', handler), 50);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousedown', handler);
    };
  }, [onClose]);

  const handleOpen = (windowId: string) => {
    const meta = windowMeta[windowId];
    if (meta) openWindow(windowId, { width: meta.width, height: meta.height });
    onClose();
  };

  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="fixed bottom-14 left-2 w-72 rounded-2xl border shadow-2xl z-[10000]
                 bg-white/80 dark:bg-gray-900/85 backdrop-blur-2xl overflow-hidden
                 border-white/30 dark:border-gray-700/30"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-4 bg-gradient-to-br from-indigo-500/20 to-purple-600/20
                      dark:from-indigo-500/30 dark:to-purple-600/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 
                          flex items-center justify-center text-white font-bold text-lg shadow-lg">
            {portfolioData.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{portfolioData.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{portfolioData.title}</p>
          </div>
        </div>
      </div>

      <div className="p-2">
        {portfolioData.desktopIcons.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleOpen(item.windowId)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                         hover:bg-gray-100/60 dark:hover:bg-white/10 transition-colors
                         text-gray-700 dark:text-gray-200"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${item.color}DD, ${item.color}99)` }}
              >
                <Icon size={16} className="text-white" />
              </div>
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-1 p-2 border-t border-gray-200/50 dark:border-gray-700/50">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl hover:bg-gray-100/60 dark:hover:bg-white/10 transition-colors"
          title={theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
        >
          {theme === 'dark' ? <Sun size={16} className="text-gray-400" /> : <Moon size={16} className="text-gray-500" />}
        </button>
        <div className="flex-1" />
        <SocialLink href={portfolioData.github} icon={Globe} />
        <SocialLink href={portfolioData.linkedin} icon={ExternalLink} />

      </div>
    </motion.div>
  );
}

function SocialLink({ href, icon: Icon }: { href: string; icon: React.ComponentType<{ size: number; className?: string }> }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-xl hover:bg-gray-100/60 dark:hover:bg-white/10 transition-colors"
      onClick={(e) => e.stopPropagation()}
    >
      <Icon size={15} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
    </a>
  );
}
