import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';

const GREETINGS = ['Hello', 'Bonjour', 'Hola', 'Namaste', 'Ciao', '你好'];

function GreetingFlip() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(p => (p + 1) % GREETINGS.length), 450);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="inline-flex overflow-hidden align-bottom text-indigo-400">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={idx}
          className="flex whitespace-nowrap"
          initial={{ opacity: 0, y: 8, filter: 'blur(3px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -8, filter: 'blur(3px)' }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {GREETINGS[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// 24 Twinkling Cyber Stars
function Starfield() {
  const stars = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: `${(i * 13.7) % 100}%`,
      top: `${(i * 19.3) % 100}%`,
      size: (i % 3 === 0 ? 2.5 : i % 2 === 0 ? 1.8 : 1.2),
      duration: 2.5 + (i % 4) * 0.8,
      delay: (i * 0.3) % 2.5,
      color: i % 3 === 0 ? '#a855f7' : i % 2 === 0 ? '#6366f1' : '#ec4899',
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map(s => (
        <motion.div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            boxShadow: `0 0 ${s.size * 3}px ${s.color}`,
          }}
          animate={{
            opacity: [0.15, 0.85, 0.15],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// 3D Perspective Wireframe Horizon Grid
function CyberGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: '600px' }}>
      {/* Top ambient horizon glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent blur-[1px]" />

      {/* 3D Floor Grid */}
      <motion.div
        className="absolute inset-0 origin-bottom"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transformOrigin: '50% 65%',
        }}
        animate={{
          rotateX: [65, 62, 65],
          backgroundPositionY: ['0px', '50px'],
        }}
        transition={{
          rotateX: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          backgroundPositionY: { duration: 3.5, repeat: Infinity, ease: 'linear' },
        }}
      />

      {/* Horizon Fog Mask */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#04040c] via-transparent to-[#04040c]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#04040c] via-transparent to-[#04040c]" />
    </div>
  );
}

// Orbital Rings with Energy Beacons
function OrbitalSystem() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      {[140, 220, 310].map((radius, i) => (
        <motion.div
          key={radius}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
          style={{
            width: radius,
            height: radius,
            borderColor:
              i === 0
                ? 'rgba(99,102,241,0.15)'
                : i === 1
                ? 'rgba(168,85,247,0.10)'
                : 'rgba(236,72,153,0.07)',
          }}
          animate={{
            rotate: i % 2 === 0 ? 360 : -360,
            scale: [1, 1.04, 1],
          }}
          transition={{
            rotate: { duration: 18 + i * 8, repeat: Infinity, ease: 'linear' },
            scale: { duration: 3.5 + i, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          {/* Energy spark on each orbit */}
          <motion.div
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-indigo-300"
            style={{
              boxShadow: '0 0 10px rgba(99,102,241,0.9), 0 0 20px rgba(168,85,247,0.5)',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

export function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [showBar, setShowBar] = useState(false);
  const [exiting, setExiting] = useState(false);
  const completed = useRef(false);

  useEffect(() => {
    const barTimer = setTimeout(() => setShowBar(true), 1500);
    const totalDuration = 3800;
    const startTime = Date.now();

    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / totalDuration) * 100));
      setProgress(pct);

      if (pct >= 100 && !completed.current) {
        completed.current = true;
        clearInterval(progressTimer);
        setProgress(100);
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => onComplete(), 700);
        }, 400);
      }
    }, 35);

    return () => {
      clearTimeout(barTimer);
      clearInterval(progressTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#04040c] overflow-hidden select-none"
      animate={
        exiting
          ? { opacity: 0, scale: 1.04, filter: 'blur(10px)' }
          : { opacity: 1, scale: 1, filter: 'blur(0px)' }
      }
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* 3D Cyber Grid */}
      <CyberGrid />

      {/* Starfield particles */}
      <Starfield />

      {/* Deep radial plasma glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <motion.div
          className="w-[620px] h-[620px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(99,102,241,0.12) 0%, rgba(168,85,247,0.06) 40%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Orbital ring energy system */}
      <OrbitalSystem />

      {/* Core content block */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Logo Badge with Dual Pulsing Aura */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 180, damping: 14 }}
          className="relative"
        >
          {/* Sonic Expansion Ripples */}
          <motion.div
            className="absolute -inset-3 rounded-full border border-indigo-400/30"
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute -inset-6 rounded-full border border-purple-400/20"
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
          />

          {/* Core Avatar */}
          <motion.div
            className="relative w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center"
            animate={{
              boxShadow: [
                '0 0 35px rgba(99,102,241,0.5), 0 0 70px rgba(99,102,241,0.25)',
                '0 0 55px rgba(168,85,247,0.6), 0 0 90px rgba(236,72,153,0.3)',
                '0 0 35px rgba(99,102,241,0.5), 0 0 70px rgba(99,102,241,0.25)',
              ],
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.span
              className="text-3xl font-black text-white"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              R
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Name */}
        <div className="text-center">
          <motion.h1
            className="text-3xl sm:text-4xl font-black text-white tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {portfolioData.name}
          </motion.h1>
        </div>

        {/* Greeting flip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <p className="flex flex-wrap items-center justify-center gap-2 text-lg sm:text-xl font-semibold text-white/80">
            <GreetingFlip />
            <motion.span
              className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-400"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </p>
        </motion.div>

        {/* Progress bar — slides in beneath greeting */}
        <motion.div
          className="w-72 max-w-[80vw]"
          initial={{ opacity: 0, y: 14, height: 0 }}
          animate={showBar ? { opacity: 1, y: 0, height: 'auto' } : {}}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <div className="relative h-[3px] bg-white/[0.08] rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899)',
                width: `${progress}%`,
              }}
            />
            {/* Glowing lead particle */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_14px_rgba(168,85,247,0.9)]"
              style={{ left: `calc(${progress}% - 6px)` }}
            />
          </div>
          <div className="flex justify-between mt-2.5">
            <span className="text-[10px] text-white/35 font-mono uppercase tracking-wider">
              {progress < 30 ? 'Booting' : progress < 60 ? 'Loading Modules' : progress < 90 ? 'Starting Platform' : 'Ready'}
            </span>
            <span className="text-[10px] text-white/50 font-mono tabular-nums font-medium">{progress}%</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom keyboard hint */}
      <motion.div
        className="absolute bottom-10 flex items-center gap-2.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <kbd className="text-[10px] text-white/30 font-mono bg-white/5 px-2 py-0.5 rounded border border-white/[0.08] shadow-sm">
          Ctrl
        </kbd>
        <span className="text-[10px] text-white/20">+</span>
        <kbd className="text-[10px] text-white/30 font-mono bg-white/5 px-2 py-0.5 rounded border border-white/[0.08] shadow-sm">
          K
        </kbd>
        <span className="text-[10px] text-white/25 ml-0.5 font-mono">search anytime</span>
      </motion.div>
    </motion.div>
  );
}
