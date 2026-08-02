import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Monitor, RefreshCw } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { useWindows } from '@/context/WindowContext';

export function ContextMenu({
  x,
  y,
  onClose,
}: {
  x: number;
  y: number;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { openWindow } = useWindows();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', keyHandler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', keyHandler);
    };
  }, [onClose]);

  const menuX = Math.min(x, typeof window !== 'undefined' ? window.innerWidth - 220 : x);
  const menuY = Math.min(y, typeof window !== 'undefined' ? window.innerHeight - 230 : y);

  const menuItems = [
    { label: 'About Me', action: () => openWindow('about', 'About Me', portfolioData.desktopIcons[0].iconUrl) },
    { label: 'Projects', action: () => openWindow('projects', 'Projects', portfolioData.desktopIcons[1].iconUrl) },
    { label: 'Skills', action: () => openWindow('skills', 'Skills', portfolioData.desktopIcons[2].iconUrl) },
    { label: 'Experience', action: () => openWindow('experience', 'Experience', portfolioData.desktopIcons[3].iconUrl) },
    { label: 'Terminal', action: () => openWindow('terminal', 'Terminal', portfolioData.desktopIcons[7].iconUrl) },
  ];

  return (
    <motion.div
      ref={ref}
      className="fixed z-[8000] glass rounded-xl overflow-hidden shadow-2xl w-52 py-1.5"
      style={{ left: menuX, top: menuY }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.1 }}
    >
      {menuItems.map((item, i) => (
        <motion.button
          key={i}
          className="w-full text-left px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2.5"
          onClick={() => { item.action(); onClose(); }}
          whileHover={{ x: 2 }}
        >
          <Monitor className="w-3.5 h-3.5 text-white/40" />
          {item.label}
        </motion.button>
      ))}
      <div className="border-t border-white/[0.06] my-1" />
      <button
        className="w-full text-left px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2.5"
        onClick={() => { window.location.reload(); }}
      >
        <RefreshCw className="w-3.5 h-3.5 text-white/40" />
        Refresh
      </button>
    </motion.div>
  );
}
