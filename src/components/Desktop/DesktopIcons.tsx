import { motion } from 'framer-motion';
import { useWindows } from '@/context/WindowContext';
import { portfolioData, windowMeta } from '@/data/portfolio';

export function DesktopIcons() {
  const { openWindow } = useWindows();

  return (
    <div className="absolute inset-0 top-0 left-0 p-3 sm:p-5 flex flex-col gap-1.5 sm:gap-2 flex-wrap 
                    content-start justify-start pointer-events-none"
         style={{ paddingBottom: '60px' }}>
      {portfolioData.desktopIcons.map((item, index) => (
        <motion.button
          key={item.id}
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: 0.6 + index * 0.1,
            type: 'spring',
            stiffness: 350,
            damping: 22
          }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            const meta = windowMeta[item.windowId];
            openWindow(item.windowId, { width: meta.width, height: meta.height });
          }}
          onDoubleClick={() => {
            const meta = windowMeta[item.windowId];
            openWindow(item.windowId, { width: meta.width, height: meta.height });
          }}
          className="pointer-events-auto flex flex-col items-center gap-1.5 w-[70px] sm:w-[78px] p-1.5
                     transition-all duration-150
                     focus:outline-none focus:ring-1 focus:ring-white/50 rounded-lg group"
        >
          {/* Icon image only — no colored background container */}
          <div className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center
                         drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)] 
                         group-hover:drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]
                         group-hover:scale-110 transition-transform duration-200">
            <item.icon size={40} />
          </div>
          <span className="text-[10px] sm:text-[11px] font-semibold text-center leading-tight
                          text-white/95 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]
                          group-hover:text-white group-hover:drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]
                          transition-all duration-150 px-0.5">
            {item.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
