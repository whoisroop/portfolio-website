import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';

export function SkillsWindow() {
  return (
    <div className="p-4 space-y-5 max-h-[420px] overflow-y-auto">
      {portfolioData.skillCategories.map((category, ci) => (
        <motion.div
          key={category.title}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: ci * 0.08 }}
        >
          <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
            {category.title}
          </h3>
          <div className="space-y-2.5">
            {category.skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <div key={skill.name} className="flex items-center gap-3 group">
                  {/* Vibrant icon container — uses skill color at good opacity + subtle inset highlight */}
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0
                               transition-transform group-hover:scale-110 shadow-sm"
                    style={{
                      background: `linear-gradient(135deg, ${skill.color}DD, ${skill.color}AA)`,
                      boxShadow: `0 2px 8px ${skill.color}30`,
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-200">{skill.name}</span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-200/50 dark:bg-gray-700/50 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, delay: ci * 0.1, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}99)` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
