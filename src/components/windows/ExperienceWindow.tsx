import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Building2, Calendar } from 'lucide-react';

export function ExperienceWindow() {
  return (
    <div className="p-4">
      <div className="relative pl-6 border-l-2 border-gray-200 dark:border-gray-700 space-y-6">
        {portfolioData.experience.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative"
          >
            {/* Timeline dot */}
            <div
              className="absolute -left-[29px] top-1 w-4 h-4 rounded-full border-2 bg-white dark:bg-gray-900
                         shadow-sm"
              style={{ borderColor: i === 0 ? '#EA580C' : i === 1 ? '#F59E0B' : '#F97316' }}
            >
              <div className="w-2 h-2 rounded-full m-0.5" 
                   style={{ background: i === 0 ? '#EA580C' : i === 1 ? '#F59E0B' : '#F97316' }} />
            </div>

            <div className="rounded-xl border border-gray-200/60 dark:border-gray-700/40 p-4
                           bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm
                           hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{exp.position}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Building2 size={12} className="text-gray-400" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">{exp.company}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Calendar size={11} className="text-gray-400" />
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 whitespace-nowrap">{exp.dates}</span>
                </div>
              </div>

              <ul className="space-y-1 mb-3">
                {exp.responsibilities.map((resp, ri) => (
                  <li key={ri} className="text-xs text-gray-600 dark:text-gray-300 flex gap-2">
                    <span className="text-orange-400 mt-0.5 shrink-0">•</span>
                    {resp}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5">
                {exp.technologies.map(tech => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[10px] font-medium rounded-md
                               bg-orange-50 dark:bg-orange-500/10
                               text-orange-600 dark:text-orange-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
