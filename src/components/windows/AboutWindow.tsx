import { portfolioData } from '@/data/portfolio';

export function AboutWindow() {
  return (
    <div className="p-5 space-y-5">
      <div className="flex items-start gap-4">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 
                        flex items-center justify-center text-white text-3xl font-bold shadow-lg shrink-0">
          {portfolioData.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{portfolioData.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{portfolioData.title}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{portfolioData.location}</p>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {portfolioData.about.bio}
        </p>

        <div>
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {portfolioData.about.interests.map(interest => (
              <span
                key={interest}
                className="px-3 py-1 text-xs font-medium rounded-full
                           bg-indigo-50 dark:bg-indigo-500/10
                           text-indigo-600 dark:text-indigo-400
                           border border-indigo-100 dark:border-indigo-500/20"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 
                        dark:from-indigo-500/5 dark:to-purple-500/5
                        border border-indigo-100 dark:border-indigo-500/10">
          <p className="text-xs text-gray-500 dark:text-gray-400 italic">
            "{portfolioData.about.philosophy}"
          </p>
        </div>
      </div>
    </div>
  );
}
