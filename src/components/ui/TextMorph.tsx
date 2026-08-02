import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type TextMorphProps = {
  words?: string[];
  interval?: number;
  className?: string;
  charClassName?: string;
};

const defaultWords = ['engineer', 'developer', 'designer'];

export function TextMorph({
  words = defaultWords,
  interval = 2500,
  className,
  charClassName,
}: TextMorphProps) {
  const [index, setIndex] = useState(0);

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

  return (
    <span className={`inline-flex overflow-hidden align-bottom ${className ?? ''}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={index}
          className="flex whitespace-nowrap"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {chars.map((char, i) => (
            <motion.span
              key={`${index}-${i}`}
              className={charClassName}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{
                delay: i * 0.025,
                duration: 0.25,
                ease: 'easeOut',
              }}
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
