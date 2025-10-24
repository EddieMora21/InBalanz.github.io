import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [typewriterText, setTypewriterText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  // Refs para animaciones
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const service1Ref = useRef(null);
  const service2Ref = useRef(null);
  const service3Ref = useRef(null);
  const processTitleRef = useRef(null);
  const processStepsRef = useRef(null);
  const ctaRef = useRef(null);

  // Efecto de máquina de escribir para el subtítulo
  useEffect(() => {
    const fullText = t('services.subtitle');
    let currentIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypewriterText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [t, currentLang]);

  // Cursor parpadeante
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  // Animaciones GSAP
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Animación del título principal
    tl.fromTo(titleRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power3.out' },
      '-=0.3'
    );

    // Animaciones de servicios
    const services = [service1Ref, service2Ref, service3Ref];
    services.forEach((serviceRef, index) => {
      if (serviceRef.current) {
        const textContent = serviceRef.current.querySelector('.about-text');
        const imageContent = serviceRef.current.querySelector('.about-image');

        gsap.fromTo(textContent,
          { x: index % 2 === 0 ? -50 : 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: serviceRef.current,
              start: 'top 75%',
              once: true
            }
          }
        );

        gsap.fromTo(imageContent,
          { x: index % 2 === 0 ? 50 : -50, opacity: 0, scale: 0.95 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: serviceRef.current,
              start: 'top 75%',
              once: true
            }
          }
        );

        // Animación de los items de la lista
        const listItems = textContent.querySelectorAll('li');
        gsap.fromTo(listItems,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: serviceRef.current,
              start: 'top 70%',
              once: true
            }
          }
        );
      }
    });

    // Animación del título del proceso
    if (processTitleRef.current) {
      gsap.fromTo(processTitleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: processTitleRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );
    }

    // Animación de los pasos del proceso
    if (processStepsRef.current) {
      const steps = processStepsRef.current.querySelectorAll('.process-step');
      gsap.fromTo(steps,
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: processStepsRef.current,
            start: 'top 75%',
            once: true
          }
        }
      );

      // Animación de los números
      steps.forEach((step, index) => {
        const number = step.querySelector('.step-number');
        gsap.fromTo(number,
          { scale: 0, rotation: -180 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: step,
              start: 'top 80%',
              once: true
            }
          }
        );
      });
    }

    // Animación del CTA
    if (ctaRef.current) {
      gsap.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            once: true
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="section services-page">
      <div className="container">
        <div className="section-title services-hero">
          <h2 ref={titleRef}>{t('services.title')}</h2>
          <p ref={subtitleRef} className="typewriter-subtitle">
            {typewriterText}
            <span className={`typewriter-cursor ${showCursor ? 'visible' : ''}`}>|</span>
          </p>
        </div>

        {/* Servicio 1: Diseño Arquitectónico */}
        <div className="service-detail" ref={service1Ref}>
          <div className="about-content">
            <div className="about-text">
              <h3>{t('services.architecturalDesign')}</h3>
              <p>
                {currentLang === 'es'
                  ? 'Desarrollamos proyectos arquitectónicos desde la concepción inicial hasta el diseño final, priorizando la integración con el entorno natural y las estrategias pasivas de confort térmico.'
                  : 'We develop architectural projects from initial conception to final design, prioritizing integration with the natural environment and passive thermal comfort strategies.'}
              </p>
              <ul>
                <li>
                  {currentLang === 'es'
                    ? 'Diseño conceptual y desarrollo de ideas'
                    : 'Conceptual design and idea development'}
                </li>
                <li>
                  {currentLang === 'es'
                    ? 'Estudios de orientación solar y ventilación'
                    : 'Solar orientation and ventilation studies'}
                </li>
                <li>
                  {currentLang === 'es'
                    ? 'Selección de materiales sostenibles'
                    : 'Selection of sustainable materials'}
                </li>
                <li>
                  {currentLang === 'es'
                    ? 'Integración de espacios interiores y exteriores'
                    : 'Integration of indoor and outdoor spaces'}
                </li>
              </ul>
            </div>
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" alt="Diseño Arquitectónico" />
            </div>
          </div>
        </div>

        {/* Servicio 2: Planos Constructivos */}
        <div className="service-detail" ref={service2Ref}>
          <div className="about-content">
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" alt="Planos Constructivos" />
            </div>
            <div className="about-text">
              <h3>{t('services.constructionPlans')}</h3>
              <p>
                {currentLang === 'es'
                  ? 'Elaboramos planos técnicos detallados para permisos de construcción y ejecución de obra, garantizando precisión y cumplimiento normativo.'
                  : 'We develop detailed technical plans for construction permits and project execution, ensuring accuracy and regulatory compliance.'}
              </p>
              <ul>
                <li>
                  {currentLang === 'es'
                    ? 'Planos arquitectónicos completos'
                    : 'Complete architectural plans'}
                </li>
                <li>
                  {currentLang === 'es'
                    ? 'Planos estructurales y de instalaciones'
                    : 'Structural and installation plans'}
                </li>
                <li>
                  {currentLang === 'es'
                    ? 'Documentación para permisos municipales'
                    : 'Documentation for municipal permits'}
                </li>
                <li>
                  {currentLang === 'es'
                    ? 'Especificaciones técnicas y memorias de cálculo'
                    : 'Technical specifications and calculation reports'}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Servicio 3: Dirección de Obra */}
        <div className="service-detail" ref={service3Ref}>
          <div className="about-content">
            <div className="about-text">
              <h3>{t('services.constructionManagement')}</h3>
              <p>
                {currentLang === 'es'
                  ? 'Supervisamos y coordinamos el proceso constructivo para garantizar la calidad, el cumplimiento del diseño y el respeto al presupuesto establecido.'
                  : 'We supervise and coordinate the construction process to ensure quality, design compliance and respect for the established budget.'}
              </p>
              <ul>
                <li>
                  {currentLang === 'es'
                    ? 'Supervisión técnica de la construcción'
                    : 'Technical supervision of construction'}
                </li>
                <li>
                  {currentLang === 'es'
                    ? 'Coordinación con contratistas y proveedores'
                    : 'Coordination with contractors and suppliers'}
                </li>
                <li>
                  {currentLang === 'es'
                    ? 'Control de calidad y cumplimiento normativo'
                    : 'Quality control and regulatory compliance'}
                </li>
                <li>
                  {currentLang === 'es'
                    ? 'Seguimiento de avances y programación'
                    : 'Progress tracking and scheduling'}
                </li>
              </ul>
            </div>
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" alt="Dirección de Obra" />
            </div>
          </div>
        </div>

        {/* Proceso de Trabajo */}
        <div className="process-section">
          <div className="section-title" ref={processTitleRef}>
            <h3>{t('services.ourProcess')}</h3>
          </div>
          <div className="process-steps" ref={processStepsRef}>
            <div className="process-step">
              <div className="step-number">1</div>
              <h4>{t('services.initialConsultation')}</h4>
              <p>
                {currentLang === 'es'
                  ? 'Reunión para entender tus necesidades, expectativas y requerimientos específicos del proyecto.'
                  : 'Meeting to understand your needs, expectations and specific project requirements.'}
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h4>{t('services.conceptualDesign')}</h4>
              <p>
                {currentLang === 'es'
                  ? 'Desarrollo de ideas y propuestas iniciales basadas en el análisis del sitio y tus requerimientos.'
                  : 'Development of ideas and initial proposals based on site analysis and your requirements.'}
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h4>{t('services.technicalDevelopment')}</h4>
              <p>
                {currentLang === 'es'
                  ? 'Elaboración de planos constructivos, especificaciones técnicas y documentación completa.'
                  : 'Development of construction plans, technical specifications and complete documentation.'}
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h4>{t('services.executionMonitoring')}</h4>
              <p>
                {currentLang === 'es'
                  ? 'Supervisión de la construcción y acompañamiento durante todo el proceso.'
                  : 'Construction supervision and accompaniment throughout the process.'}
              </p>
            </div>
          </div>
        </div>

        {/* Llamada a la acción */}
        <div className="view-more" ref={ctaRef}>
          <Link to="/contact" className="btn">{t('services.requestQuote')}</Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
