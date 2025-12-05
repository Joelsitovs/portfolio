import {
  Component, inject, OnDestroy, OnInit
} from '@angular/core';
import {Header} from './components/header/header';
import {Skills} from './components/skills/skills';
import {Home} from './components/home/home';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [Header, Skills, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  {
  private translate = inject(TranslateService);

  constructor() {
    this.translate.addLangs(['es', 'en']);
    const saved = (localStorage.getItem('lang') as 'es' | 'en') ?? 'es';
    this.translate.use(saved);
  }
}
