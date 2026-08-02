import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { portfolioData, ALL_ICON_URLS } from '@/data/portfolio';

const BOOT_STAGES = [
  'Initializing system...',
  'Loading kernel modules...',
  'Mounting filesystems...',
  'Starting network services...',
  'Loading desktop environment...',
  'Preloading assets...',
  'Configuring compositor...',
  'Starting display manager...',
];

export function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const preloaded = useRef(false);
  const completed = useRef(false);

  useEffect(() => {
    if (!preloaded.current) {
      preloaded.current = true;
      ALL_ICON_URLS.forEach(url => {
        const img = new Image();
        img.src = url;
      });
    }

    const totalDuration = 3000;
    const stageInterval = totalDuration / BOOT_STAGES.length;
    let currentStage = 0;

    const stageTimer = setInterval(() => {
      currentStage++;
      if (currentStage < BOOT_STAGES.length) {
        setStage(currentStage);
      }
    }, stageInterval);

    const startTime = Date.now();
    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / totalDuration) * 100));
      setProgress(pct);

      if (pct >= 100 && !completed.current) {
        completed.current = true;
        clearInterval(progressTimer);
        clearInterval(stageTimer);
        setStage(BOOT_STAGES.length - 1);
        setProgress(100);

        setTimeout(() => {
          setExiting(true);
          setTimeout(() => {
            onComplete();
          }, 600);
        }, 500);
      }
    }, 50);

    return () => {
      clearInterval(stageTimer);
      clearInterval(progressTimer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050510] overflow-hidden"
      animate={exiting ? { opacity: 0, scale: 1.02 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/[0.04] blur-[120px]" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-purple-500/[0.03] blur-[100px]" />
      </div>

      {/* Animated ring */}
      <motion.div
        className="absolute"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-[300px] h-[300px] rounded-full border border-indigo-500/10" />
      </motion.div>
      <motion.div
        className="absolute"
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-[240px] h-[240px] rounded-full border border-purple-500/8" />
      </motion.div>

      <div className="relative flex flex-col items-center gap-6 z-10">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <motion.div
            className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl shadow-indigo-500/30"
            animate={{
              boxShadow: [
                '0 0 40px rgba(99,102,241,0.3)',
                '0 0 60px rgba(139,92,246,0.4)',
                '0 0 40px rgba(99,102,241,0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg className="w-11 h-11 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8" />
              <path d="M12 17v4" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Title */}
        <div className="text-center">
          <motion.h1
            className="text-3xl font-bold text-white tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {portfolioData.name}
          </motion.h1>
          <motion.p
            className="text-sm text-white/40 mt-2 font-mono tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            PORTFOLIO OS <span className="text-indigo-400">v3.0</span>
          </motion.p>
        </div>

        {/* Progress bar */}
        <div className="w-72">
          <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <motion.p
              key={stage}
              className="text-[11px] text-white/35 font-mono"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {BOOT_STAGES[stage] || BOOT_STAGES[BOOT_STAGES.length - 1]}
            </motion.p>
            <span className="text-[11px] text-white/25 font-mono">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Bottom hint */}
      <motion.p
        className="absolute bottom-8 text-[10px] text-white/15 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Press Ctrl+K to search anytime
      </motion.p>
    </motion.div>
  );
}
