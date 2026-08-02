import { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { useWindows } from '@/context/WindowContext';
import { AppIcon, DESKTOP_ICON_COLORS } from '@/components/ui/AppIcons';

export function Dock() {
  const { openWindow, windows } = useWindows();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const openWindows = Array.from(windows.values()).filter(w => w.isOpen);

  // Smaller on mobile
  const iconSize = 'w-[36px] h-[36px] sm:w-[42px] sm:h-[42px]';
  const iconInner = 'size-[16px] sm:size-[20px]';

  return (
    <div className="fixed bottom-[52px] sm:bottom-[56px] left-1/2 -translate-x-1/2 z-[5000]">
      <motion.div
        className="flex items-end gap-0 px-1.5 sm:px-2 py-1.5 sm:py-2 glass rounded-[24px] sm:rounded-[28px] shadow-2xl max-w-[95vw] overflow-x-auto"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 25 }}
      >
        {portfolioData.desktopIcons.map((item, i) => {
          const color = DESKTOP_ICON_COLORS[item.id] || '#6366f1';
          const isOpen = openWindows.some(w => w.id === item.id);
          const isHovered = hoveredIndex === i;
          const distance = hoveredIndex !== null ? Math.abs(i - hoveredIndex) : 0;
          const scale = isHovered ? 1.4 : Math.max(0.92, 1.12 - distance * 0.1);

          return (
            <motion.button
              key={item.id}
              className="relative flex flex-col items-center gap-0.5 cursor-pointer px-[3px] sm:px-0.5 shrink-0"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onTouchStart={() => setHoveredIndex(i)}
              onTouchEnd={() => { setTimeout(() => setHoveredIndex(null), 1500); }}
              onClick={(e) => { e.stopPropagation(); openWindow(item.id, item.label, ''); }}
              animate={{ scale }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              style={{ transformOrigin: 'bottom center' }}
            >
              <motion.div
                className={`${iconSize} rounded-full flex items-center justify-center transition-shadow shrink-0`}
                style={{
                  background: `linear-gradient(135deg, ${color}35, ${color}18)`,
                  boxShadow: isHovered ? `0 0 18px ${color}40` : 'none',
                }}
                whileTap={{ scale: 0.85 }}
              >
                <AppIcon id={item.id} size={20} className={iconInner} />
              </motion.div>

              <motion.div
                className="w-[3px] h-[3px] sm:w-[4px] sm:h-[4px] rounded-full"
                style={{ background: isOpen ? color : 'transparent' }}
                transition={{ duration: 0.2 }}
              />

              {isHovered && (
                <motion.div
                  className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-gray-900 text-white text-[11px] font-medium whitespace-nowrap pointer-events-none z-50 hidden sm:block"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.12 }}
                >
                  {item.label}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-900" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
