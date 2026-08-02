import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Search } from 'lucide-react';
import { useWindows } from '@/context/WindowContext';
import { Clock } from './Clock';
import { StartMenu } from './StartMenu';
import { AppIcon } from '@/components/ui/AppIcons';

const TAB_ACCENTS: Record<string, string> = {
  about: '#6366f1',
  projects: '#8b5cf6',
  skills: '#06b6d4',
  experience: '#ec4899',
  education: '#f59e0b',
  resume: '#10b981',
  contact: '#f43f5e',
  terminal: '#22c55e',
};

export function Taskbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const { windows, focusWindow, toggleMinimize, getHighestZ } = useWindows();
  const [startOpen, setStartOpen] = useState(false);

  const openWindows = Array.from(windows.values()).filter(w => w.isOpen);
  const topZ = getHighestZ();

  return (
    <>
      <AnimatePresence>
        {startOpen && <StartMenu onClose={() => setStartOpen(false)} />}
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 right-0 h-[48px] glass border-t border-white/[0.06] flex items-center px-2 gap-1 z-[6000]">
        {/* Start Button */}
        <motion.button
          className={`h-10 px-3 rounded-lg flex items-center gap-2 transition-colors ${
            startOpen
              ? 'bg-white/15 text-white'
              : 'text-white/80 hover:bg-white/10 hover:text-white'
          }`}
          onClick={() => setStartOpen(prev => !prev)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Monitor className="w-5 h-5" />
          <span className="text-xs font-medium hidden sm:inline">Start</span>
        </motion.button>

        <div className="w-px h-6 bg-white/[0.08] mx-1" />

        {/* Window Tabs */}
        <div className="flex-1 flex items-center gap-1 overflow-x-auto">
          {openWindows.map(win => {
            const accent = TAB_ACCENTS[win.id] || '#6366f1';
            const isActive = !win.isMinimized && win.zIndex === topZ;
            return (
              <motion.button
                key={win.id}
                className="h-10 max-w-[180px] px-3 rounded-lg flex items-center gap-2 text-xs transition-colors truncate relative"
                style={{
                  backgroundColor: isActive ? `${accent}18` : win.isMinimized ? 'transparent' : 'rgba(255,255,255,0.06)',
                  color: isActive ? '#fff' : win.isMinimized ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.8)',
                }}
                onClick={() => win.isMinimized ? focusWindow(win.id) : toggleMinimize(win.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                layout
              >
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                    style={{ background: accent }}
                    layoutId="taskbar-accent"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <AppIcon id={win.id} size={14} />
                <span className="truncate">{win.title}</span>
              </motion.button>
            );
          })}
        </div>

        <div className="w-px h-6 bg-white/[0.08] mx-1" />

        {/* Search */}
        <motion.button
          className="h-10 w-10 rounded-lg flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors"
          onClick={onOpenPalette}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Search className="w-4 h-4" />
        </motion.button>

        {/* System Tray + Clock */}
        <div className="h-10 px-3 rounded-lg flex items-center gap-2 hover:bg-white/5 transition-colors cursor-default">
          <Clock />
        </div>
      </div>
    </>
  );
}
