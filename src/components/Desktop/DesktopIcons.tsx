import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { useWindows } from '@/context/WindowContext';
import { AppIcon, DESKTOP_ICON_COLORS } from '@/components/ui/AppIcons';

interface IconPosition { x: number; y: number; }
const INITIAL_POSITIONS: IconPosition[] = [
  { x: 8, y: 16 }, { x: 88, y: 16 }, { x: 8, y: 110 }, { x: 88, y: 110 },
  { x: 8, y: 204 }, { x: 88, y: 204 }, { x: 8, y: 298 }, { x: 88, y: 298 },
];

export function DesktopIcons() {
  const { openWindow } = useWindows();
  const [positions, setPositions] = useState<IconPosition[]>(() => { try { const saved = localStorage.getItem('portfolio-os-icon-positions'); if (saved) return JSON.parse(saved); } catch {} return INITIAL_POSITIONS; });
  const [dragging, setDragging] = useState<number | null>(null);
  const dragStart = useRef<{ mx: number; my: number; ix: number; iy: number } | null>(null);
  const hasDragged = useRef(false);

  const handlePointerDown = useCallback((e: React.PointerEvent, i: number) => {
    hasDragged.current = false; dragStart.current = { mx: e.clientX, my: e.clientY, ix: positions[i].x, iy: positions[i].y }; setDragging(i); (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [positions]);
  const handlePointerMove = useCallback((e: React.PointerEvent, i: number) => {
    if (dragging !== i || !dragStart.current) return; const dx = e.clientX - dragStart.current.mx; const dy = e.clientY - dragStart.current.my; if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasDragged.current = true;
    const newPositions = [...positions]; newPositions[i] = { x: Math.max(0, Math.min(window.innerWidth - 100, dragStart.current.ix + dx)), y: Math.max(0, Math.min(window.innerHeight - 120, dragStart.current.iy + dy)) }; setPositions(newPositions);
  }, [dragging, positions]);
  const handlePointerUp = useCallback((e: React.PointerEvent, _i: number) => {
    (e.target as HTMLElement).releasePointerCapture(e.pointerId); setDragging(null); dragStart.current = null; localStorage.setItem('portfolio-os-icon-positions', JSON.stringify([...positions]));
  }, [positions]);
  const handleClick = useCallback((_e: React.MouseEvent, iconId: string, iconLabel: string) => { if (hasDragged.current) return; openWindow(iconId, iconLabel, ''); }, [openWindow]);
  const handleDoubleClick = useCallback((iconId: string, iconLabel: string) => { openWindow(iconId, iconLabel, ''); }, [openWindow]);

  return (<>
    {portfolioData.desktopIcons.map((icon, i) => {
      const color = DESKTOP_ICON_COLORS[icon.id] || '#6366f1';
      return (
        <motion.div key={icon.id} className="absolute z-10" style={{ left: positions[i]?.x ?? INITIAL_POSITIONS[i].x, top: positions[i]?.y ?? INITIAL_POSITIONS[i].y, zIndex: dragging === i ? 100 : 10 }}
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: dragging === i ? 1.08 : 1 }} transition={{ opacity: { delay: 0.06 * i, duration: 0.3 }, scale: { duration: 0.15 } }}
          onPointerDown={(e) => handlePointerDown(e, i)} onPointerMove={(e) => handlePointerMove(e, i)} onPointerUp={(e) => handlePointerUp(e, i)}>
          <button className="group flex flex-col items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 rounded-xl cursor-pointer w-[72px] sm:w-[88px]" onClick={(e) => handleClick(e, icon.id, icon.label)} onDoubleClick={() => handleDoubleClick(icon.id, icon.label)} style={{ touchAction: 'none' }}>
            <div className="relative">
              <div className={`absolute -inset-1.5 rounded-2xl transition-colors ${dragging === i ? 'bg-white/10' : 'group-hover:bg-white/5'}`} />
              <div
                className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${color}35, ${color}18)`,
                  boxShadow: `0 4px 12px ${color}25`,
                }}
              >
                <AppIcon id={icon.id} size={20} className="sm:size-[24px]" />
              </div>
            </div>
            <span className="relative text-[10px] sm:text-[11px] text-white/80 text-center leading-tight font-medium max-w-[64px] sm:max-w-[80px] break-words group-hover:text-white transition-colors line-clamp-2" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>{icon.label}</span>
          </button>
        </motion.div>
      );
    })}
  </>);
}
