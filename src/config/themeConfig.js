// Theme Customizer Configuration
// Set ENABLE_THEME_CUSTOMIZER to true to show the theme customizer panel
// Set to false to hide it from the client
export const ENABLE_THEME_CUSTOMIZER = false;

// Brand Colors from Brand Identity Guide - Available for selection
export const BRAND_COLORS = [
  {
    id: 'darkBlue',
    hex: '#002335',
    name: { es: 'Azul Oscuro', en: 'Dark Blue' },
    description: { es: 'Color principal de marca', en: 'Main brand color' }
  },
  {
    id: 'mediumBlue',
    hex: '#014086',
    name: { es: 'Azul Medio', en: 'Medium Blue' },
    description: { es: 'Azul alternativo', en: 'Alternative blue' }
  },
  {
    id: 'oliveGreen',
    hex: '#5C7205',
    name: { es: 'Verde Oliva', en: 'Olive Green' },
    description: { es: 'Color secundario', en: 'Secondary color' }
  },
  {
    id: 'limeGreen',
    hex: '#8A862F',
    name: { es: 'Verde Lima', en: 'Lime Green' },
    description: { es: 'Verde acentuado', en: 'Accent green' }
  },
  {
    id: 'lightBg',
    hex: '#F4FFE6',
    name: { es: 'Beige Claro', en: 'Light Beige' },
    description: { es: 'Fondo suave', en: 'Soft background' }
  },
  {
    id: 'lightGray',
    hex: '#DADADA',
    name: { es: 'Gris Claro', en: 'Light Gray' },
    description: { es: 'Gris neutral', en: 'Neutral gray' }
  },
  {
    id: 'black',
    hex: '#000000',
    name: { es: 'Negro', en: 'Black' },
    description: { es: 'Alto contraste', en: 'High contrast' }
  },
  {
    id: 'white',
    hex: '#FFFFFF',
    name: { es: 'Blanco', en: 'White' },
    description: { es: 'Fondo claro', en: 'Light background' }
  }
];

// Default theme configuration organized by pages
export const DEFAULT_THEME = {
  // Global Elements
  global_headerBg: '#002335',
  global_headerText: '#FFFFFF',
  global_navLinks: '#FFFFFF',
  global_navLinksHover: '#8A862F',
  global_footerBg: '#002335',
  global_footerText: '#FFFFFF',
  global_footerLinks: '#8A862F',

  // Home Page
  home_heroBg: '#002335',
  home_heroText: '#FFFFFF',
  home_heroSubtitle: '#DADADA',
  home_heroButtons: '#5C7205',
  home_heroButtonsText: '#FFFFFF',
  home_featuredBg: '#F4FFE6',
  home_featuredTitle: '#002335',
  home_cardBg: '#FFFFFF',
  home_cardText: '#000000',
  home_cardHover: '#5C7205',
  home_servicesBg: '#FFFFFF',
  home_servicesTitle: '#002335',
  home_servicesCards: '#F4FFE6',
  home_philosophyBg: '#F4FFE6',
  home_philosophyText: '#002335',
  home_testimonialsBg: '#FFFFFF',
  home_testimonialsCards: '#F4FFE6',
  home_contactBg: '#002335',
  home_contactText: '#FFFFFF',

  // Projects Page
  projects_heroBg: '#002335',
  projects_heroText: '#FFFFFF',
  projects_filterBg: '#F4FFE6',
  projects_filterButtons: '#5C7205',
  projects_filterButtonsActive: '#8A862F',
  projects_gridBg: '#F4FFE6',
  projects_cardBg: '#FFFFFF',
  projects_cardText: '#000000',
  projects_cardHover: '#5C7205',

  // Project Detail Page
  projectDetail_heroBg: '#002335',
  projectDetail_heroText: '#FFFFFF',
  projectDetail_metaBg: '#F4FFE6',
  projectDetail_metaText: '#002335',
  projectDetail_contentBg: '#FFFFFF',
  projectDetail_contentText: '#000000',
  projectDetail_galleryBg: '#F4FFE6',
  projectDetail_featuresBg: '#FFFFFF',
  projectDetail_featuresAccent: '#5C7205',

  // Services Page
  services_heroBg: '#002335',
  services_heroText: '#FFFFFF',
  services_serviceBg: '#F4FFE6',
  services_serviceCards: '#FFFFFF',
  services_serviceTitle: '#002335',
  services_processBg: '#FFFFFF',
  services_processCards: '#F4FFE6',
  services_processAccent: '#5C7205',

  // About Page
  about_heroBg: '#002335',
  about_heroText: '#FFFFFF',
  about_contentBg: '#F4FFE6',
  about_contentText: '#002335',
  about_valuesBg: '#FFFFFF',
  about_valuesCards: '#F4FFE6',
  about_valuesAccent: '#5C7205',
  about_teamBg: '#F4FFE6',

  // Contact Page
  contact_heroBg: '#002335',
  contact_heroText: '#FFFFFF',
  contact_formBg: '#FFFFFF',
  contact_formInputs: '#F4FFE6',
  contact_formButtons: '#5C7205',
  contact_infoBg: '#F4FFE6',
  contact_infoText: '#002335',
  contact_infoIcons: '#5C7205'
};

// Pages and their sections organized hierarchically
export const PAGES_STRUCTURE = [
  {
    id: 'global',
    name: { es: 'Elementos Globales', en: 'Global Elements' },
    icon: 'fa-globe',
    description: { es: 'Header, Footer y Navegación', en: 'Header, Footer and Navigation' },
    sections: [
      {
        id: 'global_headerBg',
        label: { es: 'Fondo del Header', en: 'Header Background' },
        icon: 'fa-bars',
        cssVars: ['--global-header-bg', '--primary-color']
      },
      {
        id: 'global_headerText',
        label: { es: 'Texto del Header', en: 'Header Text' },
        icon: 'fa-font',
        cssVars: ['--global-header-text', '--light-text']
      },
      {
        id: 'global_navLinks',
        label: { es: 'Enlaces de Navegación', en: 'Navigation Links' },
        icon: 'fa-link',
        cssVars: ['--global-nav-links']
      },
      {
        id: 'global_navLinksHover',
        label: { es: 'Enlaces Hover', en: 'Links Hover' },
        icon: 'fa-hand-pointer',
        cssVars: ['--global-nav-links-hover']
      },
      {
        id: 'global_footerBg',
        label: { es: 'Fondo del Footer', en: 'Footer Background' },
        icon: 'fa-rectangle-xmark',
        cssVars: ['--global-footer-bg']
      },
      {
        id: 'global_footerText',
        label: { es: 'Texto del Footer', en: 'Footer Text' },
        icon: 'fa-font',
        cssVars: ['--global-footer-text']
      },
      {
        id: 'global_footerLinks',
        label: { es: 'Enlaces del Footer', en: 'Footer Links' },
        icon: 'fa-link',
        cssVars: ['--global-footer-links']
      }
    ]
  },
  {
    id: 'home',
    name: { es: 'Página de Inicio', en: 'Home Page' },
    icon: 'fa-home',
    description: { es: 'Hero, Proyectos, Servicios, Testimonios', en: 'Hero, Projects, Services, Testimonials' },
    sections: [
      {
        id: 'home_heroBg',
        label: { es: 'Hero - Fondo', en: 'Hero - Background' },
        icon: 'fa-image',
        cssVars: ['--home-hero-bg']
      },
      {
        id: 'home_heroText',
        label: { es: 'Hero - Título', en: 'Hero - Title' },
        icon: 'fa-heading',
        cssVars: ['--home-hero-text']
      },
      {
        id: 'home_heroSubtitle',
        label: { es: 'Hero - Subtítulo', en: 'Hero - Subtitle' },
        icon: 'fa-paragraph',
        cssVars: ['--home-hero-subtitle']
      },
      {
        id: 'home_heroButtons',
        label: { es: 'Hero - Botones', en: 'Hero - Buttons' },
        icon: 'fa-square',
        cssVars: ['--home-hero-buttons', '--accent-color']
      },
      {
        id: 'home_heroButtonsText',
        label: { es: 'Hero - Texto Botones', en: 'Hero - Button Text' },
        icon: 'fa-font',
        cssVars: ['--home-hero-buttons-text']
      },
      {
        id: 'home_featuredBg',
        label: { es: 'Proyectos Destacados - Fondo', en: 'Featured Projects - Background' },
        icon: 'fa-square-full',
        cssVars: ['--home-featured-bg', '--secondary-color']
      },
      {
        id: 'home_featuredTitle',
        label: { es: 'Proyectos Destacados - Título', en: 'Featured Projects - Title' },
        icon: 'fa-heading',
        cssVars: ['--home-featured-title']
      },
      {
        id: 'home_cardBg',
        label: { es: 'Tarjetas de Proyecto - Fondo', en: 'Project Cards - Background' },
        icon: 'fa-id-card',
        cssVars: ['--home-card-bg', '--white']
      },
      {
        id: 'home_cardText',
        label: { es: 'Tarjetas de Proyecto - Texto', en: 'Project Cards - Text' },
        icon: 'fa-font',
        cssVars: ['--home-card-text']
      },
      {
        id: 'home_cardHover',
        label: { es: 'Tarjetas - Color Hover', en: 'Cards - Hover Color' },
        icon: 'fa-hand-pointer',
        cssVars: ['--home-card-hover']
      },
      {
        id: 'home_servicesBg',
        label: { es: 'Servicios - Fondo', en: 'Services - Background' },
        icon: 'fa-briefcase',
        cssVars: ['--home-services-bg']
      },
      {
        id: 'home_servicesTitle',
        label: { es: 'Servicios - Título', en: 'Services - Title' },
        icon: 'fa-heading',
        cssVars: ['--home-services-title']
      },
      {
        id: 'home_servicesCards',
        label: { es: 'Servicios - Tarjetas', en: 'Services - Cards' },
        icon: 'fa-id-card',
        cssVars: ['--home-services-cards']
      },
      {
        id: 'home_philosophyBg',
        label: { es: 'Filosofía - Fondo', en: 'Philosophy - Background' },
        icon: 'fa-lightbulb',
        cssVars: ['--home-philosophy-bg']
      },
      {
        id: 'home_philosophyText',
        label: { es: 'Filosofía - Texto', en: 'Philosophy - Text' },
        icon: 'fa-font',
        cssVars: ['--home-philosophy-text']
      },
      {
        id: 'home_testimonialsBg',
        label: { es: 'Testimonios - Fondo', en: 'Testimonials - Background' },
        icon: 'fa-quote-left',
        cssVars: ['--home-testimonials-bg']
      },
      {
        id: 'home_testimonialsCards',
        label: { es: 'Testimonios - Tarjetas', en: 'Testimonials - Cards' },
        icon: 'fa-id-card',
        cssVars: ['--home-testimonials-cards']
      },
      {
        id: 'home_contactBg',
        label: { es: 'Contacto - Fondo', en: 'Contact - Background' },
        icon: 'fa-envelope',
        cssVars: ['--home-contact-bg']
      },
      {
        id: 'home_contactText',
        label: { es: 'Contacto - Texto', en: 'Contact - Text' },
        icon: 'fa-font',
        cssVars: ['--home-contact-text']
      }
    ]
  },
  {
    id: 'projects',
    name: { es: 'Página de Proyectos', en: 'Projects Page' },
    icon: 'fa-folder-open',
    description: { es: 'Galería y filtros de proyectos', en: 'Gallery and project filters' },
    sections: [
      {
        id: 'projects_heroBg',
        label: { es: 'Hero - Fondo', en: 'Hero - Background' },
        icon: 'fa-image',
        cssVars: ['--projects-hero-bg']
      },
      {
        id: 'projects_heroText',
        label: { es: 'Hero - Texto', en: 'Hero - Text' },
        icon: 'fa-font',
        cssVars: ['--projects-hero-text']
      },
      {
        id: 'projects_filterBg',
        label: { es: 'Filtros - Fondo', en: 'Filters - Background' },
        icon: 'fa-filter',
        cssVars: ['--projects-filter-bg']
      },
      {
        id: 'projects_filterButtons',
        label: { es: 'Filtros - Botones', en: 'Filters - Buttons' },
        icon: 'fa-square',
        cssVars: ['--projects-filter-buttons']
      },
      {
        id: 'projects_filterButtonsActive',
        label: { es: 'Filtros - Botón Activo', en: 'Filters - Active Button' },
        icon: 'fa-check-square',
        cssVars: ['--projects-filter-buttons-active', '--accent-secondary']
      },
      {
        id: 'projects_gridBg',
        label: { es: 'Grid - Fondo', en: 'Grid - Background' },
        icon: 'fa-th',
        cssVars: ['--projects-grid-bg']
      },
      {
        id: 'projects_cardBg',
        label: { es: 'Tarjetas - Fondo', en: 'Cards - Background' },
        icon: 'fa-id-card',
        cssVars: ['--projects-card-bg']
      },
      {
        id: 'projects_cardText',
        label: { es: 'Tarjetas - Texto', en: 'Cards - Text' },
        icon: 'fa-font',
        cssVars: ['--projects-card-text']
      },
      {
        id: 'projects_cardHover',
        label: { es: 'Tarjetas - Hover', en: 'Cards - Hover' },
        icon: 'fa-hand-pointer',
        cssVars: ['--projects-card-hover']
      }
    ]
  },
  {
    id: 'projectDetail',
    name: { es: 'Detalle de Proyecto', en: 'Project Detail' },
    icon: 'fa-file-alt',
    description: { es: 'Página individual de proyecto', en: 'Individual project page' },
    sections: [
      {
        id: 'projectDetail_heroBg',
        label: { es: 'Hero - Fondo', en: 'Hero - Background' },
        icon: 'fa-image',
        cssVars: ['--project-detail-hero-bg']
      },
      {
        id: 'projectDetail_heroText',
        label: { es: 'Hero - Texto', en: 'Hero - Text' },
        icon: 'fa-font',
        cssVars: ['--project-detail-hero-text']
      },
      {
        id: 'projectDetail_metaBg',
        label: { es: 'Información Meta - Fondo', en: 'Meta Info - Background' },
        icon: 'fa-info-circle',
        cssVars: ['--project-detail-meta-bg']
      },
      {
        id: 'projectDetail_metaText',
        label: { es: 'Información Meta - Texto', en: 'Meta Info - Text' },
        icon: 'fa-font',
        cssVars: ['--project-detail-meta-text']
      },
      {
        id: 'projectDetail_contentBg',
        label: { es: 'Contenido - Fondo', en: 'Content - Background' },
        icon: 'fa-square-full',
        cssVars: ['--project-detail-content-bg']
      },
      {
        id: 'projectDetail_contentText',
        label: { es: 'Contenido - Texto', en: 'Content - Text' },
        icon: 'fa-font',
        cssVars: ['--project-detail-content-text']
      },
      {
        id: 'projectDetail_galleryBg',
        label: { es: 'Galería - Fondo', en: 'Gallery - Background' },
        icon: 'fa-images',
        cssVars: ['--project-detail-gallery-bg']
      },
      {
        id: 'projectDetail_featuresBg',
        label: { es: 'Características - Fondo', en: 'Features - Background' },
        icon: 'fa-list',
        cssVars: ['--project-detail-features-bg']
      },
      {
        id: 'projectDetail_featuresAccent',
        label: { es: 'Características - Acento', en: 'Features - Accent' },
        icon: 'fa-star',
        cssVars: ['--project-detail-features-accent']
      }
    ]
  },
  {
    id: 'services',
    name: { es: 'Página de Servicios', en: 'Services Page' },
    icon: 'fa-briefcase',
    description: { es: 'Servicios y proceso de trabajo', en: 'Services and work process' },
    sections: [
      {
        id: 'services_heroBg',
        label: { es: 'Hero - Fondo', en: 'Hero - Background' },
        icon: 'fa-image',
        cssVars: ['--services-hero-bg']
      },
      {
        id: 'services_heroText',
        label: { es: 'Hero - Texto', en: 'Hero - Text' },
        icon: 'fa-font',
        cssVars: ['--services-hero-text']
      },
      {
        id: 'services_serviceBg',
        label: { es: 'Sección Servicios - Fondo', en: 'Services Section - Background' },
        icon: 'fa-square-full',
        cssVars: ['--services-service-bg']
      },
      {
        id: 'services_serviceCards',
        label: { es: 'Tarjetas de Servicio - Fondo', en: 'Service Cards - Background' },
        icon: 'fa-id-card',
        cssVars: ['--services-service-cards']
      },
      {
        id: 'services_serviceTitle',
        label: { es: 'Servicios - Títulos', en: 'Services - Titles' },
        icon: 'fa-heading',
        cssVars: ['--services-service-title']
      },
      {
        id: 'services_processBg',
        label: { es: 'Proceso - Fondo', en: 'Process - Background' },
        icon: 'fa-tasks',
        cssVars: ['--services-process-bg']
      },
      {
        id: 'services_processCards',
        label: { es: 'Proceso - Tarjetas', en: 'Process - Cards' },
        icon: 'fa-id-card',
        cssVars: ['--services-process-cards']
      },
      {
        id: 'services_processAccent',
        label: { es: 'Proceso - Color Acento', en: 'Process - Accent Color' },
        icon: 'fa-star',
        cssVars: ['--services-process-accent']
      }
    ]
  },
  {
    id: 'about',
    name: { es: 'Página Nosotros', en: 'About Page' },
    icon: 'fa-users',
    description: { es: 'Información y valores del estudio', en: 'Studio information and values' },
    sections: [
      {
        id: 'about_heroBg',
        label: { es: 'Hero - Fondo', en: 'Hero - Background' },
        icon: 'fa-image',
        cssVars: ['--about-hero-bg']
      },
      {
        id: 'about_heroText',
        label: { es: 'Hero - Texto', en: 'Hero - Text' },
        icon: 'fa-font',
        cssVars: ['--about-hero-text']
      },
      {
        id: 'about_contentBg',
        label: { es: 'Contenido - Fondo', en: 'Content - Background' },
        icon: 'fa-square-full',
        cssVars: ['--about-content-bg']
      },
      {
        id: 'about_contentText',
        label: { es: 'Contenido - Texto', en: 'Content - Text' },
        icon: 'fa-font',
        cssVars: ['--about-content-text']
      },
      {
        id: 'about_valuesBg',
        label: { es: 'Valores - Fondo', en: 'Values - Background' },
        icon: 'fa-heart',
        cssVars: ['--about-values-bg']
      },
      {
        id: 'about_valuesCards',
        label: { es: 'Valores - Tarjetas', en: 'Values - Cards' },
        icon: 'fa-id-card',
        cssVars: ['--about-values-cards']
      },
      {
        id: 'about_valuesAccent',
        label: { es: 'Valores - Acento', en: 'Values - Accent' },
        icon: 'fa-star',
        cssVars: ['--about-values-accent']
      },
      {
        id: 'about_teamBg',
        label: { es: 'Equipo - Fondo', en: 'Team - Background' },
        icon: 'fa-users',
        cssVars: ['--about-team-bg']
      }
    ]
  },
  {
    id: 'contact',
    name: { es: 'Página de Contacto', en: 'Contact Page' },
    icon: 'fa-envelope',
    description: { es: 'Formulario e información de contacto', en: 'Contact form and information' },
    sections: [
      {
        id: 'contact_heroBg',
        label: { es: 'Hero - Fondo', en: 'Hero - Background' },
        icon: 'fa-image',
        cssVars: ['--contact-hero-bg']
      },
      {
        id: 'contact_heroText',
        label: { es: 'Hero - Texto', en: 'Hero - Text' },
        icon: 'fa-font',
        cssVars: ['--contact-hero-text']
      },
      {
        id: 'contact_formBg',
        label: { es: 'Formulario - Fondo', en: 'Form - Background' },
        icon: 'fa-edit',
        cssVars: ['--contact-form-bg']
      },
      {
        id: 'contact_formInputs',
        label: { es: 'Formulario - Campos', en: 'Form - Input Fields' },
        icon: 'fa-keyboard',
        cssVars: ['--contact-form-inputs']
      },
      {
        id: 'contact_formButtons',
        label: { es: 'Formulario - Botones', en: 'Form - Buttons' },
        icon: 'fa-square',
        cssVars: ['--contact-form-buttons']
      },
      {
        id: 'contact_infoBg',
        label: { es: 'Info Contacto - Fondo', en: 'Contact Info - Background' },
        icon: 'fa-info-circle',
        cssVars: ['--contact-info-bg']
      },
      {
        id: 'contact_infoText',
        label: { es: 'Info Contacto - Texto', en: 'Contact Info - Text' },
        icon: 'fa-font',
        cssVars: ['--contact-info-text']
      },
      {
        id: 'contact_infoIcons',
        label: { es: 'Info Contacto - Iconos', en: 'Contact Info - Icons' },
        icon: 'fa-icons',
        cssVars: ['--contact-info-icons']
      }
    ]
  }
];

// Preset color palettes
export const PRESET_PALETTES = [
  {
    name: { es: 'Configuración Original', en: 'Original Setup' },
    colors: DEFAULT_THEME
  },
  {
    name: { es: 'Azul Profesional', en: 'Professional Blue' },
    colors: {
      ...DEFAULT_THEME,
      global_headerBg: '#014086',
      home_heroBg: '#014086',
      projects_heroBg: '#014086',
      services_heroBg: '#014086',
      about_heroBg: '#014086',
      contact_heroBg: '#014086'
    }
  },
  {
    name: { es: 'Verde Natural', en: 'Natural Green' },
    colors: {
      ...DEFAULT_THEME,
      global_headerBg: '#5C7205',
      home_heroBg: '#5C7205',
      home_heroButtons: '#8A862F',
      projects_heroBg: '#5C7205',
      services_heroBg: '#5C7205',
      about_heroBg: '#5C7205',
      contact_heroBg: '#5C7205'
    }
  },
  {
    name: { es: 'Claro y Minimalista', en: 'Light and Minimal' },
    colors: {
      ...DEFAULT_THEME,
      global_headerBg: '#F4FFE6',
      global_headerText: '#002335',
      global_navLinks: '#002335',
      home_featuredBg: '#FFFFFF',
      home_servicesBg: '#F4FFE6',
      projects_gridBg: '#FFFFFF',
      services_serviceBg: '#FFFFFF',
      about_contentBg: '#FFFFFF'
    }
  },
  {
    name: { es: 'Modo Noche', en: 'Night Mode' },
    colors: {
      // Global Elements - Dark
      global_headerBg: '#000000',
      global_headerText: '#FFFFFF',
      global_navLinks: '#DADADA',
      global_navLinksHover: '#8A862F',
      global_footerBg: '#000000',
      global_footerText: '#DADADA',
      global_footerLinks: '#8A862F',

      // Home Page - Dark
      home_heroBg: '#002335',
      home_heroText: '#FFFFFF',
      home_heroSubtitle: '#DADADA',
      home_heroButtons: '#5C7205',
      home_heroButtonsText: '#FFFFFF',
      home_featuredBg: '#1a1a1a',
      home_featuredTitle: '#FFFFFF',
      home_cardBg: '#2a2a2a',
      home_cardText: '#DADADA',
      home_cardHover: '#5C7205',
      home_servicesBg: '#000000',
      home_servicesTitle: '#FFFFFF',
      home_servicesCards: '#2a2a2a',
      home_philosophyBg: '#1a1a1a',
      home_philosophyText: '#DADADA',
      home_testimonialsBg: '#000000',
      home_testimonialsCards: '#2a2a2a',
      home_contactBg: '#002335',
      home_contactText: '#FFFFFF',

      // Projects Page - Dark
      projects_heroBg: '#002335',
      projects_heroText: '#FFFFFF',
      projects_filterBg: '#1a1a1a',
      projects_filterButtons: '#2a2a2a',
      projects_filterButtonsActive: '#5C7205',
      projects_gridBg: '#000000',
      projects_cardBg: '#2a2a2a',
      projects_cardText: '#DADADA',
      projects_cardHover: '#5C7205',

      // Project Detail Page - Dark
      projectDetail_heroBg: '#002335',
      projectDetail_heroText: '#FFFFFF',
      projectDetail_metaBg: '#1a1a1a',
      projectDetail_metaText: '#DADADA',
      projectDetail_contentBg: '#000000',
      projectDetail_contentText: '#DADADA',
      projectDetail_galleryBg: '#1a1a1a',
      projectDetail_featuresBg: '#2a2a2a',
      projectDetail_featuresAccent: '#5C7205',

      // Services Page - Dark
      services_heroBg: '#002335',
      services_heroText: '#FFFFFF',
      services_serviceBg: '#1a1a1a',
      services_serviceCards: '#2a2a2a',
      services_serviceTitle: '#FFFFFF',
      services_processBg: '#000000',
      services_processCards: '#2a2a2a',
      services_processAccent: '#5C7205',

      // About Page - Dark
      about_heroBg: '#002335',
      about_heroText: '#FFFFFF',
      about_contentBg: '#1a1a1a',
      about_contentText: '#DADADA',
      about_valuesBg: '#000000',
      about_valuesCards: '#2a2a2a',
      about_valuesAccent: '#5C7205',
      about_teamBg: '#1a1a1a',

      // Contact Page - Dark
      contact_heroBg: '#002335',
      contact_heroText: '#FFFFFF',
      contact_formBg: '#1a1a1a',
      contact_formInputs: '#2a2a2a',
      contact_formButtons: '#5C7205',
      contact_infoBg: '#1a1a1a',
      contact_infoText: '#DADADA',
      contact_infoIcons: '#8A862F'
    }
  }
];
