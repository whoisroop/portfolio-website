import { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Mail, MapPin, Phone, Globe, Copy, Check, Send, MessageSquare, ArrowRight } from 'lucide-react';

function CopyChip({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <motion.button className="flex items-center gap-3 w-full glass-light rounded-lg p-3 hover:bg-white/[0.08] transition-colors group" onClick={handleCopy} whileHover={{ x: 3 }}>
      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0"><Icon className="w-4 h-4 text-indigo-400" /></div>
      <div className="flex-1 text-left min-w-0"><p className="text-[10px] text-white/60">{label}</p><p className="text-xs text-white/80 truncate">{value}</p></div>
      {copied ? <Check className="w-3.5 h-3.5 text-green-400 shrink-0" /> : <Copy className="w-3.5 h-3.5 text-white/50 group-hover:text-white/80 shrink-0" />}
    </motion.button>
  );
}

export function ContactWindow() {
  const subject = encodeURIComponent(`Hello ${portfolioData.name}`);
  const body = encodeURIComponent(`Hi ${portfolioData.name},\n\nI came across your portfolio and would love to connect.\n\n`);
  const mailtoUrl = `mailto:${portfolioData.email}?subject=${subject}&body=${body}`;

  return (
    <div className="p-5 space-y-4">
      <div className="space-y-2">
        <CopyChip icon={Mail} label="Email" value={portfolioData.email} />
        <CopyChip icon={MapPin} label="Location" value={portfolioData.location} />
        <CopyChip icon={Phone} label="Phone" value={portfolioData.phone} />
        <CopyChip icon={Globe} label="GitHub" value={portfolioData.github} />
      </div>

      {/* Direct email CTA */}
      <motion.div className="glass-light rounded-xl p-5 text-center space-y-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="w-14 h-14 rounded-full bg-indigo-500/10 flex items-center justify-center mx-auto">
          <MessageSquare className="w-7 h-7 text-indigo-400" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Let's work together</h3>
          <p className="text-xs text-white/60 mt-1">Click below to open your email client — your message goes straight to my inbox.</p>
        </div>
        <motion.a
          href={mailtoUrl}
          className="flex items-center justify-center gap-2 w-full h-11 rounded-lg bg-indigo-500/20 text-indigo-300 text-sm font-medium border border-indigo-500/30 hover:bg-indigo-500/30 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Send className="w-4 h-4" />
          Send me an email
          <ArrowRight className="w-4 h-4 ml-1" />
        </motion.a>
        <p className="text-[10px] text-white/35">Opens your default mail app — no form, no hassle.</p>
      </motion.div>
    </div>
  );
}
