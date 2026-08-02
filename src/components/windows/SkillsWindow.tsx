import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { SKILL_LUCIDE_ICON_MAP } from '@/components/ui/AppIcons';

function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden shrink-0">
      <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${color}, ${color}CC)` }} initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} />
    </div>
  );
}

export function SkillsWindow() {
  return (
    <div className="p-5 space-y-5">
      {portfolioData.skillCategories.map((category, ci) => {
        const Icon = SKILL_LUCIDE_ICON_MAP[category.icon];
        return (
          <motion.div key={category.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ci * 0.1 }}>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: `linear-gradient(135deg, ${category.color}DD, ${category.color}AA)`, boxShadow: `0 2px 8px ${category.color}40` }}>
                {Icon && <Icon size={14} className="text-white" />}
              </div>
              <h3 className="text-sm font-semibold text-white">{category.title}</h3>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {category.skills.map((skill, si) => (
                <motion.div key={skill.name} className="flex items-center justify-between gap-3" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: ci * 0.1 + si * 0.05 }}>
                  <span className="text-xs text-white/85 truncate flex-1">{skill.name}</span>
                  <ProgressBar value={skill.level} color={category.color} />
                  <span className="text-[10px] text-white/60 w-7 text-right font-mono">{skill.level}%</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
