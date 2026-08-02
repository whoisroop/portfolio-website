import { useRef, useCallback, useEffect, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useWindows, type WindowState } from '@/context/WindowContext';
import { useTheme } from '@/context/ThemeContext';
import { TitleBar } from '@/components/ui/TitleBar';
import { windowMeta } from '@/data/portfolio';

interface WindowProps {
  win: WindowState;
  children: ReactNode;
}

const RESIZE_HANDLE_SIZE = 8;
type ResizeDir = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export function Window({ win, children }: WindowProps) {
  const { focusWindow, updatePosition, updateSize, activeWindowId, closeWindow } = useWindows();
  const meta = windowMeta[win.id];
  const { theme } = useTheme();
  const isActive = activeWindowId === win.id;
  const isDark = theme === 'dark';
  const resizeRef = useRef<ResizeDir | null>(null);
  const resizeStartRef = useRef({ x: 0, y: 0, w: 0, h: 0 });

  const handlePointerDown = useCallback(() => {
    focusWindow(win.id);
  }, [focusWindow, win.id]);

  // Drag: we use x/y animate props managed by Framer Motion, not left/top CSS.
  // This avoids the translate-vs-left/top conflict.
  // During drag, Framer Motion updates x/y via CSS translate internally.
  // On drag end, we persist the final position to state.
  const handleDragEnd = useCallback((_: unknown, info: { offset: { x: number; y: number } }) => {
    if (win.isMaximized) return;
    updatePosition(win.id, {
      x: Math.max(0, win.position.x + info.offset.x),
      y: Math.max(0, win.position.y + info.offset.y),
    });
  }, [win.id, win.position, win.isMaximized, updatePosition]);

  const handleResizeStart = useCallback((dir: ResizeDir, e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    resizeRef.current = dir;
    resizeStartRef.current = { x: e.clientX, y: e.clientY, w: win.size.width, h: win.size.height };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [win.size]);

  const handleResizeMove = useCallback((e: React.PointerEvent) => {
    if (!resizeRef.current) return;
    const dir = resizeRef.current;
    const dx = e.clientX - resizeStartRef.current.x;
    const dy = e.clientY - resizeStartRef.current.y;
    let newW = resizeStartRef.current.w;
    let newH = resizeStartRef.current.h;
    if (dir.includes('e')) newW += dx;
    if (dir.includes('w')) newW -= dx;
    if (dir.includes('s')) newH += dy;
    if (dir.includes('n')) newH -= dy;
    updateSize(win.id, { width: newW, height: newH });
  }, [win.id, updateSize]);

  const handleResizeEnd = useCallback(() => {
    resizeRef.current = null;
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isActive) closeWindow(win.id);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isActive, closeWindow, win.id]);

  if (!meta) return null;

  const bgColor = isDark
    ? (isActive ? 'rgba(25,25,40,0.92)' : 'rgba(22,22,35,0.87)')
    : (isActive ? 'rgba(255,255,255,0.80)' : 'rgba(255,255,255,0.67)');

  const borderColor = isDark
    ? (isActive ? `${meta.accentColor}55` : 'rgba(255,255,255,0.10)')
    : (isActive ? `${meta.accentColor}40` : 'rgba(255,255,255,0.25)');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: win.isMaximized ? 0 : win.position.x,
        y: win.isMaximized ? 0 : win.position.y,
      }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
      // Use x/y drag so Framer Motion owns the coordinate system
      drag={!win.isMaximized}
      dragMomentum={false}
      dragElastic={0}
      onDragEnd={handleDragEnd}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: win.isMaximized ? '100vw' : win.size.width,
        height: win.isMaximized ? 'calc(100vh - 48px)' : win.size.height,
        zIndex: win.zIndex,
      }}
      className="rounded-xl"
      onPointerDown={handlePointerDown}
    >
      <div
        className="w-full h-full rounded-xl overflow-hidden flex flex-col"
        style={{
          background: bgColor,
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: `1px solid ${borderColor}`,
          boxShadow: isActive
            ? `0 25px 60px rgba(0,0,0,0.15), 0 0 0 1px ${meta.accentColor}15 inset`
            : '0 10px 30px rgba(0,0,0,0.08)',
        }}
      >
        <div className="shrink-0" style={{ touchAction: 'none' }}>
          <TitleBar
            windowId={win.id}
            title={meta.title}
            accentColor={meta.accentColor}
            icon={meta.icon}
          />
        </div>

        <div className="flex-1 overflow-auto">
          {children}
        </div>

        {!win.isMaximized && (
          <>
            {(['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'] as ResizeDir[]).map(dir => (
              <div
                key={dir}
                className="absolute z-[100]"
                style={getResizeHandleStyle(dir, RESIZE_HANDLE_SIZE)}
                onPointerDown={(e) => handleResizeStart(dir, e)}
                onPointerMove={handleResizeMove}
                onPointerUp={handleResizeEnd}
              />
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
}

function getResizeHandleStyle(dir: ResizeDir, size: number): React.CSSProperties {
  switch (dir) {
    case 'n': return { top: 0, left: size, right: size, height: size, cursor: 'n-resize' };
    case 's': return { bottom: 0, left: size, right: size, height: size, cursor: 's-resize' };
    case 'e': return { right: 0, top: size, bottom: size, width: size, cursor: 'e-resize' };
    case 'w': return { left: 0, top: size, bottom: size, width: size, cursor: 'w-resize' };
    case 'ne': return { top: 0, right: 0, width: size + 4, height: size + 4, cursor: 'ne-resize' };
    case 'nw': return { top: 0, left: 0, width: size + 4, height: size + 4, cursor: 'nw-resize' };
    case 'se': return { bottom: 0, right: 0, width: size + 4, height: size + 4, cursor: 'se-resize' };
    case 'sw': return { bottom: 0, left: 0, width: size + 4, height: size + 4, cursor: 'sw-resize' };
  }
}
