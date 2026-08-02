import { useCallback, useRef, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Minus, Square, X, Maximize2 } from 'lucide-react';
import type { WindowState } from '@/context/WindowContext';
import { useWindows } from '@/context/WindowContext';
import { AppIcon } from '@/components/ui/AppIcons';

interface ResizeHandle {
  cursor: string;
  onResize: (dx: number, dy: number, e: MouseEvent) => { w: number; h: number; x?: number; y?: number };
}

const WINDOW_ACCENTS: Record<string, string> = {
  about: '#6366f1',
  projects: '#8b5cf6',
  skills: '#06b6d4',
  experience: '#ec4899',
  education: '#f59e0b',
  resume: '#10b981',
  contact: '#f43f5e',
  terminal: '#22c55e',
};

const WINDOW_GRADIENTS: Record<string, string> = {
  about: 'from-indigo-500/5 via-indigo-500/2 to-transparent',
  projects: 'from-purple-500/5 via-purple-500/2 to-transparent',
  skills: 'from-cyan-500/5 via-cyan-500/2 to-transparent',
  experience: 'from-pink-500/5 via-pink-500/2 to-transparent',
  education: 'from-amber-500/5 via-amber-500/2 to-transparent',
  resume: 'from-emerald-500/5 via-emerald-500/2 to-transparent',
  contact: 'from-rose-500/5 via-rose-500/2 to-transparent',
  terminal: 'from-green-500/3 via-green-500/1 to-transparent',
};

export function Window({ win, children }: { win: WindowState; children: ReactNode }) {
  const { closeWindow, toggleMinimize, toggleMaximize, focusWindow, updatePosition, updateSize, getHighestZ } = useWindows();
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);

  const accent = WINDOW_ACCENTS[win.id] || '#6366f1';
  const gradient = WINDOW_GRADIENTS[win.id] || 'from-indigo-500/10 via-indigo-500/5 to-transparent';
  const isTopWindow = win.zIndex === getHighestZ();

  const resizeHandles: ResizeHandle[] = [
    {
      cursor: 'se-resize',
      onResize: (dx, dy) => ({ w: win.size.width + dx, h: win.size.height + dy }),
    },
    {
      cursor: 'e-resize',
      onResize: (dx) => ({ w: win.size.width + dx, h: win.size.height }),
    },
    {
      cursor: 's-resize',
      onResize: (_, dy) => ({ w: win.size.width, h: win.size.height + dy }),
    },
    {
      cursor: 'sw-resize',
      onResize: (dx, dy) => ({
        w: win.size.width - dx,
        h: win.size.height + dy,
        x: win.position.x + dx,
      }),
    },
  ];

  const handleResizeStart = useCallback((handle: ResizeHandle) => {
    const onMouseMove = (e: MouseEvent) => {
      const result = handle.onResize(e.movementX, e.movementY, e);
      updateSize(win.id, result.w, result.h);
      if (result.x !== undefined || result.y !== undefined) {
        updatePosition(win.id, result.x ?? win.position.x, result.y ?? win.position.y);
      }
    };
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [win.id, win.position, win.size, updateSize, updatePosition]);

  const handleTitleMouseDown = useCallback((e: React.MouseEvent) => {
    if (win.isMaximized) return;
    if ((e.target as HTMLElement).closest('button')) return;
    e.preventDefault();
    dragStartRef.current = { x: e.clientX - win.position.x, y: e.clientY - win.position.y };

    const onMouseMove = (me: MouseEvent) => {
      if (!dragStartRef.current) return;
      const newX = Math.max(-100, me.clientX - dragStartRef.current.x);
      const newY = Math.max(-20, me.clientY - dragStartRef.current.y);
      updatePosition(win.id, newX, newY);
    };
    const onMouseUp = () => {
      dragStartRef.current = null;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [win.id, win.isMaximized, win.position, updatePosition]);

  return (
    <motion.div
      className="fixed"
      style={{
        left: 0,
        top: 0,
        zIndex: win.zIndex,
        width: win.isMaximized ? '100vw' : win.size.width,
        height: win.isMaximized ? 'calc(100vh - 48px)' : win.size.height,
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: win.isMaximized ? 0 : win.position.x,
        y: win.isMaximized ? 0 : win.position.y,
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      onMouseDown={() => focusWindow(win.id)}
    >
      <div
        className="glass rounded-xl overflow-hidden flex flex-col h-full relative"
        style={{
          boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
          borderColor: isTopWindow ? `${accent}30` : 'rgba(255,255,255,0.08)',
        }}
      >
        {/* Accent gradient overlay */}
        <div className={`absolute inset-0 pointer-events-none bg-gradient-to-b ${gradient} rounded-xl`} />

        {/* Title Bar - draggable */}
        <div
          className="h-10 flex items-center px-3 gap-2 select-none shrink-0 border-b border-white/[0.06] relative"
          style={{ cursor: win.isMaximized ? 'default' : 'grab' }}
          onMouseDown={handleTitleMouseDown}
          onDoubleClick={() => toggleMaximize(win.id)}
        >
          {/* Accent bar on title */}
          {isTopWindow && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[2px]"
              style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
              layoutId="accent-bar"
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
          )}

          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div
              className="w-5 h-5 rounded flex items-center justify-center shrink-0"
              style={{ background: `${accent}25` }}
            >
              <AppIcon id={win.id} size={12} />
            </div>
            <span className="text-xs font-medium text-white/80 truncate">{win.title}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              className="w-7 h-7 rounded-md flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); toggleMinimize(win.id); }}
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              className="w-7 h-7 rounded-md flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); toggleMaximize(win.id); }}
            >
              {win.isMaximized ? <Square className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
            </button>
            <button
              className="w-7 h-7 rounded-md flex items-center justify-center text-white/50 hover:bg-red-500/20 hover:text-red-400 transition-colors"
              onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto min-h-0 relative z-10">
          {children}
        </div>

        {/* Resize handles (only when not maximized) */}
        {!win.isMaximized && (
          <>
            <div
              className="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize z-20"
              onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); handleResizeStart(resizeHandles[0]); }}
            />
            <div
              className="absolute top-0 bottom-0 right-0 w-2 cursor-e-resize z-20"
              onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); handleResizeStart(resizeHandles[1]); }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-2 cursor-s-resize z-20"
              onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); handleResizeStart(resizeHandles[2]); }}
            />
            <div
              className="absolute bottom-0 left-0 w-5 h-5 cursor-sw-resize z-20"
              onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); handleResizeStart(resizeHandles[3]); }}
            />
          </>
        )}
      </div>
    </motion.div>
  );
}
