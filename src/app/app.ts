import {
  Component, inject, OnDestroy, OnInit
} from '@angular/core';
import {Header} from './components/header/header';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {Skills} from './components/skills/skills';
import {Experience} from './components/experience/experience';

@Component({
  selector: 'app-root',
  imports: [Header, Skills, Experience, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  private translate = inject(TranslateService);

  constructor() {
    this.translate.addLangs(['es', 'en']);
    const saved = (localStorage.getItem('lang') as 'es' | 'en') ?? 'es';
    this.translate.setDefaultLang('es');
    this.translate.use(saved);
  }

  techs = ['Go', 'FastAPI', 'Node.js'];
  currentIndex = 0;

  private intervalId?: number;

  ngOnInit(): void {
    this.intervalId = window.setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.techs.length;
    }, 2000); // cambia cada 2s
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
