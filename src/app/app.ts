import {Component, inject
} from '@angular/core';
import {Header} from './components/header/header';
import {TranslateService} from '@ngx-translate/core';
import {Skills} from './components/skills/skills';

@Component({
  selector: 'app-root',
  imports: [Header, Skills],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private translate = inject(TranslateService);

  constructor() {
    this.translate.addLangs(['es', 'en']);

    const saved = (localStorage.getItem('lang') as 'es' | 'en') ?? 'es';

    this.translate.setDefaultLang('es');
    this.translate.use(saved);
  }


}
