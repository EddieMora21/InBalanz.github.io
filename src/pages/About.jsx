import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  // Refs para animaciones
  const titleRef = useRef(null);
  const philosophyTextRef = useRef(null);
  const philosophyImageRef = useRef(null);
  const valuesGridRef = useRef(null);
  const teamImageRef = useRef(null);
  const teamTextRef = useRef(null);

  // Detectar si es móvil
  const isMobile = window.innerWidth <= 768;

  // Animaciones
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Animación del título principal
    tl.fromTo(titleRef.current,
      { y: isMobile ? 30 : 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );

    // Animación de la sección de filosofía
    if (philosophyTextRef.current) {
      gsap.fromTo(philosophyTextRef.current.querySelectorAll('h2, p'),
        { y: isMobile ? 20 : 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: philosophyTextRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );
    }

    // Animación de la imagen de filosofía (solo en desktop)
    if (philosophyImageRef.current) {
      gsap.fromTo(philosophyImageRef.current,
        { scale: isMobile ? 1 : 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: philosophyImageRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );
    }

    // Animación de los valores
    if (valuesGridRef.current) {
      gsap.fromTo(valuesGridRef.current.querySelectorAll('.value-card'),
        { y: isMobile ? 30 : 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: isMobile ? 0.1 : 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: valuesGridRef.current,
            start: 'top 75%',
            once: true
          }
        }
      );
    }

    // Animación de la imagen del equipo
    if (teamImageRef.current) {
      gsap.fromTo(teamImageRef.current,
        { x: isMobile ? 0 : -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: teamImageRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );
    }

    // Animación del texto del equipo
    if (teamTextRef.current) {
      gsap.fromTo(teamTextRef.current.querySelectorAll('h3, p'),
        { y: isMobile ? 20 : 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: teamTextRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  return (
    <div className="about-page">
      <div className="container">
        {/* About Header */}
        <div className="section-title" ref={titleRef}>
          <h2>{t('nav.about')}</h2>
          <p>{t('philosophy.description')}</p>
        </div>

        {/* Philosophy Section */}
        <div className="about-content">
          <div className="about-text" ref={philosophyTextRef}>
            <h2>{t('philosophy.title')}</h2>
            <p>
              {currentLang === 'es'
                ? 'En InBalanZ, creemos que la arquitectura debe ser más que simplemente funcional o estética. Nuestro enfoque se centra en crear espacios que promuevan el bienestar de sus habitantes a través de la integración con la naturaleza y el uso de estrategias de diseño pasivo.'
                : 'At InBalanZ, we believe architecture should be more than just functional or aesthetic. Our approach focuses on creating spaces that promote the well-being of their inhabitants through integration with nature and the use of passive design strategies.'}
            </p>
            <p>
              {currentLang === 'es'
                ? 'Trabajamos con materiales que mejoran con el tiempo, creando edificios que no solo resisten el paso de los años, sino que se vuelven más hermosos y valiosos con cada década.'
                : 'We work with materials that improve over time, creating buildings that not only withstand the passage of years but become more beautiful and valuable with each decade.'}
            </p>
            <p>
              {currentLang === 'es'
                ? 'Cada proyecto es único y personalizado, desarrollado en estrecha colaboración con nuestros clientes para entender sus necesidades, sueños y estilo de vida.'
                : 'Each project is unique and personalized, developed in close collaboration with our clients to understand their needs, dreams and lifestyle.'}
            </p>
          </div>
          <div className="about-image" ref={philosophyImageRef}>
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" alt="Architecture" />
          </div>
        </div>

        {/* Values Section */}
        <div className="values-section">
          <div className="section-title">
            <h2>
              {currentLang === 'es' ? 'Nuestros Valores' : 'Our Values'}
            </h2>
          </div>
          <div className="values-grid" ref={valuesGridRef}>
            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <h3>
                {currentLang === 'es' ? 'Sostenibilidad' : 'Sustainability'}
              </h3>
              <p>
                {currentLang === 'es'
                  ? 'Diseñamos con conciencia ambiental, minimizando el impacto ecológico y maximizando la eficiencia energética.'
                  : 'We design with environmental awareness, minimizing ecological impact and maximizing energy efficiency.'}
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>
                {currentLang === 'es' ? 'Colaboración' : 'Collaboration'}
              </h3>
              <p>
                {currentLang === 'es'
                  ? 'Trabajamos estrechamente con nuestros clientes, creando espacios que verdaderamente reflejan sus necesidades y personalidad.'
                  : 'We work closely with our clients, creating spaces that truly reflect their needs and personality.'}
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>
                {currentLang === 'es' ? 'Innovación' : 'Innovation'}
              </h3>
              <p>
                {currentLang === 'es'
                  ? 'Incorporamos las últimas tecnologías y técnicas de diseño para crear soluciones arquitectónicas contemporáneas.'
                  : 'We incorporate the latest technologies and design techniques to create contemporary architectural solutions.'}
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-award"></i>
              </div>
              <h3>
                {currentLang === 'es' ? 'Calidad' : 'Quality'}
              </h3>
              <p>
                {currentLang === 'es'
                  ? 'Nos comprometemos a la excelencia en cada detalle, desde el diseño conceptual hasta la entrega final.'
                  : 'We are committed to excellence in every detail, from conceptual design to final delivery.'}
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-compass"></i>
              </div>
              <h3>
                {currentLang === 'es' ? 'Diseño Contextual' : 'Contextual Design'}
              </h3>
              <p>
                {currentLang === 'es'
                  ? 'Cada proyecto responde a su entorno específico, integrándose armoniosamente con el paisaje y la comunidad.'
                  : 'Each project responds to its specific environment, integrating harmoniously with the landscape and community.'}
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-heart"></i>
              </div>
              <h3>
                {currentLang === 'es' ? 'Pasión' : 'Passion'}
              </h3>
              <p>
                {currentLang === 'es'
                  ? 'Amamos lo que hacemos y esa pasión se refleja en cada proyecto que emprendemos.'
                  : 'We love what we do and that passion is reflected in every project we undertake.'}
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="team-page">
          <div className="section-title">
            <h2>
              {currentLang === 'es' ? 'Nuestro Equipo' : 'Our Team'}
            </h2>
          </div>
          <div className="about-content">
            <div className="about-image" ref={teamImageRef}>
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" alt="Team" />
            </div>
            <div className="about-text" ref={teamTextRef}>
              <h3>InBalanZ</h3>
              <p>
                {currentLang === 'es'
                  ? 'Fundador y director creativo de InBalanZ. Con más de 15 años de experiencia en diseño arquitectónico, especializado en arquitectura sostenible y diseño bioclimático.'
                  : 'Founder and creative director of InBalanZ. With over 15 years of experience in architectural design, specialized in sustainable architecture and bioclimatic design.'}
              </p>
              <p>
                {currentLang === 'es'
                  ? 'Su pasión por crear espacios que mejoran la calidad de vida de las personas, combinada con un profundo respeto por el medio ambiente, define cada proyecto que lidera.'
                  : 'His passion for creating spaces that improve people\'s quality of life, combined with a deep respect for the environment, defines every project he leads.'}
              </p>
              <p>
                {currentLang === 'es'
                  ? 'Graduado con honores de la Universidad de Costa Rica, ha completado estudios de postgrado en diseño sostenible y ha trabajado en proyectos residenciales y comerciales en toda Centroamérica.'
                  : 'Graduated with honors from the University of Costa Rica, he has completed postgraduate studies in sustainable design and has worked on residential and commercial projects throughout Central America.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
