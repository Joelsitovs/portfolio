import {Component, inject, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import {TranslatePipe, TranslateService} from "@ngx-translate/core";

import {NgClass} from '@angular/common';

type Lang = 'en' | 'es';

@Component({
  selector: 'app-header',
  imports: [
    Button,
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


  ngOnInit(): void {
    this.currentLang = (localStorage.getItem('lang') as Lang) || 'es';
    this.translate.use(this.currentLang);
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
