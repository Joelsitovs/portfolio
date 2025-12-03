import {Component, HostListener, OnInit, ViewChild,} from '@angular/core';
import {GridstackComponent, GridstackItemComponent} from 'gridstack/dist/angular';
import {GridStackOptions, GridStackWidget} from 'gridstack';
import {Carousel, CarouselModule} from 'primeng/carousel';

export interface Skill {
  id?: string;
  name?: string;
  category?: string;
}

interface SkillSlide {
  title: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  imports: [
    GridstackComponent,
    GridstackItemComponent,
    CarouselModule,
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
      this.autoplayInterval = 0;      // en móvil: nunca autoplay
    } else {
      this.autoplayInterval = 5000;   // en desktop: autoplay
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
      title: 'Frontend',
      skills: [
        {id: 'html5', name: 'HTML5', category: 'Frontend'},
        {id: 'css3', name: 'CSS3', category: 'Frontend'},
        {id: 'javascript', name: 'JavaScript', category: 'Frontend'},
        {id: 'typescript', name: 'TypeScript', category: 'Frontend'},
        {id: 'angular', name: 'Angular', category: 'Framework'},
        {id: 'tailwindcss', name: 'TailwindCSS', category: 'Styling'},
        {id: 'primeng', name: 'PrimeNG', category: 'UI'},
      ],
    },
    {
      title: 'Backend y Bases de Datos',
      skills: [
        {id: 'go', name: 'Go'},
        {id: 'node', name: 'Node.js', category: 'Backend'},
        {id: 'fastapi', name: 'FastAPI', category: 'Backend'},
        {id: 'laravel', name: 'Laravel', category: 'Backend'},
        {id: 'mysql', name: 'MySQL', category: 'Database'},
        {id: 'postgres', name: 'PostgreSQL', category: 'Database'},
        {id: 'firestore', name: 'Firestore', category: 'Database'},
      ],
    },
    {
      title: 'DevOps y Herramientas',
      skills: [
        {id: 'docker', name: 'Docker', category: 'Containers'},
        {id: 'linux', name: 'Linux', category: 'OS'},
        {id: 'git', name: 'Git', category: 'Version Control'},
        {id: 'github-actions', name: 'GitHub Actions', category: 'CI/CD'},
        {id: 'nginx', name: 'Nginx', category: 'Web Server'},
        {id: 'jetbrains', name: 'JetBrains', category: 'IDE Suite'},

      ],
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
    this.carousel.stopAutoplay();  // Para el autoplay
    console.log('onCarouselMouseEnter');
  }

  onCarouselMouseLeave() {
    this.carousel.startAutoplay(); // Lo vuelve a iniciar
    console.log('onCarouselMouseLeave');
  }

}
