# Portfolio OS — Complete Project Context (v3)

## Owner
**Roop Lala** — Platform & DevOps Engineer at GE Vernova
- GitHub: github.com/whoisroop
- Email: whoisroop.work@gmail.com
- LinkedIn: linkedin.com/in/roop-lala
- Location: Hyderabad, India

---

## Overview
A responsive portfolio website that simulates a desktop operating system with glassmorphism windows, draggable/resizable UI, and Flaticon icons. Built as a single-file static site for GitHub Pages. The content is customized for a Platform & DevOps Engineer with AI/ML experience.

---

## Tech Stack
| Package | Version | Purpose |
|---------|---------|---------|
| react | 19.2.6 | UI framework |
| framer-motion | ^12.43.0 | Animations, drag, gestures |
| lucide-react | ^1.28.0 | Window control icons (Minus, Square, X, etc.) |
| clsx | 2.1.1 + tailwind-merge 3.4.0 | Conditional class merging |
| tailwindcss | 4.1.17 + @tailwindcss/vite 4.1.17 | Utility CSS |
| vite | 7.3.2 + @vitejs/plugin-react 5.1.1 | Bundler |
| vite-plugin-singlefile | 2.3.0 | Inlines JS/CSS into one HTML |
| typescript | 5.9.3 | Type checking |

---

## File Tree (26 source files)
```
index.html
package.json
vite.config.ts
tsconfig.json
src/
  main.tsx
  index.css
  App.tsx
  utils/cn.ts
  context/
    ThemeContext.tsx       # Light/dark toggle
    WindowContext.tsx      # Window manager state
  data/
    portfolio.ts           # ALL content data
  components/
    ui/
      FlaticonIcons.tsx    # 15 Flaticon PNG icon components
      TitleBar.tsx         # Accent-colored title bar
      GlassPanel.tsx       # Reusable glass panels
    WindowManager/
      Window.tsx           # Draggable, resizable, maximizable
    Desktop/
      DesktopIcons.tsx     # Icon grid — no backgrounds, drop-shadow
      ContextMenu.tsx      # Right-click menu (viewport-clamped)
    Taskbar/
      Taskbar.tsx          # Start button + tabs + clock
      StartMenu.tsx        # App launcher + theme toggle + GitHub/LinkedIn
      Clock.tsx            # Live 12hr clock
    overlays/
      BootScreen.tsx       # Boot sequence + icon preloading
      CommandPalette.tsx   # Ctrl/Cmd+K search palette
    windows/
      AboutWindow.tsx      # Personal intro with interests
      ProjectsWindow.tsx   # 5 projects with search/filter
      SkillsWindow.tsx     # 5 categories with progress bars
      ExperienceWindow.tsx # 3 roles with timeline
      EducationWindow.tsx  # Education + achievements
      ResumeWindow.tsx     # PDF placeholder + stats
      ContactWindow.tsx    # Email, phone, location, GitHub chips + form
      TerminalWindow.tsx   # Terminal with 12 commands
```

---

## CRITICAL IMPLEMENTATION DETAILS

### 1. Dark Mode (Tailwind 4 class-based)
Tailwind 4 defaults to `@media` dark mode. The fix in `src/index.css`:
```css
@custom-variant dark (&:where(.dark, .dark *));
```
This tells Tailwind 4 to use class-based dark mode. ThemeContext toggles `document.documentElement.classList.toggle('dark', ...)`.

### 2. Window Drag (Framer Motion coordinate ownership)
CSS `left`/`top` fights Framer Motion's `translate`. **Fix:**
- `style={{ position: 'fixed', left: 0, top: 0 }}` — CSS anchor at origin
- `animate={{ x: position.x, y: position.y }}` — FM owns positioning
- `drag={!win.isMaximized}` with `dragMomentum={false}`, `dragElastic={0}`
- `onDragEnd` persists final offset to context

### 3. Maximize
`toggleMaximize` stores `previousBounds`. `animate.x/y` transitions to `0`. `width`/`height` → `100vw`/`calc(100vh - 48px)`.

### 4. Skill Icons — Vibrant Containers
**Bug fixed:** CSS `color` has no effect on `<img>` PNGs. And `${color}20` hex suffix = ~12% opacity (barely visible). **Fix:**
- Container: `background: linear-gradient(135deg, ${color}DD, ${color}AA)` — ~87% to ~67% opacity
- Added `boxShadow: 0 2px 8px ${color}30` for matching glow
- Every skill in a category shares the same Flaticon icon

### 5. Icons (CDN + preloading)
Loaded from `https://cdn-icons-png.flaticon.com/512/{folder}/{id}.png`. Three-layer caching:
1. `<link rel="preconnect">` in `index.html`
2. `preloadIcons()` called during boot — injects `<link rel="preload">` + `new Image()`
3. Browser HTTP cache for repeat visits

---

## ICON REFERENCE TABLE

### Desktop Icons
| Icon | Flaticon ID | URL |
|------|------------|-----|
| About Me | 7340710 | `512/7340/7340710.png` (retro computer) |
| Projects | 6577281 | `512/6577/6577281.png` (merge/git branch) |
| Skills | 18043561 | `512/18043/18043561.png` (joystick) |
| Experience | 11321307 | `512/11321/11321307.png` (diskette) |
| Education | 2987867 | `512/2987/2987867.png` (graduation cap) |
| Resume | 12908904 | `512/12908/12908904.png` (computer) |
| Contact | 2132622 | `512/2132/2132622.png` (phone) |
| Terminal | 9825966 | `512/9825/9825966.png` (computer window) |

### Skill Category Icons (one per category)
| Category | Icon | Flaticon ID | URL |
|----------|------|------------|-----|
| Cloud & Infrastructure | cloud-service | 6800631 | `512/6800/6800631.png` |
| CI/CD & Delivery | devops | 16942846 | `512/16942/16942846.png` |
| Languages & Scripting | coding | 4013275 | `512/4013/4013275.png` |
| AI & Automation | ai | 8131880 | `512/8131/8131880.png` |
| Observability & Practices | observe | 470979 | `512/470/470979.png` |

### Extra (available but unused)
| Icon | Flaticon ID | URL |
|------|------------|-----|
| Git | 7130005 | `512/7130/7130005.png` |
| GitHub | 1322104 | `512/1322/1322104.png` |

---

## CONTENT DATA SUMMARY

### Skills (5 categories, 27 skills total)
- **Cloud & Infrastructure** (IconCloud): AWS 90, Kubernetes 92, Docker 90, Terraform 85, Helm 82, Linux 88
- **CI/CD & Delivery** (IconDevops): GitHub Actions 95, ArgoCD 88, Jenkins 80, Backstage 85, GitOps 92, Artifactory 78
- **Languages & Scripting** (IconCoding): Python 90, Bash 88, Groovy 75
- **AI & Automation** (IconAi): Claude/LLMs 90, MCP Servers 85, Sub-agents 80, OpenCode 88, MLflow 85, MLOps 82
- **Observability & Practices** (IconObserve): Grafana 85, Prometheus 82, SRE 85, DevEx 88, Multi-Cluster K8s 80, Microservices 85

### Experience (3 roles)
1. **GE Vernova** — Software Engineer (Aug 2024–Present). 6 bullet points. SIRE platform, $48K savings, 94% reliability, Backstage adoption.
2. **GE Vernova** — SWE Intern MLOps (Jan–Jul 2024). Load forecasting @ 90%+ accuracy, MLflow framework.
3. **MetaLoop Marketing** — Freelance ML Engineer (Aug–Oct 2023). CNN embryo classifier.

### Education
IIIT Surat, B.Tech CSE (2020–2024), CGPA 9.57/10, Rank 1. 5 achievements including GE Vernova Impact Award, DotSlash finalist, 1000+ LeetCode problems.

---

## FULL SOURCE CODE

_(All file contents below are exact current versions.)_

### index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="preconnect" href="https://cdn-icons-png.flaticon.com" crossorigin />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Roop Lala — Portfolio OS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### src/index.css
```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@layer base {
  * { -webkit-tap-highlight-color: transparent; }
  html {
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body { margin: 0; padding: 0; overflow: hidden; height: 100vh; width: 100vw; }
  ::selection { background-color: rgba(99, 102, 241, 0.3); }
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(156, 163, 175, 0.4); border-radius: 8px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(156, 163, 175, 0.6); }
  .dark ::-webkit-scrollbar-thumb { background: rgba(75, 85, 99, 0.4); }
  .dark ::-webkit-scrollbar-thumb:hover { background: rgba(75, 85, 99, 0.6); }
}

@layer utilities {
  .backdrop-blur-xl { backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); }
  .backdrop-blur-2xl { backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px); }
  .backdrop-saturate-150 { backdrop-filter: saturate(150%); -webkit-backdrop-filter: saturate(150%); }
}
```

### src/App.tsx
```tsx
import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { WindowProvider, useWindows } from '@/context/WindowContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { DesktopIcons } from '@/components/Desktop/DesktopIcons';
import { ContextMenu } from '@/components/Desktop/ContextMenu';
import { Taskbar } from '@/components/Taskbar/Taskbar';
import { Window } from '@/components/WindowManager/Window';
import { BootScreen } from '@/components/overlays/BootScreen';
import { CommandPalette } from '@/components/overlays/CommandPalette';
// + 8 window content imports

function Desktop() {
  const { windows } = useWindows();
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none" onContextMenu={...}>
      {/* Gradient wallpaper: indigo→purple→pink / dark: gray-950→indigo-950→purple-950 */}
      {/* Ambient particle dots overlay */}
      <DesktopIcons />
      <AnimatePresence>
        {Array.from(windows.values()).map(win => win.isOpen && !win.isMinimized && <Window key={win.id} win={win}>...</Window>)}
      </AnimatePresence>
      <Taskbar />
      {contextMenu && <ContextMenu ... />}
      <CommandPalette ... />
    </div>
  );
}

function AppContent() {
  const [booted, setBooted] = useState(false);
  return <>{!booted ? <BootScreen onComplete={() => setBooted(true)} /> : <Desktop />}</>;
}

export default function App() {
  return <ThemeProvider><WindowProvider><AppContent /></WindowProvider></ThemeProvider>;
}
```

### src/data/portfolio.ts (key excerpts)
```ts
export const portfolioData = {
  name: "Roop Lala",
  title: "Platform & DevOps Engineer",
  tagline: "I build the infrastructure that helps teams ship faster.",
  location: "Hyderabad, India",
  email: "whoisroop.work@gmail.com",
  phone: "+91 997940xxxx",
  github: "https://github.com/whoisroop",
  linkedin: "https://linkedin.com/in/roop-lala",

  about: {
    bio: `Hey, I'm Roop — I work on platforms and pipelines at GE Vernova...`,
    interests: ["Kubernetes & GitOps", "AI-Assisted Development", "Platform Engineering", ...],
    philosophy: "Make the platform invisible. Build things that empower others."
  },

  projects: [ /* 5 projects: SIRE, Cloud Cost Optimizer, Energy Load Forecaster, Backstage Portal, Embryo Classifier */ ],
  skillCategories: [ /* 5 categories × IconCloud/IconDevops/IconCoding/IconAi/IconObserve */ ],
  experience: [ /* 3 roles at GE Vernova (current), GE Vernova (intern), MetaLoop */ ],
  education: [ { institution: "IIIT Surat", degree: "B.Tech CSE", year: "2020–2024", ... } ],
  desktopIcons: [ /* 8 icons: about, projects, skills, experience, education, resume, contact, terminal */ ]
};
```

### src/components/ui/FlaticonIcons.tsx
```tsx
// 15 Flaticon PNG icon components (8 desktop + 7 skill category)
// CDN_BASE = 'https://cdn-icons-png.flaticon.com'
// Desktop: IconAbout, IconProjects, IconSkills, IconExperience, IconEducation, IconResume, IconContact, IconTerminal
// Skill categories: IconCloud, IconObserve, IconDevops, IconCoding, IconAi
// Extra: IconGit, IconGitHub (available but unused)
// preloadIcons() injects <link rel="preload"> + new Image() for all 15 URLs
```

### src/components/windows/SkillsWindow.tsx
```tsx
// Icon container fix:
// Old (dull): background: ${skill.color}20 → ~12% opacity, barely visible
// New (vibrant): background: linear-gradient(135deg, ${skill.color}DD, ${skill.color}AA)
//                boxShadow: 0 2px 8px ${skill.color}30
// No CSS color wrapper since it cannot affect <img> PNGs
```

### src/components/windows/ContactWindow.tsx
```tsx
// 4 copy chips: Mail (email), MapPin (location), Phone (phone), Globe (GitHub)
// Contact form with name, email, message fields + submit button
// Phone chip added, website chip changed to show GitHub URL
```

### src/components/windows/TerminalWindow.tsx
```
// Prompt: whoisroop@os:~$
// Welcome: "Welcome to whoisroop OS v1.0"
// neofetch: shows OS, Host, User, Title, Location, Projects, Skills, GitHub
// whoami → "whoisroop"
```

---

## Bugs Fixed (historical)

| Issue | Cause | Fix |
|-------|-------|-----|
| Dark mode not working | Tailwind 4 defaults to `@media` dark | `@custom-variant dark (&:where(.dark, .dark *))` |
| Windows not dragging real-time | CSS left/top vs FM translate fight | Use `animate.x/y` + `left:0;top:0` in style |
| Maximize not working | animate lacked x/y for maximize state | `x: win.isMaximized ? 0 : win.position.x` |
| Context menu overflowing | Raw click coordinates, no clamping | Clamp to viewport minus menu size |
| Icons disappearing after load | Double AnimatePresence nesting | Removed AnimatePresence from Window.tsx |
| Skill icons dull/colorless | `color` CSS doesn't affect `<img>` PNGs AND `${color}20` = 12% opacity | Full color gradient background + matching shadow; removed color wrapper |
| n8n in content | User requested removal | Removed from AI & Automation skills and about bio |

---

## Build & Deploy

```bash
npm install
npm run build
# Output: dist/index.html (~440KB / ~129KB gzipped)
# Deploy dist/index.html to GitHub Pages
```

Build confirmed passing with zero TypeScript errors. `npm run build` exits clean.
