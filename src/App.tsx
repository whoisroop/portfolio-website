import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { WindowProvider, useWindows } from '@/context/WindowContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { DesktopIcons } from '@/components/Desktop/DesktopIcons';
import { ContextMenu } from '@/components/Desktop/ContextMenu';
import { Taskbar } from '@/components/Taskbar/Taskbar';
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

function Desktop() {
  const { windows } = useWindows();
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setContextMenu(null);
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const renderWindowContent = (windowId: string) => {
    switch (windowId) {
      case 'about': return <AboutWindow />;
      case 'projects': return <ProjectsWindow />;
      case 'skills': return <SkillsWindow />;
      case 'experience': return <ExperienceWindow />;
      case 'education': return <EducationWindow />;
      case 'resume': return <ResumeWindow />;
      case 'contact': return <ContactWindow />;
      case 'terminal': return <TerminalWindow />;
      default: return null;
    }
  };

  return (
    <div
      className="relative w-screen h-screen overflow-hidden select-none"
      onContextMenu={handleContextMenu}
    >
      {/* Wallpaper */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400
                      dark:from-gray-950 dark:via-indigo-950 dark:to-purple-950" />
      
      {/* Ambient particles overlay */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none"
           style={{
             backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.3) 1px, transparent 1px), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.2) 1px, transparent 1px)',
             backgroundSize: '60px 60px, 80px 80px',
             backgroundPosition: '0 0, 40px 40px',
           }} />

      <DesktopIcons />

      <AnimatePresence>
        {Array.from(windows.values()).map(win => (
          win.isOpen && !win.isMinimized && (
            <Window key={win.id} win={win}>
              {renderWindowContent(win.id)}
            </Window>
          )
        ))}
      </AnimatePresence>

      <Taskbar />

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
        />
      )}

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </div>
  );
}

function AppContent() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!booted && <BootScreen onComplete={() => setBooted(true)} />}
      </AnimatePresence>
      {booted && <Desktop />}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <WindowProvider>
        <AppContent />
      </WindowProvider>
    </ThemeProvider>
  );
}
