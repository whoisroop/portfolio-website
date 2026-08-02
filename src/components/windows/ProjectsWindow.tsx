import { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData, type Project } from '@/data/portfolio';
import { Search, ExternalLink, Code2 } from 'lucide-react';

const categories = ['all', 'frontend', 'backend', 'fullstack', 'mobile'] as const;

export function ProjectsWindow() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');

  const filtered = portfolioData.projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.technologies.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = category === 'all' || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700
                       bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
                       focus:outline-none focus:ring-2 focus:ring-purple-500/30
                       text-gray-700 dark:text-gray-200 placeholder-gray-400"
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl capitalize transition-all
                ${category === cat 
                  ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 shadow-sm' 
                  : 'bg-gray-100/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 hover:bg-gray-200/50'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
        {filtered.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 dark:text-gray-500 text-sm py-8">
            No projects found matching your search.
          </p>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-xl border border-gray-200/60 dark:border-gray-700/40 p-4
                 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm
                 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all
                 hover:shadow-md group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{project.title}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.technologies.map(tech => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[10px] font-medium rounded-md
                           bg-purple-50 dark:bg-purple-500/10
                           text-purple-600 dark:text-purple-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="View on GitHub"
          >
            <Code2 size={16} className="text-gray-500 dark:text-gray-400" />
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Live Demo"
          >
            <ExternalLink size={16} className="text-gray-500 dark:text-gray-400" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
