import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

interface Command {
  id: string;
  label: string;
  description: string;
  action: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onOpenWindow,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenWindow: (id: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = [
    ...portfolioData.desktopIcons.map(d => ({
      id: d.id,
      label: d.label,
      description: `Open ${d.label} window`,
      action: () => onOpenWindow(d.id),
    })),
    { id: 'github', label: 'GitHub Profile', description: portfolioData.github, action: () => window.open(portfolioData.github, '_blank') },
    { id: 'linkedin', label: 'LinkedIn', description: portfolioData.linkedin, action: () => window.open(portfolioData.linkedin, '_blank') },
    { id: 'email', label: 'Send Email', description: portfolioData.email, action: () => window.open(`mailto:${portfolioData.email}`, '_blank') },
  ];

  const filtered = commands.filter(
    c => c.label.toLowerCase().includes(query.toLowerCase()) ||
         c.description.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  }, [filtered, selectedIndex, onClose]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[560px] max-w-[90vw] z-[9001]"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            <div className="glass rounded-xl overflow-hidden shadow-2xl glow-indigo">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
                <Search className="w-4 h-4 text-white/40" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search apps, links..."
                  className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/40"
                />
                <kbd className="text-[10px] text-white/40 bg-white/5 px-1.5 py-0.5 rounded font-mono">ESC</kbd>
              </div>
              <div className="max-h-64 overflow-y-auto p-2">
                {filtered.length === 0 ? (
                  <div className="text-center text-white/50 text-sm py-8">No results found</div>
                ) : (
                  filtered.map((cmd, i) => (
                    <motion.button
                      key={cmd.id}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                        i === selectedIndex
                          ? 'bg-white/10 text-white'
                          : 'text-white/60 hover:bg-white/5 hover:text-white/80'
                      }`}
                      onClick={() => { cmd.action(); onClose(); }}
                      onMouseEnter={() => setSelectedIndex(i)}
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.1 }}
                    >
                      <span className="text-sm flex-1">{cmd.label}</span>
                      <span className="text-xs text-white/50 font-mono truncate max-w-[200px]">{cmd.description}</span>
                      {i === selectedIndex && <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0" />}
                    </motion.button>
                  ))
                )}
              </div>
              <div className="px-3 py-2 border-t border-white/[0.06] flex gap-3 text-[10px] text-white/40 font-mono">
                <span>↑↓ Navigate</span>
                <span>↵ Open</span>
                <span>Esc Close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
