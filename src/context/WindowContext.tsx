import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export interface WindowState {
  id: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  previousBounds?: { position: { x: number; y: number }; size: { width: number; height: number } };
}

interface WindowContextType {
  windows: Map<string, WindowState>;
  openWindow: (id: string, defaultSize: { width: number; height: number }) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximize: (id: string) => void;
  focusWindow: (id: string) => void;
  updatePosition: (id: string, position: { x: number; y: number }) => void;
  updateSize: (id: string, size: { width: number; height: number }) => void;
  activeWindowId: string | null;
}

const WindowContext = createContext<WindowContextType | null>(null);

let globalZIndex = 10;

function isMobile() {
  return window.innerWidth < 640;
}

export function WindowProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<Map<string, WindowState>>(new Map());
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);

  const openWindow = useCallback((id: string, defaultSize: { width: number; height: number }) => {
    setWindows(prev => {
      const next = new Map(prev);
      const existing = next.get(id);
      
      if (existing) {
        if (existing.isMinimized) {
          next.set(id, { ...existing, isMinimized: false, zIndex: ++globalZIndex });
          setActiveWindowId(id);
          return next;
        }
        next.set(id, { ...existing, zIndex: ++globalZIndex });
        setActiveWindowId(id);
        return next;
      }

      const mobile = isMobile();
      const maxW = mobile ? window.innerWidth : window.innerWidth - 40;
      const maxH = window.innerHeight - 80;
      
      let w, h, x, y;
      
      if (mobile) {
        w = window.innerWidth;
        h = window.innerHeight - 80;
        x = 0;
        y = 0;
      } else {
        w = Math.min(defaultSize.width, maxW);
        h = Math.min(defaultSize.height, maxH);
        // Stagger window positions slightly
        const openCount = Array.from(next.values()).filter(w => w.isOpen && !w.isMinimized).length;
        x = Math.max(10, Math.min(window.innerWidth - w - 20, 40 + openCount * 30));
        y = Math.max(10, Math.min(window.innerHeight - h - 60, 30 + openCount * 25));
      }

      next.set(id, {
        id,
        isOpen: true,
        isMinimized: false,
        isMaximized: mobile,
        zIndex: ++globalZIndex,
        position: { x, y },
        size: { width: w, height: h },
      });
      setActiveWindowId(id);
      return next;
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => {
      const next = new Map(prev);
      next.delete(id);
      if (activeWindowId === id) {
        const remaining = Array.from(next.values()).filter(w => !w.isMinimized);
        setActiveWindowId(remaining.length > 0 ? remaining[remaining.length - 1].id : null);
      }
      return next;
    });
  }, [activeWindowId]);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => {
      const next = new Map(prev);
      const win = next.get(id);
      if (win) {
        next.set(id, { ...win, isMinimized: true });
        const visible = Array.from(next.values()).filter(w => w.isOpen && !w.isMinimized);
        if (activeWindowId === id) {
          setActiveWindowId(visible.length > 0 ? visible[visible.length - 1].id : null);
        }
      }
      return next;
    });
  }, [activeWindowId]);

  const toggleMaximize = useCallback((id: string) => {
    setWindows(prev => {
      const next = new Map(prev);
      const win = next.get(id);
      if (win) {
        if (win.isMaximized) {
          const prevBounds = win.previousBounds;
          next.set(id, {
            ...win,
            isMaximized: false,
            position: prevBounds?.position ?? { x: 60, y: 40 },
            size: prevBounds?.size ?? { width: 600, height: 450 },
            previousBounds: undefined,
            zIndex: ++globalZIndex,
          });
        } else {
          next.set(id, {
            ...win,
            isMaximized: true,
            previousBounds: { position: { ...win.position }, size: { ...win.size } },
            position: { x: 0, y: 0 },
            size: { width: window.innerWidth, height: window.innerHeight - 48 },
            zIndex: ++globalZIndex,
          });
        }
        setActiveWindowId(id);
      }
      return next;
    });
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows(prev => {
      const next = new Map(prev);
      const win = next.get(id);
      if (win) {
        next.set(id, { ...win, zIndex: ++globalZIndex, isMinimized: false });
      }
      return next;
    });
    setActiveWindowId(id);
  }, []);

  const updatePosition = useCallback((id: string, position: { x: number; y: number }) => {
    setWindows(prev => {
      const next = new Map(prev);
      const win = next.get(id);
      if (win && !win.isMaximized) {
        next.set(id, { ...win, position });
      }
      return next;
    });
  }, []);

  const updateSize = useCallback((id: string, size: { width: number; height: number }) => {
    setWindows(prev => {
      const next = new Map(prev);
      const win = next.get(id);
      if (win && !win.isMaximized) {
        next.set(id, { ...win, size: { width: Math.max(320, size.width), height: Math.max(240, size.height) } });
      }
      return next;
    });
  }, []);

  return (
    <WindowContext.Provider value={{
      windows,
      openWindow,
      closeWindow,
      minimizeWindow,
      toggleMaximize,
      focusWindow,
      updatePosition,
      updateSize,
      activeWindowId,
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
