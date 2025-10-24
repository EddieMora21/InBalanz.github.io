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

  // Get featured projects (first 3)
  const featuredProjects = projectsData.slice(0, 3);

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

    // Projects section animation - Timeline con Overlap
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
        '-=0.6' // Overlap: comienza 0.6s antes de que termine la anterior
      )
      .fromTo(projectsRef.current.querySelectorAll('.project-card'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out'
        },
        '-=0.5' // Overlap: las cards comienzan antes de que termine el subtitle
      )
      .fromTo(projectsButtonRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.4' // Overlap: el botón aparece mientras las cards se animan
      );

    // Services section animation - ScrollTrigger con Scrub
    const serviceCards = servicesRef.current.querySelectorAll('.service-card');

    serviceCards.forEach((card, index) => {
      gsap.fromTo(card,
        { y: 100, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'top 50%',
            scrub: 1, // La animación sigue el scroll (1 segundo de delay)
          }
        }
      );
    });

    // Philosophy section animation - Timeline con Overlap + Parallax en imagen

    // Timeline para el texto (entrada fluida con overlap)
    const philosophyTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: philosophyRef.current,
        start: 'top 75%',
      }
    });

    philosophyTimeline
      .fromTo(philosophyTitleRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      )
      .fromTo(philosophyText1Ref.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.7' // Overlap
      )
      .fromTo(philosophyText2Ref.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.6' // Overlap
      )
      .fromTo(philosophyButtonRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5' // Overlap
      );

    // Parallax en la imagen (se mueve con el scroll)
    gsap.to(philosophyImageRef.current, {
      y: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: philosophyRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5, // Efecto parallax suave
      }
    });

    // Image reveal con scale
    gsap.fromTo(philosophyImageRef.current,
      { scale: 1.2, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: philosophyImageRef.current,
          start: 'top 80%',
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

      {/* Featured Projects */}
      <section className="section" ref={projectsRef}>
        <div className="container">
          <div className="section-title">
            <h2 ref={projectsTitleRef}>{t('projects.featured')}</h2>
            <p ref={projectsSubtitleRef}>{t('projects.featuredSubtitle')}</p>
          </div>
          <div className="projects-grid">
            {featuredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="view-more" ref={projectsButtonRef}>
            <Link to="/projects" className="btn">{t('projects.viewAll')}</Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section id="servicios" className="section services" ref={servicesRef}>
        <div className="container">
          <div className="section-title">
            <h2>{t('services.title')}</h2>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-home"></i>
              </div>
              <h3>{t('services.architecturalDesign')}</h3>
              <p>
                {currentLang === 'es'
                  ? 'Creación de proyectos residenciales desde cero con enfoque en la integración con la naturaleza.'
                  : 'Creation of residential projects from scratch with focus on integration with nature.'}
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-drafting-compass"></i>
              </div>
              <h3>{t('services.constructionPlans')}</h3>
              <p>
                {currentLang === 'es'
                  ? 'Elaboración de planos técnicos detallados para permisos de construcción y ejecución de obra.'
                  : 'Development of detailed technical plans for construction permits and project execution.'}
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-hard-hat"></i>
              </div>
              <h3>{t('services.constructionManagement')}</h3>
              <p>
                {currentLang === 'es'
                  ? 'Supervisión y coordinación del proceso constructivo para garantizar calidad y fidelidad al diseño.'
                  : 'Supervision and coordination of construction process to ensure quality and design fidelity.'}
              </p>
            </div>
          </div>
          <div className="view-more">
            <Link to="/services" className="btn">
              {currentLang === 'es'
                ? 'Conoce todos nuestros servicios'
                : 'Learn about all our services'}
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section philosophy" ref={philosophyRef}>
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 ref={philosophyTitleRef}>{t('philosophy.title')}</h2>
              <p ref={philosophyText1Ref}>{t('philosophy.description')}</p>
              <p ref={philosophyText2Ref}>
                {currentLang === 'es'
                  ? 'Nuestro enfoque se centra en crear espacios que no solo sean estéticamente agradables, sino que también promuevan el bienestar de sus habitantes a través de estrategias de diseño sostenible.'
                  : 'Our approach focuses on creating spaces that are not only aesthetically pleasing but also promote the well-being of their inhabitants through sustainable design strategies.'}
              </p>
              <div ref={philosophyButtonRef}>
                <Link to="/about" className="btn">{t('philosophy.learnMore')}</Link>
              </div>
            </div>
            <div className="about-image" style={{ overflow: 'hidden' }}>
              <img ref={philosophyImageRef} src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" alt="Architecture" />
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
