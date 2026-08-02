import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type TextMorphProps = {
  words?: string[];
  interval?: number;
  initialDelay?: number;
  className?: string;
  charClassName?: string;
  speed?: 'normal' | 'fast';
};

const defaultWords = ['engineer', 'developer', 'designer'];

export function TextMorph({
  words = defaultWords,
  interval = 2500,
  initialDelay = 600,
  className,
  charClassName,
  speed = 'normal',
}: TextMorphProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!words.length) return;
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, initialDelay);
    return () => clearTimeout(timer);
  }, [words, initialDelay]);

  useEffect(() => {
    if (!words.length) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);

  const chars = useMemo(() => {
    return Array.from(words[index] ?? '');
  }, [index, words]);

  if (!words.length) return null;

  const isFast = speed === 'fast';
  const dur = isFast ? 0.12 : 0.25;
  const stagger = isFast ? 0.012 : 0.025;
  const parentDur = isFast ? 0.18 : 0.35;
  const exitY = isFast ? 4 : 8;
  const enterY = isFast ? 4 : 8;
  const blur = isFast ? 'blur(2px)' : 'blur(4px)';

  return (
    <span className={`inline-flex overflow-hidden align-bottom ${className ?? ''}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          className="flex whitespace-nowrap"
          initial={{ opacity: 0, y: enterY }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -exitY }}
          transition={{ duration: parentDur, ease: 'easeOut' }}
        >
          {chars.map((char, i) => (
            <motion.span
              key={`${index}-${i}`}
              className={charClassName}
              initial={{ opacity: 0, y: enterY, filter: blur }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -exitY, filter: blur }}
              transition={{ delay: i * stagger, duration: dur, ease: 'easeOut' }}
              style={{ display: 'inline-block' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default TextMorph;
