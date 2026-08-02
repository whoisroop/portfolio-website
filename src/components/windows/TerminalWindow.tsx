import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';

interface CommandOutput {
  type: 'input' | 'output' | 'error' | 'ascii';
  content: string;
}

// Condensed ASCII for mobile — shorter version
const HIRE_ME_ASCII_SHORT = `
██╗  ██╗██╗██████╗ ███████╗
██║  ██║██║██╔══██╗██╔════╝
███████║██║██████╔╝█████╗  
██╔══██║██║██╔══██╗██╔══╝  
██║  ██║██║██║  ██║███████╗
╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝

  Let's build together! 🚀
`.trim();

const HIRE_ME_ASCII_FULL = `
██╗  ██╗██╗██████╗ ███████╗    ███╗   ███╗███████╗
██║  ██║██║██╔══██╗██╔════╝    ████╗ ████║██╔════╝
███████║██║██████╔╝█████╗      ██╔████╔██║█████╗  
██╔══██║██║██╔══██╗██╔══╝      ██║╚██╔╝██║██╔══╝  
██║  ██║██║██║  ██║███████╗    ██║ ╚═╝ ██║███████╗
╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝    ╚═╝     ╚═╝╚══════╝
                                                  
  Let's build something awesome together! 🚀
`.trim();

function getAsciiArt() {
  if (typeof window !== 'undefined' && window.innerWidth < 500) {
    return HIRE_ME_ASCII_SHORT;
  }
  return HIRE_ME_ASCII_FULL;
}

const COMMANDS: Record<string, (args: string[]) => string> = {
  help: () => `Available commands:\n  help  whoami  neofetch  skills  projects  experience  hireme  clear  date  echo  pwd  ls  about`,
  hireme: () => getAsciiArt(),
  whoami: () => portfolioData.githubUsername,
  neofetch: () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 500;
    if (isMobile) {
      return [
        `${portfolioData.githubUsername}@portfolio-os`,
        `OS: Portfolio OS v3.0`,
        `User: ${portfolioData.githubUsername}`,
        `Title: ${portfolioData.title}`,
        `Location: ${portfolioData.location}`,
        `Projects: ${portfolioData.projects.length}`,
        `Skills: 26 across 5 categories`,
        `GitHub: ${portfolioData.github}`,
      ].join('\n');
    }
    return `
         █████████          ${portfolioData.githubUsername}@portfolio-os
       ██████████████       ─────────────────────────────
     ██████████████████     OS: Portfolio OS v3.0
    ████████████████████    Host: GitHub Pages
    ████████████████████    User: ${portfolioData.githubUsername}
    ███████        ███████  Title: ${portfolioData.title}
     ██████  ██████  ████   Location: ${portfolioData.location}
      ██████████████████    Projects: ${portfolioData.projects.length}
       ████████████████     Skills: 26 across 5 categories
         █████████████      GitHub: ${portfolioData.github}
           █████████        
`.trim();
  },
  skills: () => portfolioData.skillCategories.map(c => `  ▸ ${c.title}: ${c.skills.map(s => s.name).join(', ')}`).join('\n'),
  projects: () => portfolioData.projects.map((p, i) => `  ${i + 1}. ${p.title} — ${p.tags.join(', ')}\n     ${p.description}`).join('\n\n'),
  experience: () => portfolioData.experience.map(e => `  ▸ ${e.role} @ ${e.company} (${e.period})`).join('\n'),
  date: () => new Date().toString(),
  pwd: () => `/home/${portfolioData.githubUsername}`,
  ls: () => 'about.txt  projects/  skills.txt  experience/  contact.txt  resume.pdf',
  about: () => `Hey, I'm ${portfolioData.name} — ${portfolioData.tagline}`,
  echo: (args: string[]) => args.join(' '),
};

export function TerminalWindow() {
  const initialAscii = getAsciiArt();
  const [history, setHistory] = useState<CommandOutput[]>([
    { type: 'ascii', content: initialAscii },
    { type: 'output', content: `\nWelcome to whoisroop OS v1.0 — Type 'help' to get started.\n` },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;
    setHistory(prev => [...prev, { type: 'input', content: `$ ${trimmed}` }]);
    if (trimmed === 'clear') { setHistory([]); return; }
    const parts = trimmed.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    const handler = COMMANDS[command];
    if (handler) {
      const output = handler(args);
      setHistory(prev => [...prev, { type: command === 'hireme' ? 'ascii' : 'output', content: output }]);
    } else {
      setHistory(prev => [...prev, { type: 'error', content: `command not found: ${command}` }]);
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { executeCommand(input); setInput(''); }
  };

  // Responsive text size
  const asciiClass = 'text-[5px] xs:text-[7px] sm:text-xs leading-tight tracking-tighter sm:tracking-normal';

  return (
    <div className="h-full bg-black/60 font-mono text-[10px] sm:text-xs p-3 sm:p-4 flex flex-col" onClick={() => inputRef.current?.focus()}>
      <div className="flex-1 overflow-auto space-y-0.5">
        {history.map((entry, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.1 }}>
            {entry.type === 'input' && <div className="text-green-400/80 whitespace-pre-wrap break-all">{entry.content}</div>}
            {entry.type === 'output' && <div className="text-white/70 whitespace-pre-wrap break-words">{entry.content}</div>}
            {entry.type === 'ascii' && <div className={`text-indigo-400 whitespace-pre ${asciiClass}`}>{entry.content}</div>}
            {entry.type === 'error' && <div className="text-red-400/80 whitespace-pre-wrap break-all">{entry.content}</div>}
          </motion.div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input bar — more tappable on mobile */}
      <div className="flex items-center gap-1.5 mt-2 shrink-0 min-h-[32px] sm:min-h-0">
        <span className="text-green-400 text-[10px] sm:text-xs whitespace-nowrap shrink-0 hidden xs:inline">whoisroop@os:~$</span>
        <span className="text-green-400 text-[10px] sm:text-xs whitespace-nowrap shrink-0 xs:hidden">~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-white outline-none border-none caret-indigo-400 min-w-0 py-1"
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          placeholder="type a command..."
        />
      </div>
    </div>
  );
}
