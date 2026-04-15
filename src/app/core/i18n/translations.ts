export type Lang = 'es' | 'en';

export const TRANSLATIONS = {
  es: {
    NAV: {
      HOME: 'Inicio',
      ABOUT: 'Sobre mí',
      SKILLS: 'Habilidades',
      PROJECTS: 'Proyectos',
      EXPERIENCE: 'Trayectoria',
      CONTACT: 'Contacto',
    },
    ABOUT: {
      ROLE: 'Full-Stack Developer',
      DESC_1: 'Construyendo soluciones eficientes con un enfoque en <span class="text-white font-medium">código limpio y sistemas escalables</span>.',
      DESC_2: 'Me especializo en el desarrollo de interfaces dinámicas con <span class="text-emerald-400 font-medium">Angular</span> y la creación de servicios ágiles utilizando <span class="text-emerald-400 font-medium">Go</span> y <span class="text-emerald-400 font-medium">FastAPI</span>.',
      DESC_3: 'Mi día a día se centra en aprender y aplicar mejores prácticas de <span class="text-white font-medium">automatización</span> y despliegue, aprovechando las herramientas de <span class="text-zinc-200 border-b border-emerald-500/40">Google Cloud</span> para garantizar entornos estables y preparados para el crecimiento.',
      EXPERTISE: 'Expertise Stack',
      PERF_TITLE: 'Rendimiento',
      PERF_DESC: 'Interfaces optimizadas con Core Web Vitals en mente.',
      SCALE_TITLE: 'Escalabilidad',
      SCALE_DESC: 'Sistemas distribuidos listos para tráfico masivo.',
      ACTIVE: ' disponible',
      LATENCY: ' 2-6 h',
    },
    SKILLS: {
      TITLE: 'Arsenal <span class="text-emerald-400">Técnico</span>',
      SUBTITLE: 'Un stack curado de tecnologías que uso para construir aplicaciones robustas y escalables.',
      LOAD_MORE: 'Ver más',
      CATS: {
        ALL: 'Todos',
        FRONTEND: 'Frontend',
        LANGUAGE: 'Lenguajes',
        BACKEND: 'Backend',
        RUNTIME: 'Runtime',
        FRAMEWORK: 'Frameworks',
        CSS: 'CSS',
        STRUCTURE: 'Estructura',
        STYLING: 'Estilizado',
        DEVOPS: 'DevOps',
        CLOUD: 'Cloud',
        DATABASE: 'Bases de datos'
      }
    },
    PROJECTS: {
      TITLE: 'Proyectos',
      SUBTITLE: 'Repositorios de GitHub y demos',
      SEARCH_PLACEHOLDER: 'Buscar proyectos...',
      FILTERS: {
        ALL: 'Todos'
      },
      CARD: {
        FIXED: 'Fijado',
        REPO: 'Repositorio',
        DEMO: 'Demo'
      },
      EMPTY: 'No se encontraron proyectos con esos criterios.',
      FOOTER: 'Más en GitHub. Actualizo estos proyectos con frecuencia.',
      LIST: {
        CHAT_DESC: 'Chat en tiempo real con Angular + Firebase Auth + Cloud Firestore.',
        PORTFOLIO_DESC: 'Portfolio personal con i18n, UI limpia y componentes controlados por datos.',
        KARAOKE_DESC: 'App de karaoke que busca letras, separa la voz de la base instrumental y te permite cantar sobre la pista.'
      }
    },
    EXPERIENCE: {
      TITLE: 'Trayectoria',
      TITLE_HIGHLIGHT: 'Profesional',
      SUBTITLE: 'Roles, responsabilidades e impacto en proyectos reales.',
      PHILOSOPHY: {
        P1_TITLE: 'Entrega end-to-end',
        P1_DESC: 'De la interfaz al backend y el despliegue. Priorizo sistemas completos y estables.',
        P2_TITLE: 'Automatización',
        P2_DESC: 'CI/CD, scripts y tooling interno para reducir fricción y errores humanos.',
        P3_TITLE: 'Performance',
        P3_DESC: 'Carga incremental, caché y optimización de llamadas para experiencias rápidas.',
        P4_TITLE: 'Calidad',
        P4_DESC: 'Código mantenible, validaciones claras y patrones consistentes.'
      },
      JOBS: {
        EXYT: {
          ROLE: 'Desarrollador Full-Stack',
          COMPANY: 'Exyt Control S.L',
          LOCATION: 'Remoto',
          PERIOD: 'Mar 2025 — Dic 2025',
          DESCRIPTION: 'Especializado en la construcción de interfaces reactivas con Angular y el desarrollo de APIs de alto rendimiento. Enfocado en la automatización de despliegues, mantenibilidad del código y entrega de soluciones end-to-end bajo arquitecturas cloud-native.',
          R1: 'Diseñé e implementé módulos completos (CRUD, filtros, tablas, formularios reactivos y componentes reutilizables).',
          R2: 'Integré pipelines CI/CD y despliegues en cloud con configuración reproducible.',
          R3: 'Optimicé flujos (caché, carga incremental, reducción de llamadas) para mejorar tiempos y coste operativo.'
        }
      }
    },
    CONTACT: {
      TITLE: 'Conversemos',
      SUBTITLE: 'Si tienes un proyecto en mente o quieres mejorar un sistema existente, escríbeme y te respondo lo antes posible.',
      AVAILABLE: 'Disponible',
      EMAIL: 'Email',
      RESPONSE_TIME: 'Respuesta en 2–12h',
      LOCATION: {
        TITLE: 'Ubicación',
        VALUE: 'Remoto / España',
        SUB: 'Trabajo remoto'
      },
      SOCIALS: 'Redes',
      FORM: {
        TITLE: 'Envíame un mensaje',
        NAME: 'Nombre',
        NAME_PLACEHOLDER: 'Tu nombre',
        EMAIL: 'Email',
        EMAIL_PLACEHOLDER: 'tu@email.com',
        SUBJECT: 'Asunto',
        SUBJECT_PLACEHOLDER: 'Ej: Web app en Angular + API en Go',
        MESSAGE: 'Mensaje',
        MESSAGE_PLACEHOLDER: 'Cuéntame qué necesitas…',
        SUBMIT: 'Enviar Mensaje',
        RESPONSE: 'Tiempo de respuesta: 2–12h'
      }
    }
  },
  en: {
    NAV: {
      HOME: 'Home',
      ABOUT: 'About',
      SKILLS: 'Skills',
      PROJECTS: 'Projects',
      EXPERIENCE: 'Experience',
      CONTACT: 'Contact',
    },
    ABOUT: {
      ROLE: 'Full-Stack Developer',
      DESC_1: 'Building efficient solutions with a focus on <span class="text-white font-medium">clean code and scalable systems</span>.',
      DESC_2: 'I specialize in developing dynamic interfaces with <span class="text-emerald-400 font-medium">Angular</span> and creating agile services using <span class="text-emerald-400 font-medium">Go</span> and <span class="text-emerald-400 font-medium">FastAPI</span>.',
      DESC_3: 'My day-to-day focuses on learning and applying best practices in <span class="text-white font-medium">automation</span> and deployment, leveraging <span class="text-zinc-200 border-b border-emerald-500/40">Google Cloud</span> tools to ensure stable environments ready for growth.',
      EXPERTISE: 'Expertise Stack',
      PERF_TITLE: 'Performance',
      PERF_DESC: 'Optimized interfaces with Core Web Vitals in mind.',
      SCALE_TITLE: 'Scalability',
      SCALE_DESC: 'Distributed systems ready for massive traffic.',
      ACTIVE: ' Available',
      LATENCY: ' 2-6h'
    },
    SKILLS: {
      TITLE: 'Technical <span class="text-emerald-400">Arsenal</span>',
      SUBTITLE: 'A curated stack of technologies I use to build robust, scalable applications.',
      LOAD_MORE: 'Load more',
      CATS: {
        ALL: 'All',
        FRONTEND: 'Frontend',
        LANGUAGE: 'Languages',
        BACKEND: 'Backend',
        RUNTIME: 'Runtime',
        FRAMEWORK: 'Frameworks',
        CSS: 'CSS',
        STRUCTURE: 'Structure',
        STYLING: 'Styling',
        DEVOPS: 'DevOps',
        CLOUD: 'Cloud',
        DATABASE: 'Databases'
      }
    },
    PROJECTS: {
      TITLE: 'Projects',
      SUBTITLE: 'GitHub repositories and demos',
      SEARCH_PLACEHOLDER: 'Search projects...',
      FILTERS: {
        ALL: 'All'
      },
      CARD: {
        FIXED: 'Pinned',
        REPO: 'Repository',
        DEMO: 'Demo'
      },
      EMPTY: 'No projects found with these criteria.',
      FOOTER: 'More on GitHub. I update these projects frequently.',
      LIST: {
        CHAT_DESC: 'Real-time chat with Angular + Firebase Auth + Cloud Firestore.',
        PORTFOLIO_DESC: 'Personal portfolio with i18n, clean UI, and data-driven components.',
        KARAOKE_DESC: 'Karaoke app that fetches lyrics, separates vocals from the instrumental track, and lets you sing along.'
      }
    },
    EXPERIENCE: {
      TITLE: 'Professional',
      TITLE_HIGHLIGHT: 'Trajectory',
      SUBTITLE: 'Roles, responsibilities, and impact on real projects.',
      PHILOSOPHY: {
        P1_TITLE: 'End-to-end Delivery',
        P1_DESC: 'From interface to backend and deployment. I prioritize complete and stable systems.',
        P2_TITLE: 'Automation',
        P2_DESC: 'CI/CD, scripts, and internal tooling to reduce friction and human errors.',
        P3_TITLE: 'Performance',
        P3_DESC: 'Incremental loading, caching, and call optimization for fast experiences.',
        P4_TITLE: 'Quality',
        P4_DESC: 'Maintainable code, clear validations, and consistent patterns.'
      },
      JOBS: {
        EXYT: {
          ROLE: 'Full-Stack Developer',
          COMPANY: 'Exyt Control S.L',
          LOCATION: 'Remote',
          PERIOD: 'Mar 2025 — Dec 2025',
          DESCRIPTION: 'Specialized in building reactive interfaces with Angular and developing high-performance APIs. Focused on deployment automation, code maintainability, and delivering end-to-end solutions under cloud-native architectures.',
          R1: 'Designed and implemented complete modules (CRUD, filters, tables, reactive forms, and reusable components).',
          R2: 'Integrated CI/CD pipelines and cloud deployments with reproducible configuration.',
          R3: 'Optimized flows (caching, incremental loading, call reduction) to improve times and operational cost.'
        }
      }
    },
    CONTACT: {
      TITLE: 'Let\'s Talk',
      SUBTITLE: 'If you have a project in mind or want to improve an existing system, write to me and I\'ll respond as soon as possible.',
      AVAILABLE: 'Available',
      EMAIL: 'Email',
      RESPONSE_TIME: 'Response in 2–12h',
      LOCATION: {
        TITLE: 'Location',
        VALUE: 'Remote / Spain',
        SUB: 'Remote work'
      },
      SOCIALS: 'Socials',
      FORM: {
        TITLE: 'Send me a message',
        NAME: 'Name',
        NAME_PLACEHOLDER: 'Your name',
        EMAIL: 'Email',
        EMAIL_PLACEHOLDER: 'you@email.com',
        SUBJECT: 'Subject',
        SUBJECT_PLACEHOLDER: 'Ex: Web app in Angular + API in Go',
        MESSAGE: 'Message',
        MESSAGE_PLACEHOLDER: 'Tell me what you need…',
        SUBMIT: 'Send Message',
        RESPONSE: 'Response time: 2–12h'
      }
    }
  }
};
