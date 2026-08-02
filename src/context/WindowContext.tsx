import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export interface WindowState {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  previousBounds?: { x: number; y: number; width: number; height: number };
  zIndex: number;
}

interface WindowContextType {
  windows: Map<string, WindowState>;
  openWindow: (id: string, title: string, icon: string) => void;
  closeWindow: (id: string) => void;
  toggleMinimize: (id: string) => void;
  toggleMaximize: (id: string) => void;
  focusWindow: (id: string) => void;
  updatePosition: (id: string, x: number, y: number) => void;
  updateSize: (id: string, width: number, height: number) => void;
  getHighestZ: () => number;
}

const WindowContext = createContext<WindowContextType | null>(null);

const getDefaultSize = () => ({ width: Math.min(800, (typeof window !== 'undefined' ? window.innerWidth : 1200) - 40), height: Math.min(520, (typeof window !== 'undefined' ? window.innerHeight : 800) - 120) });

export function WindowProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<Map<string, WindowState>>(new Map());
  const [zCounter, setZCounter] = useState(10);

  const getHighestZ = useCallback(() => zCounter, [zCounter]);

  const focusWindow = useCallback((id: string) => {
    setZCounter(prev => prev + 1);
    setWindows(prev => {
      const next = new Map(prev);
      const win = next.get(id);
      if (win) {
        next.set(id, { ...win, zIndex: zCounter + 1, isMinimized: false });
      }
      return next;
    });
  }, [zCounter]);

  const openWindow = useCallback((id: string, title: string, icon: string) => {
    setZCounter(prev => prev + 1);
    setWindows(prev => {
      const next = new Map(prev);
      const existing = next.get(id);
      if (existing) {
        next.set(id, { ...existing, isOpen: true, isMinimized: false, zIndex: zCounter + 1 });
      } else {
        const x = 60 + (next.size * 30) % 200;
        const y = 40 + (next.size * 20) % 150;
        const ds = getDefaultSize();
        next.set(id, {
          id, title, icon,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          position: { x: Math.min(x, (typeof window !== 'undefined' ? window.innerWidth : 1200) - ds.width - 20), y },
          size: ds,
          zIndex: zCounter + 1,
        });
      }
      return next;
    });
  }, [zCounter]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => {
      const next = new Map(prev);
      const win = next.get(id);
      if (win) next.set(id, { ...win, isOpen: false });
      return next;
    });
  }, []);

  const toggleMinimize = useCallback((id: string) => {
    setWindows(prev => {
      const next = new Map(prev);
      const win = next.get(id);
      if (win) next.set(id, { ...win, isMinimized: !win.isMinimized });
      return next;
    });
  }, []);

  const toggleMaximize = useCallback((id: string) => {
    setWindows(prev => {
      const next = new Map(prev);
      const win = next.get(id);
      if (win) {
        if (win.isMaximized) {
          const ds = getDefaultSize();
          const pb = win.previousBounds || { x: 60, y: 40, width: ds.width, height: ds.height };
          next.set(id, {
            ...win,
            isMaximized: false,
            position: { x: pb.x, y: pb.y },
            size: { width: pb.width, height: pb.height },
            previousBounds: undefined,
          });
        } else {
          next.set(id, {
            ...win,
            isMaximized: true,
            previousBounds: { x: win.position.x, y: win.position.y, width: win.size.width, height: win.size.height },
            position: { x: 0, y: 0 },
            size: { width: typeof window !== 'undefined' ? window.innerWidth : 1200, height: typeof window !== 'undefined' ? window.innerHeight - 52 : 700 },
          });
        }
      }
      return next;
    });
  }, []);

  const updatePosition = useCallback((id: string, x: number, y: number) => {
    setWindows(prev => {
      const next = new Map(prev);
      const win = next.get(id);
      if (win && !win.isMaximized) next.set(id, { ...win, position: { x, y } });
      return next;
    });
  }, []);

  const updateSize = useCallback((id: string, width: number, height: number) => {
    setWindows(prev => {
      const next = new Map(prev);
      const win = next.get(id);
      if (win && !win.isMaximized) {
        next.set(id, { ...win, size: { width: Math.max(300, width), height: Math.max(220, height) } });
      }
      return next;
    });
  }, []);

  return (
    <WindowContext.Provider value={{
      windows, openWindow, closeWindow, toggleMinimize, toggleMaximize,
      focusWindow, updatePosition, updateSize, getHighestZ,
    }}>
      {children}
    </WindowContext.Provider>
  );
}

export function useWindows() {
  const ctx = useContext(WindowContext);
  if (!ctx) throw new Error('useWindows must be used within WindowProvider');
  return ctx;
}
