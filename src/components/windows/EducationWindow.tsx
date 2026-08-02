import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

export function EducationWindow() {
  return (
    <div className="p-4 space-y-4">
      {portfolioData.education.map((edu, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="rounded-xl border border-gray-200/60 dark:border-gray-700/40 p-4
                     bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm"
        >
          <div className="flex items-start gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-pink-50 dark:bg-pink-500/10 
                           flex items-center justify-center shrink-0">
              <GraduationCap size={22} className="text-pink-500" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{edu.institution}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{edu.degree}</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500">{edu.year}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <BookOpen size={12} className="text-pink-400" />
                <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Coursework
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {edu.coursework.map(course => (
                  <span
                    key={course}
                    className="px-2 py-0.5 text-[10px] font-medium rounded-md
                               bg-pink-50 dark:bg-pink-500/10
                               text-pink-600 dark:text-pink-400"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Award size={12} className="text-pink-400" />
                <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Achievements
                </span>
              </div>
              <ul className="space-y-1">
                {edu.achievements.map((ach, ai) => (
                  <li key={ai} className="text-xs text-gray-600 dark:text-gray-300 flex gap-2">
                    <span className="text-pink-400 mt-0.5 shrink-0">✦</span>
                    {ach}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
