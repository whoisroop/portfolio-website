import { FileDown, FileText } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

export function ResumeWindow() {
  return (
    <div className="p-4 space-y-4 flex flex-col h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
          <FileText size={16} className="text-green-500" />
          Resume Preview
        </h2>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            // In a real app, this would link to an actual PDF
            alert('Resume PDF download would start here!');
          }}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-xl
                     bg-green-50 dark:bg-green-500/10 
                     text-green-600 dark:text-green-400
                     hover:bg-green-100 dark:hover:bg-green-500/20
                     transition-colors"
        >
          <FileDown size={14} />
          Download PDF
        </a>
      </div>

      <div className="flex-1 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600
                     bg-gray-50/50 dark:bg-gray-800/30 flex items-center justify-center
                     min-h-[300px]">
        <div className="text-center space-y-3 p-8">
          <div className="w-16 h-16 rounded-2xl bg-green-50 dark:bg-green-500/10 
                         flex items-center justify-center mx-auto">
            <FileText size={32} className="text-green-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              {portfolioData.name}'s Resume
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              PDF Document • Updated 2024
            </p>
          </div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert('Resume PDF download would start here!');
            }}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl
                       bg-green-500 text-white hover:bg-green-600 transition-colors shadow-lg
                       shadow-green-500/25"
          >
            <FileDown size={16} />
            Download Resume
          </a>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Quick Summary
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Experience', value: '6+ Years' },
            { label: 'Projects', value: `${portfolioData.projects.length}+` },
            { label: 'Skills', value: `${portfolioData.skillCategories.reduce((acc, c) => acc + c.skills.length, 0)}+` },
            { label: 'Location', value: portfolioData.location },
          ].map(stat => (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-200/60 dark:border-gray-700/40 p-3
                         bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm"
            >
              <p className="text-[10px] text-gray-400 dark:text-gray-500">{stat.label}</p>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
