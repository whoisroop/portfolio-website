import { Minus, Square, X } from 'lucide-react';
import { useWindows } from '@/context/WindowContext';
import type { ComponentType } from 'react';

interface TitleBarProps {
  windowId: string;
  title: string;
  accentColor: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: ComponentType<any>;
}

export function TitleBar({ windowId, title, accentColor, icon: Icon }: TitleBarProps) {
  const { closeWindow, minimizeWindow, toggleMaximize } = useWindows();

  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 select-none shrink-0 rounded-t-xl"
      style={{ 
        background: `linear-gradient(135deg, ${accentColor}18, ${accentColor}08)`,
        borderBottom: `1px solid ${accentColor}30`
      }}
    >
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <div style={{ color: accentColor }} className="shrink-0">
          <Icon size={14} />
        </div>
        <span className="text-xs font-semibold tracking-wide truncate" style={{ color: `${accentColor}CC` }}>
          {title}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <TitleBarButton onClick={() => minimizeWindow(windowId)} color="#F59E0B" hoverColor="#FBBF24">
          <Minus size={10} strokeWidth={3} />
        </TitleBarButton>
        <TitleBarButton onClick={() => toggleMaximize(windowId)} color="#10B981" hoverColor="#34D399">
          <Square size={9} strokeWidth={3} />
        </TitleBarButton>
        <TitleBarButton onClick={() => closeWindow(windowId)} color="#EF4444" hoverColor="#F87171">
          <X size={10} strokeWidth={3} />
        </TitleBarButton>
      </div>
    </div>
  );
}

function TitleBarButton({ 
  children, 
  onClick, 
  color, 
  hoverColor 
}: { 
  children: React.ReactNode; 
  onClick: (e: React.MouseEvent) => void; 
  color: string; 
  hoverColor: string;
}) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(e); }}
      className="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-90"
      style={{ backgroundColor: `${color}30`, border: `1px solid ${color}50` }}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = `${hoverColor}40`;
        e.currentTarget.style.borderColor = hoverColor;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = `${color}30`;
        e.currentTarget.style.borderColor = `${color}50`;
      }}
    >
      <span style={{ color }}>{children}</span>
    </button>
  );
}
