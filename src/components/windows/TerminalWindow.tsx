import { useState, useRef, useEffect, useCallback } from 'react';
import { portfolioData, windowMeta } from '@/data/portfolio';
import { useWindows } from '@/context/WindowContext';

interface Command {
  input: string;
  output: React.ReactNode;
}

const helpText = `
Available commands:
  help      - Show this help message
  about     - Display about information
  projects  - List all projects
  skills    - List all skills
  experience- Show work experience
  contact   - Show contact information
  clear     - Clear the terminal
  theme     - Toggle dark/light mode
  whoami    - Display current user
  date      - Show current date/time
  neofetch  - System information
  open [id] - Open a window (about, projects, skills, etc.)
`;

export function TerminalWindow() {
  const [commands, setCommands] = useState<Command[]>([
    { input: '', output: <WelcomeMessage /> }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { openWindow } = useWindows();

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => { scrollToBottom(); }, [commands, scrollToBottom]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let output: React.ReactNode = null;

    switch (true) {
      case trimmed === 'help':
        output = <pre className="text-xs whitespace-pre-wrap">{helpText}</pre>;
        break;
      case trimmed === 'about':
        output = (
          <div className="space-y-1">
            <p className="text-purple-400">{portfolioData.name}</p>
            <p className="text-xs">{portfolioData.title}</p>
            <p className="text-xs text-gray-400">{portfolioData.about.bio}</p>
          </div>
        );
        break;
      case trimmed === 'projects':
        output = (
          <div className="space-y-1">
            {portfolioData.projects.map(p => (
              <div key={p.id}>
                <span className="text-cyan-400">{p.title}</span>
                <span className="text-gray-400 text-xs"> - {p.description.slice(0, 80)}...</span>
              </div>
            ))}
          </div>
        );
        break;
      case trimmed === 'skills':
        output = (
          <div className="space-y-2">
            {portfolioData.skillCategories.map(cat => (
              <div key={cat.title}>
                <p className="text-yellow-400 text-xs mb-0.5">{cat.title}:</p>
                <p className="text-xs text-gray-300">
                  {cat.skills.map(s => s.name).join(', ')}
                </p>
              </div>
            ))}
          </div>
        );
        break;
      case trimmed === 'experience':
        output = (
          <div className="space-y-1">
            {portfolioData.experience.map((exp, i) => (
              <p key={i} className="text-xs">
                <span className="text-green-400">{exp.position}</span>
                <span className="text-gray-400"> @ {exp.company} ({exp.dates})</span>
              </p>
            ))}
          </div>
        );
        break;
      case trimmed === 'contact':
        output = (
          <div className="space-y-1 text-xs">
            <p>Email: <span className="text-blue-400">{portfolioData.email}</span></p>
            <p>Phone: <span className="text-gray-400">{portfolioData.phone}</span></p>
            <p>Location: <span className="text-gray-400">{portfolioData.location}</span></p>
            <p>GitHub: <span className="text-purple-400">{portfolioData.github}</span></p>
          </div>
        );
        break;
      case trimmed === 'clear':
        setCommands([]);
        return;
      case trimmed === 'whoami':
        output = <p className="text-green-400">whoisroop</p>;
        break;
      case trimmed === 'date':
        output = <p className="text-xs text-gray-400">{new Date().toString()}</p>;
        break;
      case trimmed === 'neofetch':
        output = <Neofetch />;
        break;
      case trimmed.startsWith('open '):
        const windowId = trimmed.split(' ')[1];
        const meta = windowMeta[windowId];
        if (meta) {
          openWindow(windowId, { width: meta.width, height: meta.height });
          output = <p className="text-green-400 text-xs">Opened {meta.title}</p>;
        } else {
          output = <p className="text-red-400 text-xs">Unknown window: {windowId}</p>;
        }
        break;
      default:
        output = <p className="text-red-400 text-xs">Command not found: {trimmed}. Type 'help' for available commands.</p>;
    }

    setCommands(prev => [...prev, { input: cmd, output }]);
    setCurrentInput('');
  };

  return (
    <div 
      className="flex flex-col h-full bg-gray-950/95 text-green-400 font-mono text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-2">
        {commands.map((cmd, i) => (
          <div key={i}>
            {cmd.input && (
              <div className="flex items-center gap-2">
                <span className="text-green-500 shrink-0">whoisroop@os:~$</span>
                <span className="text-white">{cmd.input}</span>
              </div>
            )}
            <div className="mt-0.5">{cmd.output}</div>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span className="text-green-500 shrink-0">whoisroop@os:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={e => setCurrentInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && currentInput.trim()) {
                handleCommand(currentInput);
              }
            }}
            className="flex-1 bg-transparent outline-none text-white caret-green-400"
            autoFocus
            spellCheck={false}
          />
          <span className="w-2 h-5 bg-green-400 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function WelcomeMessage() {
  return (
    <div className="space-y-1 text-xs">
      <pre className="text-cyan-400">
{`╔═══════════════════════════════════╗
║   Welcome to whoisroop OS v1.0    ║
║   Type 'help' for commands        ║
╚═══════════════════════════════════╝`}
      </pre>
      <p className="text-gray-400">Type 'help' to explore. Built by whoisroop.</p>
    </div>
  );
}

function Neofetch() {
  return (
    <div className="space-y-0.5 text-xs">
      <p><span className="text-purple-400">OS:</span> whoisroop OS v1.0</p>
      <p><span className="text-purple-400">Host:</span> GitHub Pages</p>
      <p><span className="text-purple-400">User:</span> {portfolioData.name}</p>
      <p><span className="text-purple-400">Title:</span> {portfolioData.title}</p>
      <p><span className="text-purple-400">Location:</span> {portfolioData.location}</p>
      <p><span className="text-purple-400">Projects:</span> {portfolioData.projects.length}</p>
      <p><span className="text-purple-400">Skills:</span> {portfolioData.skillCategories.reduce((acc, c) => acc + c.skills.length, 0)}</p>
      <p><span className="text-purple-400">GitHub:</span> {portfolioData.github}</p>
    </div>
  );
}
