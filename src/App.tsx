import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { WindowProvider, useWindows } from '@/context/WindowContext';

import { DottedSurface } from '@/components/ui/DottedSurface';
import { DesktopIcons } from '@/components/Desktop/DesktopIcons';
import { ContextMenu } from '@/components/Desktop/ContextMenu';
import { Taskbar } from '@/components/Taskbar/Taskbar';
import { Dock } from '@/components/Taskbar/Dock';
import { Window } from '@/components/WindowManager/Window';
import { BootScreen } from '@/components/overlays/BootScreen';
import { CommandPalette } from '@/components/overlays/CommandPalette';
import { AboutWindow } from '@/components/windows/AboutWindow';
import { ProjectsWindow } from '@/components/windows/ProjectsWindow';
import { SkillsWindow } from '@/components/windows/SkillsWindow';
import { ExperienceWindow } from '@/components/windows/ExperienceWindow';
import { EducationWindow } from '@/components/windows/EducationWindow';
import { ResumeWindow } from '@/components/windows/ResumeWindow';
import { ContactWindow } from '@/components/windows/ContactWindow';
import { TerminalWindow } from '@/components/windows/TerminalWindow';

const windowComponents: Record<string, React.ComponentType> = {
  about: AboutWindow,
  projects: ProjectsWindow,
  skills: SkillsWindow,
  experience: ExperienceWindow,
  education: EducationWindow,
  resume: ResumeWindow,
  contact: ContactWindow,
  terminal: TerminalWindow,
};

function Desktop() {
  const { windows, openWindow } = useWindows();
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const closeContextMenu = useCallback(() => setContextMenu(null), []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleOpenWindow = useCallback((id: string) => {
    const icon = windowComponents[id] ? id : 'about';
    openWindow(icon, icon.charAt(0).toUpperCase() + icon.slice(1), '');
  }, [openWindow]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const openWindows = Array.from(windows.values());

  return (
    <div
      className="relative w-screen h-screen overflow-hidden select-none"
      onContextMenu={handleContextMenu}
      onMouseMove={handleMouseMove}
      onClick={closeContextMenu}
    >
      {/* Desktop gradient background */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0718] via-[#140827] to-[#080716]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/25 via-transparent to-pink-800/15" />
        {/* Interactive Mouse Spotlight Aura */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.09), transparent 75%)`,
          }}
        />
      </div>

      {/* Animated 3D chromatic particle wave */}
      <DottedSurface isDark />

      {/* Gradient ambient light blooms */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div className="absolute top-[-20%] left-[-15%] w-[650px] h-[650px] rounded-full bg-purple-600/[0.08] blur-[130px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[550px] h-[550px] rounded-full bg-pink-500/[0.07] blur-[130px]" />
        <div className="absolute top-[35%] left-[50%] -translate-x-1/2 w-[650px] h-[320px] rounded-full bg-indigo-500/[0.06] blur-[110px]" />
      </div>

      {/* Desktop Icons */}
      <div className="relative z-10">
        <DesktopIcons />
      </div>

      {/* Windows */}
      <AnimatePresence>
        {openWindows.map(win => {
          if (!win.isOpen || win.isMinimized) return null;
          const ContentComponent = windowComponents[win.id];
          if (!ContentComponent) return null;
          return (
            <Window key={win.id} win={win}>
              <ContentComponent />
            </Window>
          );
        })}
      </AnimatePresence>

      {/* macOS-style Dock */}
      <Dock />

      {/* Taskbar */}
      <Taskbar onOpenPalette={() => setCommandPaletteOpen(true)} />

      {/* Context Menu */}
      <AnimatePresence>
        {contextMenu && (
          <ContextMenu x={contextMenu.x} y={contextMenu.y} onClose={closeContextMenu} />
        )}
      </AnimatePresence>

      {/* Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenWindow={handleOpenWindow}
      />
    </div>
  );
}

function AppContent() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted ? (
        <BootScreen onComplete={() => setBooted(true)} />
      ) : (
        <Desktop />
      )}
    </>
  );
}

export default function App() {
  return (
    <WindowProvider>
      <AppContent />
    </WindowProvider>
  );
}
