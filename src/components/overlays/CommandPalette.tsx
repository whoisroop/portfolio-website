import { useState, useEffect, useRef, useCallback, type ComponentType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindows } from '@/context/WindowContext';
import { useTheme } from '@/context/ThemeContext';
import { portfolioData, windowMeta } from '@/data/portfolio';
import { Search, Moon, Sun } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface PaletteItem {
  id: string;
  label: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: ComponentType<any>;
  action: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { openWindow } = useWindows();
  const { theme, toggleTheme } = useTheme();

  const items: PaletteItem[] = [
    ...portfolioData.desktopIcons.map(icon => ({
      id: icon.windowId,
      label: icon.label,
      description: `Open ${icon.label} window`,
      icon: icon.icon,
      action: () => {
        const meta = windowMeta[icon.windowId];
        if (meta) openWindow(icon.windowId, { width: meta.width, height: meta.height });
        onClose();
      }
    })),
    {
      id: 'theme',
      label: theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode',
      description: 'Toggle color theme',
      icon: theme === 'dark' ? Sun : Moon,
      action: () => { toggleTheme(); onClose(); }
    }
  ];

  const filtered = items.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase())
  );

  const executeSelected = useCallback(() => {
    if (filtered[selectedIndex]) {
      filtered[selectedIndex].action();
    }
  }, [filtered, selectedIndex]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        executeSelected();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, filtered.length, executeSelected, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[450px] max-w-[calc(100vw-32px)]
                       rounded-2xl border shadow-2xl z-[99999] overflow-hidden
                       bg-white/85 dark:bg-gray-900/90 backdrop-blur-2xl
                       border-white/30 dark:border-gray-700/30"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/50">
              <Search size={16} className="text-gray-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200
                           placeholder-gray-400"
              />
              <kbd className="px-2 py-0.5 text-[10px] font-medium rounded-md
                              bg-gray-100 dark:bg-gray-800 text-gray-400">
                ESC
              </kbd>
            </div>
            <div className="max-h-[300px] overflow-y-auto p-1.5">
              {filtered.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.02 }}
                    onClick={item.action}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors
                      ${i === selectedIndex 
                        ? 'bg-indigo-50 dark:bg-indigo-500/10' 
                        : 'hover:bg-gray-50 dark:hover:bg-white/5'
                      }`}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                         style={{ background: `${portfolioData.desktopIcons.find(d => d.windowId === item.id)?.color ?? '#6366F1'}20` }}>
                      <Icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{item.label}</p>
                      <p className="text-xs text-gray-400">{item.description}</p>
                    </div>
                    {i === selectedIndex && (
                      <span className="text-[10px] text-gray-400">↵</span>
                    )}
                  </motion.button>
                );
              })}
              {filtered.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-6">No results found.</p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
