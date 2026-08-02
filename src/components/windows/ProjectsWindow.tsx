import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Search, ExternalLink, Star, Sparkles } from 'lucide-react';

function GithubIcon({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>);
}

export function ProjectsWindow() {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const allTags = Array.from(new Set(portfolioData.projects.flatMap(p => p.tags)));
  const filtered = portfolioData.projects.filter(p => {
    const m = (s: string) => s.toLowerCase().includes(search.toLowerCase());
    return (m(p.title) || m(p.description)) && (!activeTag || p.tags.includes(activeTag));
  });

  return (
    <div className="p-5 space-y-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/50" />
        <input type="text" placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full h-9 pl-9 pr-3 rounded-lg bg-white/5 border border-white/[0.08] text-sm text-white placeholder:text-white/35 outline-none focus:border-indigo-500/50 transition-colors" />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {allTags.map(tag => (
          <motion.button key={tag} className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${activeTag === tag ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-white/5 text-white/60 border border-transparent hover:bg-white/10 hover:text-white'}`}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{tag}</motion.button>
        ))}
        {activeTag && <button className="px-2 py-1 rounded-md text-[11px] text-white/50 hover:text-white/80" onClick={() => setActiveTag(null)}>Clear</button>}
      </div>
      <div className="space-y-3">
        <AnimatePresence>
          {filtered.map((project, i) => (
            <motion.div key={project.title} className="glass-light rounded-xl p-4 hover:bg-white/[0.08] transition-colors group"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ delay: i * 0.05 }}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <h3 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">{project.title}</h3>
                  </div>
                  <p className="text-xs text-white/70 mt-1.5 leading-relaxed">{project.description}</p>
                  <div className="mt-2.5 space-y-1">{project.highlights.map(h => (<div key={h} className="flex items-center gap-1.5"><Star className="w-3 h-3 text-amber-400/80 shrink-0" /><span className="text-[11px] text-white/80">{h}</span></div>))}</div>
                  <div className="flex flex-wrap gap-1.5 mt-2.5">{project.tags.map(tag => (<span key={tag} className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-white/50 border border-white/[0.06]">{tag}</span>))}</div>
                </div>
                <div className="flex items-center gap-1 ml-3 shrink-0">
                  <motion.a href={project.link || portfolioData.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} title="View on GitHub"><GithubIcon className="w-3.5 h-3.5" /></motion.a>
                  <motion.a href={project.link || portfolioData.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-indigo-400 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} title="Open live demo"><ExternalLink className="w-3.5 h-3.5" /></motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && <div className="text-center py-8 text-white/50 text-sm">No projects match your search.</div>}
      </div>
    </div>
  );
}
