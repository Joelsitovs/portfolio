import {Component, HostListener, OnInit, ViewChild,} from '@angular/core';
import {GridStackOptions, GridStackWidget} from 'gridstack';
import {Carousel, CarouselModule} from 'primeng/carousel';
import {TranslatePipe} from '@ngx-translate/core';
import {NgClass} from '@angular/common';

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
    CarouselModule,
    TranslatePipe,
    NgClass,
  ],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills implements OnInit {
  autoplayInterval: number = 3000;
  constructor() {
    Carousel.prototype.onTouchMove = function (event: TouchEvent) {
      const touch = event.touches[0];
      const deltaX = touch.clientX - this.startPos.x;
      const deltaY = touch.clientY - this.startPos.y;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        console.log('Horizontal move');
        if (event.cancelable) {
          event.preventDefault();
        }
      } else {
        console.log('Vertical move');
      }
    };
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const width = event.target.innerWidth;
    this.updateAutoplay(width);
    this.updateGridColumns(width);
    this.layoutCache = new WeakMap();
  }


  private updateAutoplay(width: number) {
    if (width <= 767) {
      this.autoplayInterval = 0;
    } else {
      this.autoplayInterval = 5000;
    }
  }

  private updateGridColumns(width: number) {
    let cols: number;

    if (width <= 500) {
      cols = 1;
    } else if (width <= 767) {
      cols = 2;
    } else {
      cols = 3;
    }

    this.frontendGridOptions = {
      ...this.frontendGridOptions,
      column: cols,
    };
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
    const width = window.innerWidth;
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1,

      },
      {
        breakpoint: '1199px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
        autoplayInterval: false,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
        autoplayInterval: false,

      }
    ]
    this.updateAutoplay(width);
    this.updateGridColumns(width);
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
  }

  onCarouselMouseLeave() {
    this.carousel.startAutoplay();
  }
/*  Carousel.prototype.onTouchMove = function (event: TouchEvent) {
    const touch = event.touches[0];
    const deltaX = touch.clientX - this.startPos.x;
    const deltaY = touch.clientY - this.startPos.y;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      console.log('Horizontal move');
      if (event.cancelable) {
        event.preventDefault();
      }
    } else {
      console.log('Vertical move');
    }
  };*/

  getBalancedRows(skills: Skill[], cols: number) {
    const rows: Skill[][] = [];

    for (let i = 0; i < skills.length; i += cols) {
      rows.push(skills.slice(i, i + cols));
    }

    // Si la última fila tiene solo 1 item, la mezclamos con la anterior
    const last = rows[rows.length - 1];
    if (last.length === 1 && rows.length > 1) {
      rows[rows.length - 2].push(...last); // fusiona el elemento con la fila anterior
      rows.pop(); // elimina la fila sobrante
    }

    return rows;
  }
  getCols(): number {
    const width = window.innerWidth;
    if (width >= 1280) return 4;
    if (width >= 1024) return 3;
    if (width >= 640) return 2;
    return 1;
  }
}
