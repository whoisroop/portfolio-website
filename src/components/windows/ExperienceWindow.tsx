import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Building2, Briefcase, Users } from 'lucide-react';

const typeIcons: Record<string, typeof Building2> = {
  fulltime: Building2,
  intern: Briefcase,
  freelance: Users,
};

export function ExperienceWindow() {
  return (
    <div className="p-5">
      <div className="relative">
        <div className="absolute left-[19px] top-2 bottom-2 w-px bg-white/[0.08]" />

        <div className="space-y-5">
          {portfolioData.experience.map((exp, i) => {
            const Icon = typeIcons[exp.type] || Building2;
            return (
              <motion.div
                key={`${exp.company}-${exp.role}`}
                className="relative pl-12"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
              >
                <div
                  className="absolute left-[15px] top-1 w-[9px] h-[9px] rounded-full border-2 border-white/10 z-10"
                  style={{ background: `linear-gradient(135deg, ${exp.color}, ${exp.color}88)` }}
                />

                <div className="glass-light rounded-xl p-4">
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-indigo-400" />
                      <div>
                        <h3 className="text-sm font-semibold text-white">{exp.role}</h3>
                        <p className="text-xs text-white/70">{exp.company}</p>
                      </div>
                    </div>
                    <span
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full border"
                      style={{
                        color: exp.color,
                        borderColor: `${exp.color}40`,
                        backgroundColor: `${exp.color}15`,
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {exp.bullets.map((bullet, bi) => (
                      <motion.li
                        key={bi}
                        className="flex items-start gap-2 text-xs text-white/80"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.15 + bi * 0.05 }}
                      >
                        <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: exp.color }} />
                        {bullet}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
