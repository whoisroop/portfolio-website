import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Sun, Moon, RefreshCw } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
}

const MENU_WIDTH = 190;
const MENU_HEIGHT = 110;

export function ContextMenu({ x, y, onClose }: ContextMenuProps) {
  const { theme, toggleTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  // Clamp position so the menu stays fully within the viewport
  const clampedX = Math.min(x, window.innerWidth - MENU_WIDTH - 8);
  const clampedY = Math.min(y, window.innerHeight - MENU_HEIGHT - 56); // 56 = taskbar + margin

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('mousedown', handler);
    window.addEventListener('keydown', keyHandler);
    return () => {
      window.removeEventListener('mousedown', handler);
      window.removeEventListener('keydown', keyHandler);
    };
  }, [onClose]);

  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.12 }}
      style={{ position: 'fixed', left: clampedX, top: clampedY, zIndex: 9999 }}
      className="rounded-xl border py-1.5 min-w-[180px] shadow-2xl
                 bg-white/85 dark:bg-gray-900/90 backdrop-blur-2xl
                 border-white/30 dark:border-gray-700/30"
    >
      <MenuItem icon={RefreshCw} label="Refresh Desktop" onClick={onClose} />
      <div className="border-t border-gray-200/50 dark:border-gray-700/50 my-1" />
      <MenuItem
        icon={Monitor}
        label={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        icon2={theme === 'dark' ? Sun : Moon}
        onClick={() => { toggleTheme(); onClose(); }}
      />
    </motion.div>
  );
}

function MenuItem({ icon: Icon, label, icon2: Icon2, onClick }: {
  icon: React.ComponentType<{ size: number; className?: string }>;
  label: string;
  icon2?: React.ComponentType<{ size: number; className?: string }>;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm
                 hover:bg-white/60 dark:hover:bg-white/10 transition-colors
                 text-gray-700 dark:text-gray-200"
    >
      <Icon size={15} className="text-gray-500 dark:text-gray-400" />
      <span className="flex-1 text-left">{label}</span>
      {Icon2 && <Icon2 size={13} className="text-gray-400" />}
    </button>
  );
}
