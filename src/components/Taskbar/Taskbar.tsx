import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindows, type WindowState } from '@/context/WindowContext';
import { windowMeta } from '@/data/portfolio';
import { StartMenu } from './StartMenu';
import { Clock } from './Clock';
import { Sparkles } from 'lucide-react';

export function Taskbar() {
  const { windows, focusWindow, activeWindowId } = useWindows();
  const [startOpen, setStartOpen] = useState(false);
  
  const openWindows = Array.from(windows.values()).filter(w => w.isOpen);

  return (
    <>
      <AnimatePresence>
        {startOpen && <StartMenu onClose={() => setStartOpen(false)} />}
      </AnimatePresence>

      <div
        className="fixed bottom-0 left-0 right-0 h-12 flex items-center gap-1 px-2 z-[9999]
                   bg-white/60 dark:bg-gray-900/70 backdrop-blur-xl
                   border-t border-white/30 dark:border-gray-700/30
                   shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setStartOpen(!startOpen)}
          className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0
                     bg-gradient-to-br from-indigo-500 to-purple-600
                     shadow-lg shadow-indigo-500/25
                     hover:shadow-indigo-500/40 transition-shadow"
        >
          <Sparkles size={18} className="text-white" />
        </motion.button>

        <div className="w-px h-6 bg-gray-300/50 dark:bg-gray-600/50 mx-0.5" />

        <div className="flex-1 flex items-center gap-1 overflow-x-auto">
          <AnimatePresence>
            {openWindows.map(win => (
              <TaskbarButton
                key={win.id}
                win={win}
                isActive={activeWindowId === win.id && !win.isMinimized}
                onClick={() => focusWindow(win.id)}
              />
            ))}
          </AnimatePresence>
        </div>

        <Clock />
      </div>
    </>
  );
}

function TaskbarButton({ win, isActive, onClick }: { 
  win: WindowState; 
  isActive: boolean; 
  onClick: () => void;
}) {
  const meta = windowMeta[win.id];
  if (!meta) return null;
  const Icon = meta.icon;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8, x: -20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.8, x: -20 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`h-9 px-3 rounded-xl flex items-center gap-2 text-xs font-medium
                 shrink-0 max-w-[180px] transition-all duration-200
                 ${isActive 
                   ? 'bg-white/80 dark:bg-white/15 shadow-md' 
                   : 'bg-white/30 dark:bg-white/5 hover:bg-white/50 dark:hover:bg-white/10'
                 }`}
      style={{
        borderBottom: isActive ? `2px solid ${meta.accentColor}` : '2px solid transparent',
      }}
    >
      <Icon size={14} />
      <span className="truncate hidden sm:block text-gray-700 dark:text-gray-200">
        {meta.title}
      </span>
      {win.isMinimized && <span className="text-[10px] opacity-50 ml-auto">−</span>}
    </motion.button>
  );
}
