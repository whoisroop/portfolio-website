import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { GraduationCap, Award, Trophy, Medal } from 'lucide-react';

export function EducationWindow() {
  const edu = portfolioData.education[0];
  const achievementIcons = [Award, Trophy, Medal, Award, GraduationCap];

  return (
    <div className="p-5 space-y-5">
      <motion.div
        className="glass-light rounded-xl p-5 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-indigo-500/20">
          <GraduationCap className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-lg font-bold text-white">{edu.institution}</h3>
        <p className="text-sm text-white/75 mt-1">{edu.degree}</p>
        <div className="flex items-center justify-center gap-3 mt-3">
          <span className="text-xs px-3 py-1 rounded-full bg-white/5 text-white/70 border border-white/[0.08]">
            {edu.year}
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/20">
            CGPA: {edu.cgpa}
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/20">
            {edu.rank}
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xs font-semibold text-white/65 uppercase tracking-wider mb-3">Achievements</h3>
        <div className="space-y-2">
          {edu.details.map((detail, i) => {
            const Icon = achievementIcons[i] || Award;
            return (
              <motion.div
                key={detail}
                className="flex items-center gap-3 glass-light rounded-lg p-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                whileHover={{ x: 3 }}
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="text-xs text-white/70">{detail}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
