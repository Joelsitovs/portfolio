import {Component, computed, signal} from '@angular/core';
import {CommonModule} from '@angular/common'; // Import CommonModule
import {FormsModule} from '@angular/forms'; // Import FormsModule
import { TranslatePipe } from '@/app/core/i18n/translate.pipe';

interface Project {
  title: string;
  description: string;
  tags: string[];
  repoLink?: string;
  demoLink?: string;
  isFixed?: boolean;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe], // Add modules here
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  searchText = signal('');
  selectedTag = signal('Todos');

  allProjects: Project[] = [
    {
      title: 'Firebase Chat',
      description: 'PROJECTS.LIST.CHAT_DESC',
      tags: ['Angular', 'Firebase', 'Realtime', 'Tailwind'],
      repoLink: 'https://github.com/Joelsitovs/firebase_chat',
      demoLink: 'https://fir-chat-b890c.web.app',
      isFixed: true
    },
    {
      title: 'Portfolio',
      description: 'PROJECTS.LIST.PORTFOLIO_DESC',
      tags: ['Angular', 'UI', 'Tailwind'],
      repoLink: '#',
      isFixed: true
    },
    {
      title: 'Karaoke',
      description: 'PROJECTS.LIST.KARAOKE_DESC',
      tags: ['Angular', 'Audio', 'Firebase', 'Tailwind'],
      repoLink: 'https://github.com/Joelsitovs/front-karaoke',
      demoLink: 'https://karaoke-4bb19.web.app/',
      isFixed: true
    }
  ];

  availableTags = computed(() => {
    const tags = new Set<string>();
    this.allProjects.forEach(p => p.tags.forEach(t => tags.add(t)));
    return ['Todos', ...Array.from(tags)];
  });

  filteredProjects = computed(() => {
    const search = this.searchText().toLowerCase();
    const tag = this.selectedTag();

    return this.allProjects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(search) ||
        project.description.toLowerCase().includes(search);
      const matchesTag = tag === 'Todos' || project.tags.includes(tag);

      return matchesSearch && matchesTag;
    });
  });

  setTag(tag: string) {
    this.selectedTag.set(tag);
  }
}
