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

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const closeContextMenu = useCallback(() => setContextMenu(null), []);

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
      onClick={closeContextMenu}
    >
      {/* Desktop gradient background */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0a1e] via-[#1a0a2e] to-[#0a0a1a]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-pink-800/15" />
      </div>

      {/* Animated dotted background */}
      <DottedSurface isDark />

      {/* Gradient ambient overlays */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div className="absolute top-[-20%] left-[-15%] w-[600px] h-[600px] rounded-full bg-purple-500/[0.07] blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-pink-500/[0.06] blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-indigo-500/[0.05] blur-[100px]" />
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
