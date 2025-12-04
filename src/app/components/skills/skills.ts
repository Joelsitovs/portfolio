import {Component, HostListener, OnInit, ViewChild,} from '@angular/core';
import {GridstackComponent, GridstackItemComponent} from 'gridstack/dist/angular';
import {GridStackOptions, GridStackWidget} from 'gridstack';
import {Carousel, CarouselModule} from 'primeng/carousel';
import {TranslatePipe} from '@ngx-translate/core';

export interface Skill {
  id?: string;
  name?: string;
  category?: string;
}

interface SkillSlide {
  title: string;
  skills: Skill[];
  tagline: string;
}

@Component({
  selector: 'app-skills',
  imports: [
    GridstackComponent,
    GridstackItemComponent,
    CarouselModule,
    TranslatePipe,
  ],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills implements OnInit {
  autoplayInterval: number = 3000;


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateAutoplay(event.target.innerWidth);
  }

  private updateAutoplay(width: number) {
    if (width <= 767) {
      this.autoplayInterval = 0;
    } else {
      this.autoplayInterval = 5000;
    }
  }

  frontendGridOptions: GridStackOptions = {
    column: 3,
    cellHeight: 120,
    float: true,
    resizable: {
      handles: 'e,w'
    }
  };
  skillSlides: SkillSlide[] = [
    {
      title: 'skills.frontend.title',
      skills: [
        {id: 'html5', name: 'HTML5', category: 'Frontend'},
        {id: 'css3', name: 'CSS3', category: 'Frontend'},
        {id: 'javascript', name: 'JavaScript', category: 'Frontend'},
        {id: 'typescript', name: 'TypeScript', category: 'Frontend'},
        {id: 'tailwindcss', name: 'TailwindCSS', category: 'Styling'},
        {id: 'primeng', name: 'PrimeNG', category: 'UI'},
        {id: 'angular', name: 'Angular', category: 'Framework'},
      ],
      tagline: 'skills.frontend.tagline'

    },
    {
      title: 'skills.backend.title',
      skills: [
        {id: 'go', name: 'Go'},
        {id: 'node', name: 'Node.js', category: 'Backend'},
        {id: 'fastapi', name: 'FastAPI', category: 'Backend'},
        {id: 'laravel', name: 'Laravel', category: 'Backend'},
        {id: 'mysql', name: 'MySQL', category: 'Database'},
        {id: 'postgres', name: 'PostgreSQL', category: 'Database'},
        {id: 'firestore', name: 'Firestore', category: 'Database'},
      ],
      tagline: 'skills.backend.tagline'

    },
    {
      title: 'skills.devops.title',
      skills: [
        {id: 'docker', name: 'Docker', category: 'Containers'},
        {id: 'linux', name: 'Linux', category: 'OS'},
        {id: 'git', name: 'Git', category: 'Version Control'},
        {id: 'github', name: 'GitHub', category: 'Code Hosting'},
        {id: 'github-actions', name: 'GitHub Actions', category: 'CI/CD'},
        {id: 'nginx', name: 'Nginx', category: 'Web Server'},
        {id: 'jetbrains', name: 'JetBrains', category: 'IDE Suite'},
      ],
      tagline: 'skills.devops.tagline'

    },
    {
      title: 'skills.cloud.title',
      skills: [
        {id: 'gcp', name: 'Google Cloud', category: 'Cloud'},
      ],
      tagline: 'skills.cloud.tagline'

    }
  ];

  responsiveOptions: any[] | undefined;


  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,

      }
    ]
    this.updateAutoplay(window.innerWidth);
  }

  private layoutCache = new WeakMap<SkillSlide, GridStackWidget[]>();

  getLayout(slide: SkillSlide): GridStackWidget[] {
    const cached = this.layoutCache.get(slide);
    if (cached) return cached;

    const total = slide.skills.length;

    const rawCols = this.frontendGridOptions.column;
    const cols: number = typeof rawCols === 'number' ? rawCols : 3;

    const layout = slide.skills.map((skill, i) => {
      let x = i % cols;
      const y = Math.floor(i / cols);
      let w = 1;

      const remainder = total % cols;
      const lastRowStart = total - remainder;
      const isLastRow = remainder !== 0 && i >= lastRowStart;

      if (isLastRow) {
        if (remainder === 1 && i === total - 1) {
          x = 0;
          w = cols;
        } else if (remainder === 2) {
          if (i === total - 2) {
            x = 0;
            w = 2;
          }
          if (i === total - 1) {
            x = 2;
            w = 1;
          }
        }
      }

      return {
        x,
        y,
        w,
        h: 1,
        id: skill.id,
      } as GridStackWidget;
    });

    this.layoutCache.set(slide, layout);
    return layout;
  }

  @ViewChild(Carousel) carousel!: Carousel;

  onCarouselMouseEnter() {
    this.carousel.stopAutoplay();
    console.log('onCarouselMouseEnter');
  }

  onCarouselMouseLeave() {
    this.carousel.startAutoplay();
    console.log('onCarouselMouseLeave');
  }

}
