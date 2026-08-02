import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Cpu } from 'lucide-react';
import { preloadIcons } from '@/components/ui/FlaticonIcons';

interface BootScreenProps {
  onComplete: () => void;
}

const bootMessages = [
  'Initializing system...',
  'Loading kernel modules...',
  'Starting window manager...',
  'Mounting filesystems...',
  'Loading user profile...',
  'Initializing network stack...',
  'Starting desktop environment...',
  'Ready.',
];

export function BootScreen({ onComplete }: BootScreenProps) {
  const [stage, setStage] = useState(0);
  const [showLogo, setShowLogo] = useState(true);

  // Preload all Flaticon icons while boot animation plays
  useEffect(() => { preloadIcons(); }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage(prev => {
        if (prev >= bootMessages.length) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return prev;
        }
        return prev + 1;
      });
    }, 200);

    const logoTimer = setTimeout(() => setShowLogo(false), 600);

    return () => {
      clearInterval(timer);
      clearTimeout(logoTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[99999] flex items-center justify-center
                   bg-gray-950"
      >
        <div className="text-center space-y-6">
          <motion.div
            animate={showLogo ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center gap-3"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600
                           flex items-center justify-center shadow-2xl">
              <Monitor size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Portfolio</h1>
              <p className="text-sm text-purple-400 font-medium">Operating System</p>
            </div>
          </motion.div>

          <div className="space-y-2 w-64">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400 flex items-center gap-1.5">
                <Cpu size={12} className="text-purple-400" />
                Booting...
              </span>
              <span className="text-gray-500">{Math.round((stage / bootMessages.length) * 100)}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
                animate={{ width: `${(stage / bootMessages.length) * 100}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <div className="h-20 overflow-hidden">
              {bootMessages.slice(0, stage).map((msg, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-[11px] text-gray-500 font-mono text-left"
                >
                  <span className="text-green-500">✓</span> {msg}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
