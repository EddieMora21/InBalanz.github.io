import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../data/projectsData';
import ProjectCard from '../components/ProjectCard';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroButtonsRef = useRef(null);
  const projectsRef = useRef(null);
  const projectsTitleRef = useRef(null);
  const projectsSubtitleRef = useRef(null);
  const projectsButtonRef = useRef(null);
  const servicesRef = useRef(null);
  const philosophyRef = useRef(null);
  const philosophyTitleRef = useRef(null);
  const philosophyText1Ref = useRef(null);
  const philosophyText2Ref = useRef(null);
  const philosophyButtonRef = useRef(null);
  const philosophyImageRef = useRef(null);
  const valuesRef = useRef(null);
  const contactRef = useRef(null);
  const rotatingTextRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Get featured projects (first 4)
  const featuredProjects = projectsData.slice(0, 4);

  // Hero slider images
  const heroImages = [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://www.ied.es/news/26591/image-thumb__26591__scaleByWidth1000/header-articolo-progettazione-sostenibile.jpg',
    'https://aimaestudio.es/wp-content/uploads/2024/03/salon-minimalista-diseno-de-interiores.jpg',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
  ];

  // Rotating text with colors
  const rotatingTexts = currentLang === 'es'
    ? [
        { text: 'Enfoque Natural', color: '#2e8b57' },
        { text: 'Diseño Sostenible', color: '#d4af37' },
        { text: 'Espacios Armoniosos', color: '#4a90e2' },
        { text: 'Arquitectura Consciente', color: '#e67e22' }
      ]
    : [
        { text: 'Natural Focus', color: '#2e8b57' },
        { text: 'Sustainable Design', color: '#d4af37' },
        { text: 'Harmonious Spaces', color: '#4a90e2' },
        { text: 'Conscious Architecture', color: '#e67e22' }
      ];

  // Slider effect with text animation
  useEffect(() => {
    const interval = setInterval(() => {
      // Animate text out
      if (rotatingTextRef.current) {
        gsap.to(rotatingTextRef.current, {
          y: -30,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in',
          onComplete: () => {
            // Change slide
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
            // Animate text in
            gsap.fromTo(rotatingTextRef.current,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
            );
          }
        });
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    // Hero animations
    const tl = gsap.timeline();

    tl.fromTo(heroTitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )
    .fromTo(heroSubtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.7'
    )
    .fromTo(heroButtonsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.7'
    );

    // Projects section animation - Stacked Cards Timeline
    const projectsTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: projectsRef.current,
        start: 'top 80%',
      }
    });

    projectsTimeline
      .fromTo(projectsTitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo(projectsSubtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(projectsRef.current.querySelectorAll('.stacked-card'),
        { y: 100, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.2)'
        },
        '-=0.5'
      )
      .fromTo(projectsButtonRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      );

    // Services section animation - Enhanced cards
    const serviceCards = servicesRef.current.querySelectorAll('.service-card-enhanced');

    serviceCards.forEach((card, index) => {
      // Card entrance animation
      gsap.fromTo(card,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true
          },
          delay: index * 0.15 // Stagger effect
        }
      );

      // Animate number
      const number = card.querySelector('.service-number');
      gsap.fromTo(number,
        { opacity: 0, scale: 0.5, rotation: -180 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true
          },
          delay: index * 0.15 + 0.2
        }
      );

      // Animate icon
      const icon = card.querySelector('.service-icon-glass');
      gsap.fromTo(icon,
        { scale: 0, rotation: -90 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true
          },
          delay: index * 0.15 + 0.3
        }
      );

      // Animate features
      const features = card.querySelectorAll('.service-features span');
      gsap.fromTo(features,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            once: true
          },
          delay: index * 0.15 + 0.5
        }
      );
    });

    // Philosophy Enhanced section animation
    const philosophyTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: philosophyRef.current,
        start: 'top 75%',
      }
    });

    // Animate main image
    gsap.fromTo(philosophyImageRef.current,
      { scale: 1.15, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: philosophyImageRef.current,
          start: 'top 80%',
        }
      }
    );

    // Animate stats
    gsap.fromTo('.philosophy-stats .stat-item',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: '.philosophy-stats',
          start: 'top 85%',
        }
      }
    );

    // Animate numbers with counter effect
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach((element) => {
      const finalValue = parseInt(element.textContent);

      ScrollTrigger.create({
        trigger: element,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          let counter = { value: 0 };
          gsap.to(counter, {
            value: finalValue,
            duration: 2,
            ease: 'power1.out',
            onUpdate: function() {
              element.textContent = Math.floor(counter.value) + '+';
            }
          });
        }
      });
    });

    // Animate badge
    gsap.fromTo('.philosophy-badge',
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.philosophy-content',
          start: 'top 80%',
        }
      }
    );

    // Animate content
    philosophyTimeline
      .fromTo(philosophyTitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo('.philosophy-divider',
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(philosophyText1Ref.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(philosophyText2Ref.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      );

    // Animate features
    gsap.fromTo('.philosophy-feature-item',
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.philosophy-features',
          start: 'top 85%',
        }
      }
    );

    // Animate button
    gsap.fromTo(philosophyButtonRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: philosophyButtonRef.current,
          start: 'top 90%',
        }
      }
    );

    // Values section animation
    gsap.fromTo(valuesRef.current.querySelectorAll('.value-card'),
      { y: 60, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: valuesRef.current,
          start: 'top 75%',
        }
      }
    );

    // Contact section animation
    gsap.fromTo(contactRef.current.querySelector('.section-title'),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 80%',
        }
      }
    );

    gsap.fromTo(contactRef.current.querySelector('.contact-info'),
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 80%',
        }
      }
    );

    gsap.fromTo(contactRef.current.querySelector('.contact-form'),
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero hero-slider">
        {/* Background slider */}
        <div className="hero-background">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          ))}
          <div className="hero-overlay"></div>
        </div>

        <div className="container">
          <div className="hero-content">
            <h1 ref={heroTitleRef}>
              {t('hero.title')}
              <br />
              <span
                ref={rotatingTextRef}
                className="rotating-text"
                style={{ color: rotatingTexts[currentSlide].color }}
              >
                {rotatingTexts[currentSlide].text}
              </span>
            </h1>
            <p ref={heroSubtitleRef}>{t('hero.subtitle')}</p>
            <div className="hero-buttons" ref={heroButtonsRef}>
              <Link to="/projects" className="btn">
                {t('hero.viewProjects')}
              </Link>
              <a
                href="https://wa.me/50612345678?text=Hola,%20estoy%20interesado%20en%20sus%20servicios%20de%20arquitectura."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline btn-hero-secondary"
              >
                <i className="fab fa-whatsapp"></i>
                <span>{currentLang === 'es' ? 'Consulta' : 'Contact'}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects - Stacked Cards Design */}
      <section className="section featured-projects-stacked" ref={projectsRef}>
        <div className="container">
          <div className="section-title">
            <h2 ref={projectsTitleRef}>{t('projects.featured')}</h2>
            <p ref={projectsSubtitleRef}>{t('projects.featuredSubtitle')}</p>
          </div>
          <div className="stacked-cards-container">
            {featuredProjects.map((project, index) => (
              <Link
                to={`/projects/${project.id}`}
                key={project.id}
                className="stacked-card"
                style={{ '--index': index }}
              >
                <div className="stacked-card-image">
                  <img src={project.images[0]} alt={project.title} />
                  <div className="stacked-card-overlay"></div>
                </div>
                <div className="stacked-card-content">
                  <span className="stacked-card-category">{project.category}</span>
                  <h3 className="stacked-card-title">{project.title}</h3>
                  <p className="stacked-card-description">
                    {project.shortDescription[currentLang]}
                  </p>
                  <div className="stacked-card-meta">
                    <span><i className="fas fa-map-marker-alt"></i> {project.location}</span>
                    <span><i className="fas fa-ruler-combined"></i> {project.area}</span>
                  </div>
                  <div className="stacked-card-cta">
                    <span>{currentLang === 'es' ? 'Ver Proyecto' : 'View Project'}</span>
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="view-more" ref={projectsButtonRef}>
            <Link to="/projects" className="btn">{t('projects.viewAll')}</Link>
          </div>
        </div>
      </section>

      {/* Services Preview - Enhanced Design */}
      <section id="servicios" className="section services-enhanced" ref={servicesRef}>
        <div className="container">
          <div className="section-title">
            <h2>{t('services.title')}</h2>
            <p className="services-subtitle">
              {currentLang === 'es'
                ? 'Soluciones arquitectónicas completas para tu proyecto'
                : 'Complete architectural solutions for your project'}
            </p>
          </div>
          <div className="services-grid-enhanced">
            <div className="service-card-enhanced">
              <div className="service-number">01</div>
              <div className="service-icon-glass">
                <i className="fas fa-home"></i>
              </div>
              <h3>{t('services.architecturalDesign')}</h3>
              <p>
                {currentLang === 'es'
                  ? 'Creación de proyectos residenciales desde cero con enfoque en la integración con la naturaleza.'
                  : 'Creation of residential projects from scratch with focus on integration with nature.'}
              </p>
              <div className="service-features">
                <span><i className="fas fa-check-circle"></i> {currentLang === 'es' ? 'Diseño conceptual' : 'Conceptual design'}</span>
                <span><i className="fas fa-check-circle"></i> {currentLang === 'es' ? 'Renders 3D' : '3D Renders'}</span>
                <span><i className="fas fa-check-circle"></i> {currentLang === 'es' ? 'Planos detallados' : 'Detailed plans'}</span>
              </div>
              <Link to="/services" className="service-link">
                {currentLang === 'es' ? 'Más información' : 'Learn more'}
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>

            <div className="service-card-enhanced">
              <div className="service-number">02</div>
              <div className="service-icon-glass">
                <i className="fas fa-drafting-compass"></i>
              </div>
              <h3>{t('services.constructionPlans')}</h3>
              <p>
                {currentLang === 'es'
                  ? 'Elaboración de planos técnicos detallados para permisos de construcción y ejecución de obra.'
                  : 'Development of detailed technical plans for construction permits and project execution.'}
              </p>
              <div className="service-features">
                <span><i className="fas fa-check-circle"></i> {currentLang === 'es' ? 'Planos estructurales' : 'Structural plans'}</span>
                <span><i className="fas fa-check-circle"></i> {currentLang === 'es' ? 'Permisos municipales' : 'Municipal permits'}</span>
                <span><i className="fas fa-check-circle"></i> {currentLang === 'es' ? 'Especificaciones' : 'Specifications'}</span>
              </div>
              <Link to="/services" className="service-link">
                {currentLang === 'es' ? 'Más información' : 'Learn more'}
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>

            <div className="service-card-enhanced">
              <div className="service-number">03</div>
              <div className="service-icon-glass">
                <i className="fas fa-hard-hat"></i>
              </div>
              <h3>{t('services.constructionManagement')}</h3>
              <p>
                {currentLang === 'es'
                  ? 'Supervisión y coordinación del proceso constructivo para garantizar calidad y fidelidad al diseño.'
                  : 'Supervision and coordination of construction process to ensure quality and design fidelity.'}
              </p>
              <div className="service-features">
                <span><i className="fas fa-check-circle"></i> {currentLang === 'es' ? 'Supervisión técnica' : 'Technical supervision'}</span>
                <span><i className="fas fa-check-circle"></i> {currentLang === 'es' ? 'Control de calidad' : 'Quality control'}</span>
                <span><i className="fas fa-check-circle"></i> {currentLang === 'es' ? 'Coordinación' : 'Coordination'}</span>
              </div>
              <Link to="/services" className="service-link">
                {currentLang === 'es' ? 'Más información' : 'Learn more'}
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
          <div className="view-more">
            <Link to="/services" className="btn btn-services-main">
              {currentLang === 'es'
                ? 'Ver todos nuestros servicios'
                : 'View all our services'}
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy - Enhanced Design */}
      <section className="section philosophy-enhanced" ref={philosophyRef}>
        <div className="container">
          <div className="philosophy-grid">
            {/* Left Side - Images Grid */}
            <div className="philosophy-images">
              <div className="philosophy-image-main" ref={philosophyImageRef}>
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" alt="Architecture" />
                <div className="philosophy-image-overlay"></div>
              </div>
              <div className="philosophy-stats">
                <div className="stat-item">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">
                    {currentLang === 'es' ? 'Años de Experiencia' : 'Years of Experience'}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">100+</span>
                  <span className="stat-label">
                    {currentLang === 'es' ? 'Proyectos Completados' : 'Projects Completed'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="philosophy-content">
              <div className="philosophy-badge">
                <i className="fas fa-leaf"></i>
                <span>{currentLang === 'es' ? 'Nuestra Filosofía' : 'Our Philosophy'}</span>
              </div>
              <h2 ref={philosophyTitleRef} className="philosophy-main-title">
                {t('philosophy.title')}
              </h2>
              <div className="philosophy-divider"></div>
              <p ref={philosophyText1Ref} className="philosophy-text-large">
                {t('philosophy.description')}
              </p>
              <p ref={philosophyText2Ref} className="philosophy-text">
                {currentLang === 'es'
                  ? 'Nuestro enfoque se centra en crear espacios que no solo sean estéticamente agradables, sino que también promuevan el bienestar de sus habitantes a través de estrategias de diseño sostenible.'
                  : 'Our approach focuses on creating spaces that are not only aesthetically pleasing but also promote the well-being of their inhabitants through sustainable design strategies.'}
              </p>

              <div className="philosophy-features">
                <div className="philosophy-feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-seedling"></i>
                  </div>
                  <div className="feature-text">
                    <h4>{currentLang === 'es' ? 'Sostenibilidad' : 'Sustainability'}</h4>
                    <p>{currentLang === 'es' ? 'Diseño consciente con el medio ambiente' : 'Environmentally conscious design'}</p>
                  </div>
                </div>
                <div className="philosophy-feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-sun"></i>
                  </div>
                  <div className="feature-text">
                    <h4>{currentLang === 'es' ? 'Estrategias Pasivas' : 'Passive Strategies'}</h4>
                    <p>{currentLang === 'es' ? 'Optimización de recursos naturales' : 'Natural resource optimization'}</p>
                  </div>
                </div>
                <div className="philosophy-feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-heart"></i>
                  </div>
                  <div className="feature-text">
                    <h4>{currentLang === 'es' ? 'Bienestar' : 'Well-being'}</h4>
                    <p>{currentLang === 'es' ? 'Espacios que mejoran la calidad de vida' : 'Spaces that improve quality of life'}</p>
                  </div>
                </div>
              </div>

              <div ref={philosophyButtonRef} className="philosophy-cta">
                <Link to="/about" className="btn btn-philosophy">
                  {t('philosophy.learnMore')}
                  <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values / Commitment Section */}
      <section className="values-commitment-section" ref={valuesRef}>
        <div className="values-background" style={{ backgroundImage: "url('/imagen 4.webp')" }}>
          <div className="values-overlay"></div>
        </div>
        <div className="container">
          <div className="section-title">
            <h2 style={{ color: 'white' }}>
              {currentLang === 'es' ? 'Nuestro Compromiso' : 'Our Commitment'}
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              {currentLang === 'es'
                ? 'Los valores que guían cada proyecto que realizamos'
                : 'The values that guide every project we undertake'}
            </p>
          </div>
          <div className="values-grid-home">
            <div className="value-card">
              <div className="value-icon-circle">
                <i className="fas fa-leaf"></i>
              </div>
              <h3>{currentLang === 'es' ? 'Sostenibilidad' : 'Sustainability'}</h3>
              <p>
                {currentLang === 'es'
                  ? 'Diseños que respetan el medio ambiente y optimizan recursos naturales para crear espacios eficientes y responsables.'
                  : 'Designs that respect the environment and optimize natural resources to create efficient and responsible spaces.'}
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon-circle">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>{currentLang === 'es' ? 'Innovación' : 'Innovation'}</h3>
              <p>
                {currentLang === 'es'
                  ? 'Soluciones arquitectónicas creativas que combinan técnicas tradicionales con tecnología de vanguardia.'
                  : 'Creative architectural solutions that combine traditional techniques with cutting-edge technology.'}
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon-circle">
                <i className="fas fa-users"></i>
              </div>
              <h3>{currentLang === 'es' ? 'Centrado en las Personas' : 'People-Centered'}</h3>
              <p>
                {currentLang === 'es'
                  ? 'Espacios diseñados pensando en el bienestar, comodidad y estilo de vida de quienes los habitan.'
                  : 'Spaces designed with the well-being, comfort and lifestyle of their inhabitants in mind.'}
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon-circle">
                <i className="fas fa-star"></i>
              </div>
              <h3>{currentLang === 'es' ? 'Excelencia' : 'Excellence'}</h3>
              <p>
                {currentLang === 'es'
                  ? 'Compromiso con la calidad en cada detalle, desde el concepto inicial hasta la entrega final del proyecto.'
                  : 'Commitment to quality in every detail, from initial concept to final project delivery.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Preview */}
      <section className="section contact" ref={contactRef}>
        <div className="container">
          <div className="section-title">
            <h2>{t('contact.title')}</h2>
            <p>{t('contact.subtitle')}</p>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <h3>{t('contact.info')}</h3>
              <p><i className="fas fa-map-marker-alt"></i> San José, Costa Rica</p>
              <p><i className="fas fa-phone"></i> +506 1234-5678</p>
              <p><i className="fas fa-envelope"></i> info@gsarquitecto.com</p>
              <div style={{ marginTop: '25px' }}>
                <a
                  href="https://wa.me/50612345678?text=Hola,%20estoy%20interesado%20en%20sus%20servicios%20de%20arquitectura."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <i className="fab fa-whatsapp"></i>
                  <span>{currentLang === 'es' ? 'Chat por WhatsApp' : 'Chat on WhatsApp'}</span>
                </a>
              </div>
            </div>
            <form className="contact-form">
              <input type="text" placeholder={t('contact.name')} required />
              <input type="email" placeholder={t('contact.email')} required />
              <input type="text" placeholder={t('contact.subject')} required />
              <textarea placeholder={t('contact.message')} required></textarea>
              <button type="submit" className="btn">{t('contact.send')}</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
