import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';

interface CommandOutput {
  type: 'input' | 'output' | 'error' | 'ascii';
  content: string;
}

const HIRE_ME_ASCII = `
██╗  ██╗██╗██████╗ ███████╗    ███╗   ███╗███████╗
██║  ██║██║██╔══██╗██╔════╝    ████╗ ████║██╔════╝
███████║██║██████╔╝█████╗      ██╔████╔██║█████╗  
██╔══██║██║██╔══██╗██╔══╝      ██║╚██╔╝██║██╔══╝  
██║  ██║██║██║  ██║███████╗    ██║ ╚═╝ ██║███████╗
╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝    ╚═╝     ╚═╝╚══════╝
                                                  
  Let's build something awesome together! 🚀
`.trim();

const COMMANDS: Record<string, (args: string[]) => string> = {
  help: () => `
Available commands:
  help       - Show this help message
  whoami     - Display current user
  neofetch   - System information
  skills     - List skills
  projects   - List projects
  experience - Work history
  hireme     - Why you should hire me
  clear      - Clear the terminal
  date       - Show current date
  echo       - Echo a message
  pwd        - Print working directory
  ls         - List directory contents
  about      - About me
`.trim(),

  hireme: () => HIRE_ME_ASCII,

  whoami: () => portfolioData.githubUsername,

  neofetch: () => `
         █████████          ${portfolioData.githubUsername}@portfolio-os
       ██████████████       ─────────────────────────────
     ██████████████████     OS: Portfolio OS v3.0
    ████████████████████    Host: GitHub Pages
    ████████████████████    User: ${portfolioData.githubUsername}
    ███████        ███████  Title: ${portfolioData.title}
     ██████  ██████  ████   Location: ${portfolioData.location}
      ██████████████████    Projects: ${portfolioData.projects.length}
       ████████████████     Skills: 27 across 5 categories
         █████████████      GitHub: ${portfolioData.github}
           █████████        
`.trim(),

  skills: () => portfolioData.skillCategories
    .map(c => `  ▸ ${c.title}: ${c.skills.map(s => s.name).join(', ')}`)
    .join('\n'),

  projects: () => portfolioData.projects
    .map((p, i) => `  ${i + 1}. ${p.title} — ${p.tags.join(', ')}\n     ${p.description}`)
    .join('\n\n'),

  experience: () => portfolioData.experience
    .map(e => `  ▸ ${e.role} @ ${e.company} (${e.period})`)
    .join('\n'),

  date: () => new Date().toString(),

  pwd: () => `/home/${portfolioData.githubUsername}`,

  ls: () => 'about.txt  projects/  skills.txt  experience/  contact.txt  resume.pdf',

  about: () => `Hey, I'm ${portfolioData.name} — ${portfolioData.tagline}`,

  echo: (args: string[]) => args.join(' '),
};

export function TerminalWindow() {
  const [history, setHistory] = useState<CommandOutput[]>([
    { type: 'ascii', content: HIRE_ME_ASCII },
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

    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    const parts = trimmed.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    const handler = COMMANDS[command];
    if (handler) {
      const output = handler(args);
      if (command === 'hireme') {
        setHistory(prev => [...prev, { type: 'ascii', content: output }]);
      } else {
        setHistory(prev => [...prev, { type: 'output', content: output }]);
      }
    } else {
      setHistory(prev => [...prev, { type: 'error', content: `command not found: ${command}` }]);
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    }
  };

  return (
    <div
      className="h-full bg-black/60 font-mono text-xs p-4 flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1 overflow-auto space-y-0.5">
        {history.map((entry, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.1 }}
          >
            {entry.type === 'input' && (
              <div className="text-green-400/80 whitespace-pre-wrap">{entry.content}</div>
            )}
            {entry.type === 'output' && (
              <div className="text-white/70 whitespace-pre-wrap">{entry.content}</div>
            )}
            {entry.type === 'ascii' && (
              <div className="text-indigo-400 whitespace-pre-wrap leading-tight">{entry.content}</div>
            )}
            {entry.type === 'error' && (
              <div className="text-red-400/80 whitespace-pre-wrap">{entry.content}</div>
            )}
          </motion.div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-center gap-2 mt-2 shrink-0">
        <span className="text-green-400 whitespace-nowrap">{portfolioData.githubUsername}@os:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-white outline-none border-none caret-indigo-400"
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    </div>
  );
}
