// Flaticon Icons — loaded via CDN with preconnect + preload for instant rendering
// Attribution: Icons by Freepik / Flaticon (flaticon.com)
// Free for personal and commercial use with attribution

import { useEffect } from 'react';

const CDN_BASE = 'https://cdn-icons-png.flaticon.com';

const iconUrls: Record<string, string> = {
  // Desktop icons — Retro Computer Lineal Color pack
  about:     `${CDN_BASE}/512/7340/7340710.png`,     // retro computer (ID: 7340710)
  projects:  `${CDN_BASE}/512/6577/6577281.png`,     // merge / git branch (ID: 6577281)
  skills:    `${CDN_BASE}/512/18043/18043561.png`,    // joystick (ID: 18043561)
  experience:`${CDN_BASE}/512/11321/11321307.png`,    // diskette (ID: 11321307)
  education: `${CDN_BASE}/512/2987/2987867.png`,      // graduation cap (ID: 2987867)
  resume:    `${CDN_BASE}/512/12908/12908904.png`,    // computer (ID: 12908904)
  contact:   `${CDN_BASE}/512/2132/2132622.png`,      // phone (ID: 2132622)
  terminal:  `${CDN_BASE}/512/9825/9825966.png`,      // computer window (ID: 9825966)

  // Skill category icons
  iconGit:       `${CDN_BASE}/512/7130/7130005.png`,   // git (ID: 7130005)
  iconGitHub:    `${CDN_BASE}/512/1322/1322104.png`,   // github (ID: 1322104)
  iconCloud:     `${CDN_BASE}/512/6800/6800631.png`,   // cloud service (ID: 6800631)
  iconObserve:   `${CDN_BASE}/512/470/470979.png`,     // observe (ID: 470979)
  iconDevops:    `${CDN_BASE}/512/16942/16942846.png`, // devops (ID: 16942846)
  iconCoding:    `${CDN_BASE}/512/4013/4013275.png`,   // coding (ID: 4013275)
  iconAi:        `${CDN_BASE}/512/8131/8131880.png`,   // ai (ID: 8131880)
};

const preloaded = new Set<string>();

export function preloadIcons() {
  Object.values(iconUrls).forEach(url => {
    if (preloaded.has(url)) return;
    preloaded.add(url);
    const link = document.createElement('link');
    link.rel = 'preload'; link.as = 'image'; link.href = url; link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
    const img = new Image(); img.src = url;
  });
}

export function useIconPreload() {
  useEffect(() => { preloadIcons(); }, []);
}

interface FlaticonImgProps { name: keyof typeof iconUrls; size?: number; className?: string; }

export function FlaticonImg({ name, size = 32, className }: FlaticonImgProps) {
  return (
    <img src={iconUrls[name]} alt={name} width={size} height={size}
         className={className} loading="eager" crossOrigin="anonymous"
         style={{ imageRendering: 'auto' }} />
  );
}

type IconProps = { size?: number; className?: string };

export function IconAbout({ size = 32, className }: IconProps) { return <FlaticonImg name="about" size={size} className={className} />; }
export function IconProjects({ size = 32, className }: IconProps) { return <FlaticonImg name="projects" size={size} className={className} />; }
export function IconSkills({ size = 32, className }: IconProps) { return <FlaticonImg name="skills" size={size} className={className} />; }
export function IconExperience({ size = 32, className }: IconProps) { return <FlaticonImg name="experience" size={size} className={className} />; }
export function IconEducation({ size = 32, className }: IconProps) { return <FlaticonImg name="education" size={size} className={className} />; }
export function IconResume({ size = 32, className }: IconProps) { return <FlaticonImg name="resume" size={size} className={className} />; }
export function IconContact({ size = 32, className }: IconProps) { return <FlaticonImg name="contact" size={size} className={className} />; }
export function IconTerminal({ size = 32, className }: IconProps) { return <FlaticonImg name="terminal" size={size} className={className} />; }

// Skill category icons
export function IconGit({ size = 32, className }: IconProps) { return <FlaticonImg name="iconGit" size={size} className={className} />; }
export function IconGitHub({ size = 32, className }: IconProps) { return <FlaticonImg name="iconGitHub" size={size} className={className} />; }
export function IconCloud({ size = 32, className }: IconProps) { return <FlaticonImg name="iconCloud" size={size} className={className} />; }
export function IconObserve({ size = 32, className }: IconProps) { return <FlaticonImg name="iconObserve" size={size} className={className} />; }
export function IconDevops({ size = 32, className }: IconProps) { return <FlaticonImg name="iconDevops" size={size} className={className} />; }
export function IconCoding({ size = 32, className }: IconProps) { return <FlaticonImg name="iconCoding" size={size} className={className} />; }
export function IconAi({ size = 32, className }: IconProps) { return <FlaticonImg name="iconAi" size={size} className={className} />; }
