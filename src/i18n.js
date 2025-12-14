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
        contact: 'Contacto',
        renders: 'Renders',
        blog: 'Blog'
      },
      // Hero
      hero: {
        title: 'Arquitectura en equilibrio con',
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
        filterVisualizations: 'Anteproyectos',
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
      // Testimonials
      testimonials: {
        title: 'Lo Que Dicen Nuestros Clientes',
        subtitle: 'Experiencias reales de quienes confiaron en nosotros',
        detailedTitle: 'Testimonios Detallados',
        detailedSubtitle: 'Historias completas de proyectos realizados'
      },
      // Services
      services: {
        title: 'SERVICIOS',
        subtitle: 'Soluciones integrales para transformar tu visión en realidad',
        moreInfo: 'Más información',
        // Service Index
        service1: 'Estudios preliminares',
        service1Short: 'Análisis del terreno y normativa para decisiones claras.',
        service1Desc: 'Analizamos el terreno, la normativa y tus necesidades para entender a fondo el proyecto antes de diseñar. Reunimos información técnica, realizamos las consultas necesarias a las instituciones correspondientes y te entregamos un reporte base para tomar decisiones con mayor claridad.',

        service2: 'Anteproyecto',
        service2Short: 'Propuesta espacial y visualización 3D de tu idea.',
        service2Desc: 'Aquí es donde tu idea toma forma. Desarrollamos una propuesta espacial y funcional alineada con tus necesidades, el clima, el terreno y la normativa vigente. Incluye una estimación preliminar de costos, planos que permiten visualizar el concepto del proyecto y renderizados de alta calidad para conocer tu proyecto antes de construirlo.',

        service3: 'Planos constructivos',
        service3Short: 'Guía técnica completa para la ejecución de la obra.',
        service3Desc: 'En esta fase elaboramos los planos necesarios para construir la obra con precisión: distribución, estructura e instalaciones, respaldados por sus respectivos cálculos. Son la guía técnica que asegura que el proyecto se ejecute tal como fue diseñado.',

        service4: 'Dirección de obra',
        service4Short: 'Supervisión para garantizar calidad y fidelidad al diseño.',
        service4Desc: 'Supervisamos la ejecución en sitio para garantizar que la construcción cumpla con los planos, especificaciones técnicas y buenas prácticas constructivas. Acompañamos el proceso para asegurar calidad, orden y coherencia con el diseño en cada etapa de la obra.',

        service5: 'Diseño interno',
        service5Short: 'Interiores armónicos y funcionales a tu medida.',
        service5Desc: 'Creamos espacios que se sienten armónicos, funcionales y fieles a tu estilo de vida. Definimos materiales, colores, mobiliario y ambientación para lograr interiores equilibrados, confortables y coherentes con la arquitectura del proyecto. Todo pensado para que cada ambiente se viva con identidad y bienestar.',

        service6: 'Tramitología',
        service6Short: 'Gestión de permisos y trámites sin complicaciones.',
        service6Desc: 'Nos encargamos de gestionar los permisos y requisitos necesarios ante las instituciones correspondientes, para que tu proyecto avance sin complicaciones. Coordinamos planos, documentos y revisiones técnicas, asegurando que todo cumpla con la normativa y se apruebe de forma ordenada y eficiente.',

        // Scope Section
        scopeTitle: 'ALCANCES',

        // Estudios Preliminares
        preliminaryStudies: 'ESTUDIOS PRELIMINARES',
        siteVisit: 'VISITA AL TERRENO',
        coordination: 'COORDINACIÓN',
        analysisCollection: 'RECOPILACIÓN Y ANÁLISIS',
        masterPlan: 'MASTER PLAN Y DISEÑO PAISAJÍSTICO',
        architecturalDistribution: 'PLANTA DE DISTRIBUCIÓN ARQUITECTÓNICA',

        // Anteproyecto
        preliminaryProject: 'ANTEPROYECTO',
        photorealisticRenderings: 'Imágenes fotorrealistas 3D (renders)',

        // Diseño Interno
        interiorDesign: 'DISEÑO INTERNO',
        interiorDesignDesc: 'Proceso que trabaja con imágenes fotorrealistas y abarca distribución, propuesta de muebles, paleta de colores, texturas y materiales, y accesorios decorativos.',

        // Planos Constructivos
        constructionPlans: 'PLANOS CONSTRUCTIVOS',
        architecturalPlans: 'Planos arquitectónicos con láminas de detalles del proyecto.',
        structuralPlans: 'Planos estructurales realizados por el ingeniero estructural.',
        electricalPlans: 'Planos eléctricos y mecánicos realizados por el ingeniero electromecánico.',
        landscapePlans: 'Planos paisajísticos realizados por una especialista.',

        // Tramitología
        permits: 'TRAMITOLOGÍA',
        permitsDesc: 'Trámites ante las instituciones que requiera el proyecto',
        condoAdmin: 'Administración de condominio',
        cfia: 'Colegio Federado de Ingenieros y Arquitectos (CFIA)',
        municipalities: 'Municipalidades',
        setena: 'Setena',
        ins: 'INS',

        // Why InBalanZ
        whyBios: '¿POR QUÉ INBALANZ?',
        whyBiosText: 'En InBalanZ, nos enfocamos en cada detalle de tu proyecto. Ofrecemos un servicio personalizado donde la precisión en la construcción y el compromiso de cuidar cada aspecto son nuestra prioridad. Trabajamos con un equipo multidisciplinario altamente capacitado para garantizar resultados excepcionales.',
        multidisciplinaryTeam: 'Equipo Multidisciplinario',
        architects: 'Arquitectos',
        interiorDesigner: 'Interiorista',
        structuralEngineer: 'Ingeniero Estructural',
        electromechanicalEngineer: 'Ingeniero Electromecánico',
        projectManager: 'Administrador de Proyectos',
        budgetSpecialist: 'Presupuestista',
        surveyors: 'Topógrafos',

        requestQuote: 'Solicitar Cotización'
      },
      // Renders
      renders: {
        title: 'Catálogo de Diseños Arquitectónicos',
        subtitle: 'Proyectos listos para construir. Adquiere los planos y visualizaciones de diseños exclusivos.',
        cta: 'Ver Detalles',
        filters: {
          all: 'Todos',
          modern: 'Moderno',
          minimalist: 'Minimalista',
          tropical: 'Tropical',
          industrial: 'Industrial'
        },
        specs: {
          area: 'Área',
          bedrooms: 'Habitaciones',
          bathrooms: 'Baños',
          levels: 'Niveles'
        },
        price: 'Precio Estimado',
        inquire: 'Consultar por este diseño'
      },
      // Blog
      blog: {
        title: 'Blog & Noticias',
        subtitle: 'Ideas, tendencias y novedades del mundo de la arquitectura.',
        readMore: 'Leer más',
        publishedOn: 'Publicado el',
        backToBlog: 'Volver al Blog',
        by: 'Por'
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
        contact: 'Contact',
        renders: 'Renders',
        blog: 'Blog'
      },
      // Hero
      hero: {
        title: 'Architecture in balance with',
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
        filterVisualizations: 'Preliminary Projects',
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
      // Testimonials
      testimonials: {
        title: 'What Our Clients Say',
        service4: 'BIM CONSTRUCTION PLANS',
        service5: 'PERMITTING',

        // Scope Section
        scopeTitle: 'SCOPE',

        // Preliminary Studies
        preliminaryStudies: 'PRELIMINARY STUDIES',
        siteVisit: 'SITE VISIT',
        coordination: 'COORDINATION',
        analysisCollection: 'DATA COLLECTION AND ANALYSIS',
        masterPlan: 'MASTER PLAN AND LANDSCAPE DESIGN',
        architecturalDistribution: 'ARCHITECTURAL DISTRIBUTION PLAN',

        // Preliminary Project
        preliminaryProject: 'PRELIMINARY PROJECT',
        photorealisticRenderings: 'Photorealistic 3D images (renders)',

        // Interior Design
        interiorDesign: 'INTERIOR DESIGN',
        interiorDesignDesc: 'Process that works with photorealistic images and includes distribution, furniture proposal, color palette, textures and materials, and decorative accessories.',

        // Construction Plans
        constructionPlans: 'CONSTRUCTION PLANS',
        architecturalPlans: 'Architectural plans with project detail sheets.',
        structuralPlans: 'Structural plans prepared by the structural engineer.',
        electricalPlans: 'Electrical and mechanical plans prepared by the electromechanical engineer.',
        landscapePlans: 'Landscape plans prepared by a specialist.',

        // Permitting
        permits: 'PERMITTING',
        permitsDesc: 'Procedures with the institutions required by the project',
        condoAdmin: 'Condominium administration',
        cfia: 'Federated College of Engineers and Architects (CFIA)',
        municipalities: 'Municipalities',
        setena: 'Setena',
        ins: 'INS',

        // Why InBalanZ
        whyBios: 'WHY INBALANZ?',
        whyBiosText: 'At InBalanZ, we focus on every detail of your project. We offer personalized service where precision in construction and commitment to care for every aspect are our priority. We work with a highly trained multidisciplinary team to guarantee exceptional results.',
        multidisciplinaryTeam: 'Multidisciplinary Team',
        architects: 'Architects',
        interiorDesigner: 'Interior Designer',
        structuralEngineer: 'Structural Engineer',
        electromechanicalEngineer: 'Electromechanical Engineer',
        projectManager: 'Project Manager',
        budgetSpecialist: 'Budget Specialist',
        surveyors: 'Surveyors',

        requestQuote: 'Request Quote'
      },
      // Renders
      renders: {
        title: 'Architectural Design Catalog',
        subtitle: 'Ready-to-build projects. Acquire plans and visualizations of exclusive designs.',
        cta: 'View Details',
        filters: {
          all: 'All',
          modern: 'Modern',
          minimalist: 'Minimalist',
          tropical: 'Tropical',
          industrial: 'Industrial'
        },
        specs: {
          area: 'Area',
          bedrooms: 'Bedrooms',
          bathrooms: 'Bathrooms',
          levels: 'Levels'
        },
        price: 'Estimated Price',
        inquire: 'Inquire about this design'
      },
      // Blog
      blog: {
        title: 'Blog & News',
        subtitle: 'Ideas, trends, and news from the world of architecture.',
        readMore: 'Read More',
        publishedOn: 'Published on',
        backToBlog: 'Back to Blog',
        by: 'By'
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
