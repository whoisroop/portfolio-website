import { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Send, Mail, MapPin, Copy, Check, Globe, Phone } from 'lucide-react';

export function ContactWindow() {
  const [copied, setCopied] = useState<string | null>(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Contact info chips */}
      <div className="space-y-2">
        <ContactChip
          icon={Mail}
          label="Email"
          value={portfolioData.email}
          copied={copied === 'email'}
          onCopy={() => copyToClipboard(portfolioData.email, 'email')}
        />
        <ContactChip
          icon={MapPin}
          label="Location"
          value={portfolioData.location}
          copied={copied === 'location'}
          onCopy={() => copyToClipboard(portfolioData.location, 'location')}
        />
        <ContactChip
          icon={Phone}
          label="Phone"
          value={portfolioData.phone}
          copied={copied === 'phone'}
          onCopy={() => copyToClipboard(portfolioData.phone, 'phone')}
        />
        <ContactChip
          icon={Globe}
          label="GitHub"
          value={portfolioData.website}
          copied={copied === 'website'}
          onCopy={() => copyToClipboard(portfolioData.website, 'website')}
        />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Your Name"
          value={formState.name}
          onChange={e => setFormState(prev => ({ ...prev, name: e.target.value }))}
          required
          className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700
                     bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500/30
                     text-gray-700 dark:text-gray-200 placeholder-gray-400"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={formState.email}
          onChange={e => setFormState(prev => ({ ...prev, email: e.target.value }))}
          required
          className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700
                     bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500/30
                     text-gray-700 dark:text-gray-200 placeholder-gray-400"
        />
        <textarea
          placeholder="Your Message"
          value={formState.message}
          onChange={e => setFormState(prev => ({ ...prev, message: e.target.value }))}
          required
          rows={3}
          className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700
                     bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm resize-none
                     focus:outline-none focus:ring-2 focus:ring-blue-500/30
                     text-gray-700 dark:text-gray-200 placeholder-gray-400"
        />
        <button
          type="submit"
          disabled={submitted}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium
                     rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors
                     shadow-lg shadow-blue-500/25 disabled:opacity-50"
        >
          {submitted ? (
            <>
              <Check size={16} />
              Sent Successfully!
            </>
          ) : (
            <>
              <Send size={16} />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}

function ContactChip({ icon: Icon, label, value, copied, onCopy }: {
  icon: React.ComponentType<{ size: number; className?: string }>;
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onCopy}
      className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-200/60 
                 dark:border-gray-700/40 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm
                 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all text-left"
    >
      <Icon size={16} className="text-blue-500 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-gray-400 dark:text-gray-500">{label}</p>
        <p className="text-xs font-medium text-gray-700 dark:text-gray-200 truncate">{value}</p>
      </div>
      {copied ? (
        <Check size={14} className="text-green-500 shrink-0" />
      ) : (
        <Copy size={14} className="text-gray-400 shrink-0" />
      )}
    </motion.button>
  );
}
