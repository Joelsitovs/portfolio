import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@/app/core/i18n/translate.pipe';

interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  responsibilities: string[];
  techStack: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience {
  experiences: ExperienceItem[] = [
    {
      role: 'EXPERIENCE.JOBS.EXYT.ROLE',
      company: 'EXPERIENCE.JOBS.EXYT.COMPANY',
      location: 'EXPERIENCE.JOBS.EXYT.LOCATION',
      period: 'EXPERIENCE.JOBS.EXYT.PERIOD',
      description: 'EXPERIENCE.JOBS.EXYT.DESCRIPTION',
      responsibilities: [
        'EXPERIENCE.JOBS.EXYT.R1',
        'EXPERIENCE.JOBS.EXYT.R2',
        'EXPERIENCE.JOBS.EXYT.R3'
      ],
      techStack: ['Angular', 'TypeScript', 'Go','Java','Node', 'NET','Firestore', 'GCP', 'Docker', 'GitHub Actions']
    },

  ];
}
