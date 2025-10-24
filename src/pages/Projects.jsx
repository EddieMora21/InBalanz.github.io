import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../data/projectsData';
import ProjectCard from '../components/ProjectCard';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const { t, i18n } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [typewriterText, setTypewriterText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [needsHorizontalScroll, setNeedsHorizontalScroll] = useState(true);

  // Refs para animaciones
  const heroRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroDescRef = useRef(null);
  const filterRef = useRef(null);
  const horizontalSectionRef = useRef(null);
  const horizontalContainerRef = useRef(null);

  const categories = ['all', 'Residencial', 'Comercial', 'Remodelación'];

  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter(project => project.category === activeFilter);

  // Efecto de máquina de escribir
  useEffect(() => {
    const fullText = i18n.language === 'es'
      ? 'Diseños que trascienden el tiempo'
      : 'Designs that transcend time';

    let currentIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypewriterText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [i18n.language]);

  // Cursor parpadeante
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  // Animación del Hero
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(heroTitleRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )
    .fromTo(heroSubtitleRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(heroDescRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.5'
    );

    // Parallax en el hero
    gsap.to(heroRef.current, {
      y: 150,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });
  }, []);

  // Animación de filtros
  useEffect(() => {
    gsap.fromTo(filterRef.current.querySelectorAll('.filter-btn'),
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: filterRef.current,
          start: 'top 85%',
          once: true
        }
      }
    );
  }, []);

  // Animación de scroll horizontal (solo en desktop > 768px)
  useEffect(() => {
    const isDesktop = window.innerWidth > 768;

    if (!isDesktop) {
      setNeedsHorizontalScroll(false);
      return;
    }

    if (!horizontalContainerRef.current || !horizontalSectionRef.current) return;

    const container = horizontalContainerRef.current;
    const section = horizontalSectionRef.current;

    // Limpiar animaciones previas
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === section) {
        trigger.kill();
      }
    });

    // Esperar renderizado
    const timer = setTimeout(() => {
      const containerWidth = container.scrollWidth;
      const viewportWidth = window.innerWidth;

      // Si el contenido cabe, no hacer scroll horizontal
      if (containerWidth <= viewportWidth * 1.1) {
        gsap.set(container, { x: 0 });
        setNeedsHorizontalScroll(false);
        return;
      }

      setNeedsHorizontalScroll(true);

      const scrollAmount = -(containerWidth - viewportWidth / 2);

      gsap.to(container, {
        x: scrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${Math.abs(scrollAmount)}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, [filteredProjects]);

  return (
    <div className="projects-page">
      {/* Hero Section */}
      <section className="projects-hero" ref={heroRef}>
        <div className="projects-hero-overlay"></div>
        <div className="container">
          <div className="projects-hero-content">
            <h1 ref={heroTitleRef} className="projects-hero-title">
              {t('nav.projects')}
            </h1>
            <p ref={heroSubtitleRef} className="projects-hero-subtitle">
              {typewriterText}
              <span className={`typewriter-cursor ${showCursor ? 'visible' : ''}`}>|</span>
            </p>
            <p ref={heroDescRef} className="projects-hero-desc">
              {i18n.language === 'es'
                ? 'Cada proyecto es una historia única de arquitectura integrada con la naturaleza y la funcionalidad.'
                : 'Each project is a unique story of architecture integrated with nature and functionality.'}
            </p>
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
      <div className="container">
        <div className="projects-filter" ref={filterRef}>
          <button
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            {t('projects.filterAll')}
          </button>
          <button
            className={`filter-btn ${activeFilter === 'Residencial' ? 'active' : ''}`}
            onClick={() => setActiveFilter('Residencial')}
          >
            {t('projects.filterResidential')}
          </button>
          <button
            className={`filter-btn ${activeFilter === 'Comercial' ? 'active' : ''}`}
            onClick={() => setActiveFilter('Comercial')}
          >
            {t('projects.filterCommercial')}
          </button>
          <button
            className={`filter-btn ${activeFilter === 'Remodelación' ? 'active' : ''}`}
            onClick={() => setActiveFilter('Remodelación')}
          >
            {t('projects.filterRemodeling')}
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Section */}
      <section className="horizontal-scroll-section" ref={horizontalSectionRef}>
        <div
          className={`horizontal-scroll-container ${!needsHorizontalScroll ? 'no-scroll' : ''}`}
          ref={horizontalContainerRef}
        >
          {filteredProjects.map((project, index) => (
            <div key={project.id} className="horizontal-project-card">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </section>

      {filteredProjects.length === 0 && (
        <div className="container">
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <p>{i18n.language === 'es' ? 'No hay proyectos en esta categoría.' : 'No projects in this category.'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
