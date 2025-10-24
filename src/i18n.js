import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: {
    translation: {
      // Navigation
      nav: {
        home: 'Inicio',
        projects: 'Proyectos',
        services: 'Servicios',
        about: 'Nosotros',
        contact: 'Contacto'
      },
      // Hero
      hero: {
        title: 'Arquitectura en equilibrio',
        subtitle: 'Integramos naturaleza y estrategias pasivas para crear espacios que conectan con sus habitantes y embellecen con el tiempo.',
        viewProjects: 'Ver Proyectos',
        contactUs: 'Contactar'
      },
      // Projects
      projects: {
        featured: 'Proyectos Destacados',
        featuredSubtitle: 'Algunos de nuestros trabajos más representativos',
        viewAll: 'Ver todos los proyectos',
        viewMore: 'Ver más',
        filterAll: 'Todos',
        filterResidential: 'Residencial',
        filterCommercial: 'Comercial',
        filterRemodeling: 'Remodelación',
        category: 'Categoría',
        client: 'Cliente',
        location: 'Ubicación',
        area: 'Área',
        duration: 'Duración',
        year: 'Año',
        mainFeatures: 'Características Principales',
        processAndChallenges: 'Proceso y Desafíos',
        team: 'Equipo del Proyecto'
      },
      // Services
      services: {
        title: 'Nuestros Servicios',
        subtitle: 'Soluciones integrales para tus proyectos arquitectónicos',
        architecturalDesign: 'Diseño Arquitectónico',
        constructionPlans: 'Planos Constructivos',
        constructionManagement: 'Dirección de Obra',
        requestQuote: 'Solicitar Cotización',
        ourProcess: 'Nuestro Proceso de Trabajo',
        initialConsultation: 'Consulta Inicial',
        conceptualDesign: 'Diseño Conceptual',
        technicalDevelopment: 'Desarrollo Técnico',
        executionMonitoring: 'Ejecución y Seguimiento'
      },
      // Philosophy
      philosophy: {
        title: 'Nuestra Filosofía',
        description: 'Creemos en una arquitectura que integre la naturaleza y las estrategias pasivas para el confort de sus habitantes, utilizando materiales que embellecen con el paso del tiempo.',
        learnMore: 'Conoce más sobre nosotros'
      },
      // Contact
      contact: {
        title: '¿Listo para comenzar tu proyecto?',
        subtitle: 'Contáctanos para una consulta inicial sin compromiso',
        info: 'Información de contacto',
        name: 'Nombre',
        email: 'Email',
        subject: 'Asunto',
        message: 'Mensaje',
        send: 'Enviar Mensaje'
      },
      // Footer
      footer: {
        description: 'Diseño arquitectónico con enfoque natural',
        quickLinks: 'Enlaces Rápidos',
        services: 'Servicios',
        followUs: 'Síguenos',
        allRightsReserved: 'Todos los derechos reservados.'
      }
    }
  },
  en: {
    translation: {
      // Navigation
      nav: {
        home: 'Home',
        projects: 'Projects',
        services: 'Services',
        about: 'About',
        contact: 'Contact'
      },
      // Hero
      hero: {
        title: 'Architecture in balance',
        subtitle: 'We integrate nature and passive strategies to create spaces that connect with their inhabitants and beautify over time.',
        viewProjects: 'View Projects',
        contactUs: 'Contact'
      },
      // Projects
      projects: {
        featured: 'Featured Projects',
        featuredSubtitle: 'Some of our most representative works',
        viewAll: 'View all projects',
        viewMore: 'View more',
        filterAll: 'All',
        filterResidential: 'Residential',
        filterCommercial: 'Commercial',
        filterRemodeling: 'Remodeling',
        category: 'Category',
        client: 'Client',
        location: 'Location',
        area: 'Area',
        duration: 'Duration',
        year: 'Year',
        mainFeatures: 'Main Features',
        processAndChallenges: 'Process and Challenges',
        team: 'Project Team'
      },
      // Services
      services: {
        title: 'Our Services',
        subtitle: 'Comprehensive solutions for your architectural projects',
        architecturalDesign: 'Architectural Design',
        constructionPlans: 'Construction Plans',
        constructionManagement: 'Construction Management',
        requestQuote: 'Request Quote',
        ourProcess: 'Our Work Process',
        initialConsultation: 'Initial Consultation',
        conceptualDesign: 'Conceptual Design',
        technicalDevelopment: 'Technical Development',
        executionMonitoring: 'Execution and Monitoring'
      },
      // Philosophy
      philosophy: {
        title: 'Our Philosophy',
        description: 'We believe in architecture that integrates nature and passive strategies for the comfort of its inhabitants, using materials that beautify over time.',
        learnMore: 'Learn more about us'
      },
      // Contact
      contact: {
        title: 'Ready to start your project?',
        subtitle: 'Contact us for an initial no-obligation consultation',
        info: 'Contact Information',
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        send: 'Send Message'
      },
      // Footer
      footer: {
        description: 'Architectural design with a natural focus',
        quickLinks: 'Quick Links',
        services: 'Services',
        followUs: 'Follow Us',
        allRightsReserved: 'All rights reserved.'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'es',
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
