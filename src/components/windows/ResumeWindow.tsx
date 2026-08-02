import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { FileText, Download, Eye, Code, Star, GitBranch, Clock } from 'lucide-react';

export function ResumeWindow() {
  const resumeUrl = `https://drive.google.com/file/d/1S9oSETgCgkf4dQy4WtSGrWMfHL-TC3yj/view?usp=drive_link`;
  return (
    <div className="p-5 space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
        {[
          { label: 'Experience', value: '2+ Years', icon: Clock, color: '#6366f1' },
          { label: 'Projects', value: `${portfolioData.projects.length}`, icon: Code, color: '#8b5cf6' },
          { label: 'Skills', value: '26', icon: Star, color: '#ec4899' },
          { label: 'Certifications', value: '3', icon: GitBranch, color: '#10b981' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} className="glass-light rounded-xl p-4 text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} whileHover={{ scale: 1.03, y: -2 }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-2" style={{ background: `${stat.color}20` }}><Icon className="w-4 h-4" style={{ color: stat.color }} /></div>
              <p className="text-lg font-bold text-white">{stat.value}</p>
              <p className="text-[10px] text-white/60">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.div className="glass-light rounded-xl p-6 text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4"><FileText className="w-8 h-8 text-white/50" /></div>
        <h3 className="text-sm font-semibold text-white">Resume.pdf</h3>
        <p className="text-xs text-white/60 mt-1 mb-4">Download my latest resume</p>
        <div className="flex items-center justify-center gap-3">
          <motion.a
            href={resumeUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500/15 text-indigo-300 text-xs font-medium border border-indigo-500/20 hover:bg-indigo-500/25 transition-colors"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          >
            <Download className="w-3.5 h-3.5" />
            Download PDF
          </motion.a>
          <motion.a
            href={portfolioData.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white/75 text-xs font-medium border border-white/[0.08] hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          >
            <Eye className="w-3.5 h-3.5" />
            GitHub Profile
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}
