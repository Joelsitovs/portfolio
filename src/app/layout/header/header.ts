import {Component, inject} from '@angular/core';
import {TranslationService} from '@/app/core/i18n/translation.service';
import {NavigationService} from '@/app/core/services/navigation.service';
import {TranslatePipe} from '@/app/core/i18n/translate.pipe';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslatePipe, NgClass],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  ts = inject(TranslationService);
  navService = inject(NavigationService);
  x = 0;
  y = 0;
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  scrollToSection(section: string, event: Event) {
    event.preventDefault();
    this.menuOpen = false; // Close menu on selection
    this.navService.scrollToSection(section);
  }

  onMouseMove(event: MouseEvent) {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this.x = event.clientX - rect.left;
    this.y = event.clientY - rect.top;
  }

  toggleLanguage() {
    this.ts.toggleLang();
  }
}
