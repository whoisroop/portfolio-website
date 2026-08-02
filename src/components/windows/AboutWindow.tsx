import { motion } from 'framer-motion';
import { Heart, Quote } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { TextMorph } from '@/components/ui/TextMorph';

export function AboutWindow() {
  return (
    <div className="p-6 space-y-6">
      {/* Hero with TextMorph */}
      <div className="text-center space-y-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/20"
        >
          <span className="text-3xl font-bold text-white">{portfolioData.name.charAt(0)}</span>
        </motion.div>
        <h2 className="text-xl font-bold text-white">{portfolioData.name}</h2>
        <p className="flex flex-wrap items-center justify-center gap-2 text-base text-white/80">
          <span>I'm a</span>
          <TextMorph
            words={['Platform Engineer', 'DevOps Engineer', 'Builder', 'Problem Solver']}
            interval={2200}
            className="text-indigo-400 font-semibold"
          />
        </p>
      </div>

      {/* Bio */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-sm text-white/85 leading-relaxed text-center max-w-xl mx-auto"
      >
        {portfolioData.about.bio}
      </motion.p>

      {/* Interests */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap gap-2 justify-center"
      >
        {portfolioData.about.interests.map((interest) => (
          <span
            key={interest}
            className="px-3 py-1.5 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
          >
            {interest}
          </span>
        ))}
      </motion.div>

      {/* Philosophy */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10"
      >
        <Quote size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-300 italic">
          {portfolioData.about.philosophy}
        </p>
      </motion.div>

      {/* Footer */}
      <div className="text-center text-xs text-white/50 flex items-center justify-center gap-1">
        <span>Made with</span>
        <Heart size={12} className="text-red-400 fill-red-400" />
        <span>by {portfolioData.name}</span>
      </div>
    </div>
  );
}
