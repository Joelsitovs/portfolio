import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  // Signals to force loading of sections
  projectsLoaded = signal(false);
  skillsLoaded = signal(false);
  experienceLoaded = signal(false);
  contactLoaded = signal(false);

  triggerLoad(section: string) {
    switch (section) {
      case 'projects':
        this.projectsLoaded.set(true);
        break;
      case 'skills':
        this.skillsLoaded.set(true);
        break;
      case 'experience':
        this.experienceLoaded.set(true);
        break;
      case 'contact':
        this.contactLoaded.set(true);
        break;
    }
  }

  async scrollToSection(sectionId: string) {
    this.triggerLoad(sectionId.replace('#', ''));
    
    // Allow Angular to render the component
    setTimeout(() => {
      const element = document.querySelector(sectionId.startsWith('#') ? sectionId : '#' + sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
}
