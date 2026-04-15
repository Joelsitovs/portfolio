import { Component, computed, inject, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslatePipe } from '@/app/core/i18n/translate.pipe';

interface RawSkill {
  name: string;
  cat: string;
  glow: string;
  type: 'devicon' | 'img' | 'svg';
  cls?: string;
  src?: string;
  alt?: string;
  rawSvg?: string;
  iconFilter?: string;
}

export interface Skill {
  name: string;
  cat: string;
  glow: string;
  type: 'devicon' | 'img' | 'svg';
  cls?: string;
  src?: string;
  alt?: string;
  svg?: SafeHtml;
  iconFilter?: string;
}

interface FilterGroup {
  key: string;
  cats: string[];
}

const FILTER_GROUPS: FilterGroup[] = [
  { key: 'ALL',      cats: [] },
  { key: 'LANGUAGE', cats: ['LANGUAGE'] },
  { key: 'FRONTEND', cats: ['FRONTEND', 'CSS', 'STRUCTURE', 'STYLING'] },
  { key: 'FRAMEWORK', cats: ['FRAMEWORK', 'RUNTIME'] },
  { key: 'BACKEND',  cats: ['BACKEND'] },
  { key: 'DATABASE', cats: ['DATABASE'] },
  { key: 'DEVOPS',   cats: ['DEVOPS', 'CLOUD'] },
];

const RAW_SKILLS: RawSkill[] = [
  { name: 'Angular',      cat: 'FRONTEND',  glow: 'bg-emerald-500/5', type: 'devicon', cls: 'devicon-angularjs-plain colored' },
  { name: 'TypeScript',   cat: 'LANGUAGE',  glow: 'bg-blue-500/5',    type: 'devicon', cls: 'devicon-typescript-plain colored' },
  { name: 'JavaScript',   cat: 'LANGUAGE',  glow: 'bg-yellow-500/5',  type: 'devicon', cls: 'devicon-javascript-plain colored' },
  { name: 'Java',         cat: 'LANGUAGE',  glow: 'bg-orange-500/5',  type: 'devicon', cls: 'devicon-java-plain colored' },
  { name: 'Go',           cat: 'LANGUAGE',  glow: 'bg-cyan-500/5',    type: 'devicon', cls: 'devicon-go-original-wordmark colored' },
  { name: 'Python',       cat: 'LANGUAGE',  glow: 'bg-blue-400/5',    type: 'devicon', cls: 'devicon-python-plain colored' },
  { name: 'PHP',          cat: 'LANGUAGE',  glow: 'bg-violet-500/5',  type: 'devicon', cls: 'devicon-php-plain colored' },
  {
    name: 'SQL', cat: 'DATABASE', glow: 'bg-cyan-500/5', type: 'svg',
    rawSvg: `<svg class="w-7 h-7 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path stroke-linecap="round" d="M3 5v4c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path stroke-linecap="round" d="M3 9v4c0 1.66 4.03 3 9 3s9-1.34 9-3V9"/><path stroke-linecap="round" d="M3 13v4c0 1.66 4.03 3 9 3s9-1.34 9-3v-4"/></svg>`,
  },
  { name: 'Spring Boot',  cat: 'FRAMEWORK', glow: 'bg-green-500/5',   type: 'devicon', cls: 'devicon-spring-plain colored' },
  { name: 'Spring',       cat: 'FRAMEWORK', glow: 'bg-green-400/5',   type: 'devicon', cls: 'devicon-spring-plain colored' },
  { name: 'Laravel',      cat: 'FRAMEWORK', glow: 'bg-red-500/5',     type: 'devicon', cls: 'devicon-laravel-plain colored' },
  { name: 'React',        cat: 'FRONTEND',  glow: 'bg-cyan-400/5',    type: 'devicon', cls: 'devicon-react-original colored' },
  { name: 'Node.js',      cat: 'RUNTIME',   glow: 'bg-green-500/5',   type: 'devicon', cls: 'devicon-nodejs-plain colored' },
  { name: 'FastAPI',      cat: 'FRAMEWORK', glow: 'bg-teal-500/5',    type: 'img',     src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',        alt: 'FastAPI' },
  { name: 'RxJS',         cat: 'FRAMEWORK', glow: 'bg-pink-500/5',    type: 'img',     src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rxjs/rxjs-original.svg',              alt: 'RxJS' },
  { name: '.NET',         cat: 'FRAMEWORK', glow: 'bg-purple-500/5',  type: 'img',     src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-plain.svg',         alt: '.NET', iconFilter: 'brightness(0) invert(1)' },
  {
    name: 'REST APIs', cat: 'BACKEND', glow: 'bg-emerald-500/5', type: 'svg',
    rawSvg: `<svg class="w-7 h-7 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/></svg>`,
  },
  {
    name: 'Microservices', cat: 'BACKEND', glow: 'bg-teal-500/5', type: 'svg',
    rawSvg: `<svg class="w-7 h-7 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><circle cx="4" cy="6" r="2"/><circle cx="20" cy="6" r="2"/><circle cx="4" cy="18" r="2"/><circle cx="20" cy="18" r="2"/><path stroke-linecap="round" d="M6 7l4.5 3.5M18 7l-4.5 3.5M6 17l4.5-3.5M18 17l-4.5-3.5"/></svg>`,
  },
  {
    name: 'Clean Arch', cat: 'BACKEND', glow: 'bg-zinc-400/5', type: 'svg',
    rawSvg: `<svg class="w-7 h-7 text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  },
  {
    name: 'SOLID', cat: 'BACKEND', glow: 'bg-violet-500/5', type: 'svg',
    rawSvg: `<svg class="w-7 h-7 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/><rect x="8" y="3" width="8" height="8" rx="1"/></svg>`,
  },
  {
    name: 'Auth', cat: 'BACKEND', glow: 'bg-amber-500/5', type: 'svg',
    rawSvg: `<svg class="w-7 h-7 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg>`,
  },
  { name: 'HTML5',        cat: 'STRUCTURE', glow: 'bg-orange-500/5',  type: 'devicon', cls: 'devicon-html5-plain colored' },
  { name: 'CSS3',         cat: 'STYLING',   glow: 'bg-blue-600/5',    type: 'devicon', cls: 'devicon-css3-plain colored' },
  { name: 'Tailwind',     cat: 'CSS',       glow: 'bg-sky-500/5',     type: 'img',     src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', alt: 'Tailwind' },
  {
    name: 'SPA', cat: 'FRONTEND', glow: 'bg-sky-500/5', type: 'svg',
    rawSvg: `<svg class="w-7 h-7 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"/></svg>`,
  },
  {
    name: 'Responsive', cat: 'FRONTEND', glow: 'bg-pink-500/5', type: 'svg',
    rawSvg: `<svg class="w-7 h-7 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18h3"/></svg>`,
  },
  { name: 'Docker',       cat: 'DEVOPS',    glow: 'bg-blue-400/5',    type: 'devicon', cls: 'devicon-docker-plain colored' },
  { name: 'GCP',          cat: 'CLOUD',     glow: 'bg-yellow-500/5',  type: 'devicon', cls: 'devicon-googlecloud-plain colored' },
  { name: 'Firebase',     cat: 'DATABASE',  glow: 'bg-amber-500/5',   type: 'devicon', cls: 'devicon-firebase-plain colored' },
  { name: 'PostgreSQL',   cat: 'DATABASE',  glow: 'bg-indigo-500/5',  type: 'devicon', cls: 'devicon-postgresql-plain colored' },
  {
    name: 'BigQuery', cat: 'DATABASE', glow: 'bg-blue-500/5', type: 'svg',
    rawSvg: `<svg class="w-7 h-7 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"/></svg>`,
  },
  {
    name: 'CI/CD', cat: 'DEVOPS', glow: 'bg-zinc-500/5', type: 'svg',
    rawSvg: `<svg class="w-7 h-7 text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/></svg>`,
  },
  { name: 'Git',    cat: 'DEVOPS', glow: 'bg-orange-600/5', type: 'devicon', cls: 'devicon-git-plain colored',       iconFilter: 'brightness(0) invert(1)' },
  { name: 'GitHub', cat: 'DEVOPS', glow: 'bg-zinc-400/5',   type: 'devicon', cls: 'devicon-github-original colored', iconFilter: 'brightness(0) invert(1)' },
  {
    name: 'Git Workflows', cat: 'DEVOPS', glow: 'bg-orange-400/5', type: 'svg',
    rawSvg: `<svg class="w-7 h-7 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="6" cy="18" r="2"/><circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="18" cy="14" r="2"/><path stroke-linecap="round" d="M6 8v8M6 8c0 0 2-2 4-2h2M18 8v4M12 6h2a2 2 0 012 2v4a2 2 0 002 2"/></svg>`,
  },
  { name: 'Linux',  cat: 'DEVOPS', glow: 'bg-yellow-400/5', type: 'devicon', cls: 'devicon-linux-plain colored',     iconFilter: 'brightness(0) invert(1)' },
  { name: 'Bash',   cat: 'DEVOPS', glow: 'bg-green-600/5',  type: 'devicon', cls: 'devicon-bash-plain colored',      iconFilter: 'brightness(0) invert(1)' },
  { name: 'Postman',      cat: 'DEVOPS',    glow: 'bg-orange-500/5',  type: 'devicon', cls: 'devicon-postman-plain colored' },
  { name: 'Jira',         cat: 'DEVOPS',    glow: 'bg-blue-600/5',    type: 'devicon', cls: 'devicon-jira-plain colored' },
  {
    name: 'Scrum', cat: 'DEVOPS', glow: 'bg-indigo-500/5', type: 'svg',
    rawSvg: `<svg class="w-7 h-7 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"/></svg>`,
  },
];

@Component({
  selector: 'app-skills',
  imports: [TranslatePipe],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  private sanitizer = inject(DomSanitizer);

  private static readonly PAGE_SIZE = 20;

  readonly filterGroups = FILTER_GROUPS;
  readonly selectedGroup = signal('ALL');
  readonly showAll = signal(false);

  readonly skills: Skill[] = RAW_SKILLS.map(({ rawSvg, ...s }) => ({
    ...s,
    svg: rawSvg ? this.sanitizer.bypassSecurityTrustHtml(rawSvg) : undefined,
  }));

  readonly filteredSkills = computed(() => {
    const key = this.selectedGroup();
    const group = FILTER_GROUPS.find(g => g.key === key);
    const result = (!group || key === 'ALL')
      ? this.skills
      : this.skills.filter(s => group.cats.includes(s.cat));

    if (key === 'ALL' && !this.showAll()) {
      return result.slice(0, Skills.PAGE_SIZE);
    }
    return result;
  });

  readonly hasMore = computed(() =>
    this.selectedGroup() === 'ALL' && !this.showAll() && this.skills.length > Skills.PAGE_SIZE
  );

  selectGroup(key: string): void {
    this.selectedGroup.set(key);
    this.showAll.set(false);
  }
}
