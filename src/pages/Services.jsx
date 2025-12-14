import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const { t } = useTranslation();

  // Refs para animaciones
  const heroRef = useRef(null);
  const serviceIndexRef = useRef(null);
  const scopeSectionRef = useRef(null);
  const whyBiosRef = useRef(null);
  const ctaRef = useRef(null);

  // Animaciones GSAP
  useEffect(() => {
    // Parallax Hero
    if (heroRef.current) {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(
        heroRef.current.querySelector('h1'),
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }
      ).fromTo(
        heroRef.current.querySelector('p'),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.8'
      );

      gsap.to(heroRef.current.querySelector('.container'), {
        y: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // Animación de las tarjetas de servicio del índice
    if (serviceIndexRef.current) {
      const cards = serviceIndexRef.current.querySelectorAll('.service-index-card');
      gsap.fromTo(
        cards,
        { y: 100, opacity: 0, rotationX: 15 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: serviceIndexRef.current,
            start: 'top 80%',
            end: 'bottom 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Animación de las tarjetas alternadas
    if (scopeSectionRef.current) {
      const cards = scopeSectionRef.current.querySelectorAll('.service-card');
      gsap.fromTo(
        cards,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: scopeSectionRef.current,
            start: 'top 75%',
          }
        }
      );
    }

    // Animación de la sección "Por qué BIOS"
    if (whyBiosRef.current) {
      gsap.fromTo(
        whyBiosRef.current,
        { backgroundPosition: '50% 0px' },
        {
          backgroundPosition: '50% 100px',
          ease: 'none',
          scrollTrigger: {
            trigger: whyBiosRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );

      gsap.fromTo(
        whyBiosRef.current.querySelector('.why-bios-title'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: whyBiosRef.current,
            start: 'top 75%',
          }
        }
      );

      const teamItems = whyBiosRef.current.querySelectorAll('.team-member');
      gsap.fromTo(
        teamItems,
        { y: 50, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: {
            amount: 0.8,
            grid: [3, 3],
            from: "center"
          },
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: whyBiosRef.current.querySelector('.team-grid'),
            start: 'top 80%',
          }
        }
      );
    }

    // Animación del CTA
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'elastic.out(1, 0.3)',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 90%',
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="section services-page-new-wrapper" style={{ padding: 0 }}>
      {/* Hero Section */}
      <div className="services-hero-new parallax-wrapper" ref={heroRef}>
        <div className="container">
          <h1>{t('services.title')}</h1>
          <p className="services-subtitle">{t('services.subtitle')}</p>
        </div>
      </div>

      <div className="container">
        {/* Service Index */}
        <div className="service-index-section" ref={serviceIndexRef}>
          <div className="service-index-grid">
            <div className="service-index-card">
              <div className="service-card-number">01</div>
              <h3>{t('services.service1')}</h3>
              <p className="service-card-description">{t('services.service1Short')}</p>
              <a href="#estudios-preliminares" className="service-link">
                {t('services.moreInfo')} <i className="fas fa-arrow-right"></i>
              </a>
            </div>

            <div className="service-index-card">
              <div className="service-card-number">02</div>
              <h3>{t('services.service2')}</h3>
              <p className="service-card-description">{t('services.service2Short')}</p>
              <a href="#diseno-arquitectonico" className="service-link">
                {t('services.moreInfo')} <i className="fas fa-arrow-right"></i>
              </a>
            </div>

            <div className="service-index-card">
              <div className="service-card-number">03</div>
              <h3>{t('services.service3')}</h3>
              <p className="service-card-description">{t('services.service3Short')}</p>
              <a href="#planos-constructivos" className="service-link">
                {t('services.moreInfo')} <i className="fas fa-arrow-right"></i>
              </a>
            </div>

            <div className="service-index-card">
              <div className="service-card-number">04</div>
              <h3>{t('services.service4')}</h3>
              <p className="service-card-description">{t('services.service4Short')}</p>
              <a href="#direccion-obra" className="service-link">
                {t('services.moreInfo')} <i className="fas fa-arrow-right"></i>
              </a>
            </div>

            <div className="service-index-card">
              <div className="service-card-number">05</div>
              <h3>{t('services.service5')}</h3>
              <p className="service-card-description">{t('services.service5Short')}</p>
              <a href="#diseno-interno" className="service-link">
                {t('services.moreInfo')} <i className="fas fa-arrow-right"></i>
              </a>
            </div>

            <div className="service-index-card">
              <div className="service-card-number">06</div>
              <h3>{t('services.service6')}</h3>
              <p className="service-card-description">{t('services.service6Short')}</p>
              <a href="#tramitologia" className="service-link">
                {t('services.moreInfo')} <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Scope Section - Alternating Cards */}
        <div className="scope-section" ref={scopeSectionRef}>
          <h2 className="scope-main-title">{t('services.scopeTitle')}</h2>

          <div className="alternating-cards">
            {/* Item 1: Left */}
            <div className="service-card left" id="estudios-preliminares">
              <div className="card-number">01</div>
              <div className="card-content">
                <h3 className="card-title">{t('services.preliminaryStudies')}</h3>
                <p className="card-desc">{t('services.service1Desc')}</p>
                <div className="card-tags">
                  <span className="tag"><i className="fas fa-map-marked-alt"></i> {t('services.siteVisit')}</span>
                  <span className="tag"><i className="fas fa-users"></i> {t('services.coordination')}</span>
                  <span className="tag"><i className="fas fa-clipboard-list"></i> {t('services.analysisCollection')}</span>
                  <span className="tag"><i className="fas fa-tree"></i> {t('services.masterPlan')}</span>
                  <span className="tag"><i className="fas fa-ruler-combined"></i> {t('services.architecturalDistribution')}</span>
                </div>
              </div>
            </div>

            {/* Item 2: Right */}
            <div className="service-card right" id="diseno-arquitectonico">
              <div className="card-number">02</div>
              <div className="card-content">
                <h3 className="card-title">{t('services.preliminaryProject')}</h3>
                <p className="card-desc">{t('services.service2Desc')}</p>
                <div className="card-tags">
                  <span className="tag"><i className="fas fa-image"></i> {t('services.photorealisticRenderings')}</span>
                </div>
              </div>
            </div>

            {/* Item 3: Left */}
            <div className="service-card left" id="planos-constructivos">
              <div className="card-number">03</div>
              <div className="card-content">
                <h3 className="card-title">{t('services.constructionPlans')}</h3>
                <p className="card-desc">{t('services.service3Desc')}</p>
                <div className="card-tags">
                  <span className="tag"><i className="fas fa-drafting-compass"></i> {t('services.architecturalPlans')}</span>
                  <span className="tag"><i className="fas fa-building"></i> {t('services.structuralPlans')}</span>
                  <span className="tag"><i className="fas fa-bolt"></i> {t('services.electricalPlans')}</span>
                  <span className="tag"><i className="fas fa-seedling"></i> {t('services.landscapePlans')}</span>
                </div>
              </div>
            </div>

            {/* Item 4: Right */}
            <div className="service-card right" id="direccion-obra">
              <div className="card-number">04</div>
              <div className="card-content">
                <h3 className="card-title">{t('services.service4')}</h3>
                <p className="card-desc">{t('services.service4Desc')}</p>
              </div>
            </div>

            {/* Item 5: Left */}
            <div className="service-card left" id="diseno-interno">
              <div className="card-number">05</div>
              <div className="card-content">
                <h3 className="card-title">{t('services.interiorDesign')}</h3>
                <p className="card-desc">{t('services.service5Desc')}</p>
              </div>
            </div>

            {/* Item 6: Right */}
            <div className="service-card right" id="tramitologia">
              <div className="card-number">06</div>
              <div className="card-content">
                <h3 className="card-title">{t('services.permits')}</h3>
                <p className="card-desc">{t('services.service6Desc')}</p>
                <div className="card-tags">
                  <span className="tag"><i className="fas fa-building"></i> {t('services.condoAdmin')}</span>
                  <span className="tag"><i className="fas fa-certificate"></i> {t('services.cfia')}</span>
                  <span className="tag"><i className="fas fa-city"></i> {t('services.municipalities')}</span>
                  <span className="tag"><i className="fas fa-leaf"></i> {t('services.setena')}</span>
                  <span className="tag"><i className="fas fa-shield-alt"></i> {t('services.ins')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why BIOS Section */}
        <div className="why-bios-section" ref={whyBiosRef}>
          <h2 className="why-bios-title">{t('services.whyBios')}</h2>
          <p className="why-bios-text">{t('services.whyBiosText')}</p>

          <div className="team-section">
            <h3 className="team-title">{t('services.multidisciplinaryTeam')}</h3>
            <div className="team-grid">
              <div className="team-member">
                <i className="fas fa-pencil-ruler"></i>
                <span>{t('services.architects')}</span>
              </div>
              <div className="team-member">
                <i className="fas fa-couch"></i>
                <span>{t('services.interiorDesigner')}</span>
              </div>
              <div className="team-member">
                <i className="fas fa-hard-hat"></i>
                <span>{t('services.structuralEngineer')}</span>
              </div>
              <div className="team-member">
                <i className="fas fa-plug"></i>
                <span>{t('services.electromechanicalEngineer')}</span>
              </div>
              <div className="team-member">
                <i className="fas fa-tasks"></i>
                <span>{t('services.projectManager')}</span>
              </div>
              <div className="team-member">
                <i className="fas fa-calculator"></i>
                <span>{t('services.budgetSpecialist')}</span>
              </div>
              <div className="team-member">
                <i className="fas fa-map"></i>
                <span>{t('services.surveyors')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="services-cta" ref={ctaRef}>
          <Link to="/contact" className="btn btn-primary">
            {t('services.requestQuote')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
