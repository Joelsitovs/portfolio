import {Component, inject, OnInit} from '@angular/core';
import {TranslatePipe, TranslateService} from "@ngx-translate/core";

import {NgClass} from '@angular/common';
import {ScrollService} from '../../service/scroll-service';

type Lang = 'en' | 'es';

@Component({
  selector: 'app-header',
  imports: [
    NgClass,
    TranslatePipe
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  currentLang: Lang = 'es';
  isMobileMenuOpen = false;
  private translate = inject(TranslateService);
  private scroll = inject(ScrollService);

  goToSkills() {
    this.scroll.scrollTo('Skills');
  }

  goToHome() {
    this.scroll.scrollTo('Home');
  }

  goToExperience() {
    this.scroll.scrollTo('Experience');
  }

  ngOnInit(): void {
    this.currentLang = (localStorage.getItem('lang') as Lang) || 'es';
  }

  toggleLanguage(): void {
    this.currentLang = this.currentLang === 'en' ? 'es' : 'en';
    this.translate.use(this.currentLang);
    localStorage.setItem('lang', this.currentLang);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
