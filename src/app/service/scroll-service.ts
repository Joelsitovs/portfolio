import {effect, Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  readonly scrollRequest = signal<{ id: string; nonce: number } | null>(null);
  private nonce = 0;

  constructor() {
    effect(() => {
      const req = this.scrollRequest();
      if (!req) return;

      const { id } = req;

      const doScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      };

      doScroll();

      setTimeout(doScroll, 300);
    });
  }

  scrollTo(id: string) {
    this.nonce++;
    this.scrollRequest.set({ id, nonce: this.nonce });
  }
}
