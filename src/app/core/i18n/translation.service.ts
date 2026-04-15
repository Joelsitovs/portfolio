import { Injectable, signal, computed, effect } from '@angular/core';
import { TRANSLATIONS, Lang } from './translations';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  currentLang = signal<Lang>('es');

  translations = computed(() => TRANSLATIONS[this.currentLang()]);

  constructor() {
    const savedLang = localStorage.getItem('lang') as Lang;
    if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
      this.currentLang.set(savedLang);
    }

    effect(() => {
      localStorage.setItem('lang', this.currentLang());
    });
  }

  toggleLang() {
    this.currentLang.update(lang => lang === 'es' ? 'en' : 'es');
  }

  setLang(lang: Lang) {
    this.currentLang.set(lang);
  }

  translate(key: string): string {
    const keys = key.split('.');
    let value: any = this.translations();

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if not found
      }
    }

    return typeof value === 'string' ? value : key;
  }
}
