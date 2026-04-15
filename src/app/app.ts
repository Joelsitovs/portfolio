import {Component, inject, signal} from '@angular/core';
import {Header} from '@/app/layout/header/header';
import {About} from '@/app/features/about/about';
import {Skills} from '@/app/features/skills/skills';
import {Projects} from '@/app/features/projects/projects';
import {Experience} from '@/app/features/experience/experience';
import {Contact} from '@/app/features/contact/contact';
import {NavigationService} from '@/app/core/services/navigation.service';


@Component({
  selector: 'app-root',
  imports: [Header, About, Skills, Projects, Experience, Contact],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Porfolio');
  protected readonly navService = inject(NavigationService);
}
