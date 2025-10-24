import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });

  // Refs para animaciones
  const titleRef = useRef(null);
  const contactInfoRef = useRef(null);
  const formRef = useRef(null);
  const mapRef = useRef(null);
  const faqTitleRef = useRef(null);
  const faqGridRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(currentLang === 'es'
      ? '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.'
      : 'Message sent successfully! We will contact you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: '',
      message: ''
    });
  };

  // Animaciones
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Animación del título
    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    // Animación de la información de contacto y formulario
    gsap.fromTo(contactInfoRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contactInfoRef.current,
          start: 'top 80%',
          once: true
        }
      }
    );

    gsap.fromTo(formRef.current,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          once: true
        }
      }
    );

    // Animación del mapa
    if (mapRef.current) {
      gsap.fromTo(mapRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: mapRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );
    }

    // Animación del título de FAQ
    if (faqTitleRef.current) {
      gsap.fromTo(faqTitleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: faqTitleRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );
    }

    // Animación de los items del FAQ
    if (faqGridRef.current) {
      gsap.fromTo(faqGridRef.current.querySelectorAll('.faq-item'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: faqGridRef.current,
            start: 'top 80%',
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
    <section className="section contact-page">
      <div className="container">
        <div className="section-title" ref={titleRef}>
          <h2>{currentLang === 'es' ? 'Contáctanos' : 'Contact Us'}</h2>
          <p>
            {currentLang === 'es'
              ? 'Estamos aquí para ayudarte a hacer realidad tu proyecto arquitectónico'
              : 'We\'re here to help you make your architectural project a reality'}
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info" ref={contactInfoRef}>
            <div className="contact-info-card">
              <h3>{t('contact.info')}</h3>

              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <span className="contact-label">
                    {currentLang === 'es' ? 'Ubicación' : 'Location'}
                  </span>
                  <span className="contact-value">Costa Rica</span>
                </div>
              </div>

              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <div>
                  <span className="contact-label">
                    {currentLang === 'es' ? 'Teléfono' : 'Phone'}
                  </span>
                  <span className="contact-value">+506 8648-0008</span>
                </div>
              </div>

              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <div>
                  <span className="contact-label">Email</span>
                  <span className="contact-value">info@gsarquitecto.com</span>
                </div>
              </div>

              <div className="contact-hours">
                <h4>
                  {currentLang === 'es' ? 'Horario de Atención' : 'Business Hours'}
                </h4>
                <div className="hours-item">
                  <i className="fas fa-clock"></i>
                  <span>
                    {currentLang === 'es'
                      ? 'Lunes a Viernes: 8:00 am - 5:00 pm'
                      : 'Monday to Friday: 8:00 am - 5:00 pm'}
                  </span>
                </div>
                <div className="hours-item">
                  <i className="fas fa-clock"></i>
                  <span>
                    {currentLang === 'es'
                      ? 'Sábados: 9:00 am - 12:00 pm'
                      : 'Saturdays: 9:00 am - 12:00 pm'}
                  </span>
                </div>
              </div>

              <div className="contact-social">
                <h4>{currentLang === 'es' ? 'Síguenos' : 'Follow Us'}</h4>
                <div className="social-links">
                  <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                  <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                  <a href="#" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper" ref={formRef}>
            <div className="contact-form">
              <h3>{currentLang === 'es' ? 'Solicita tu Consulta' : 'Request Your Consultation'}</h3>
              <p className="form-subtitle">
                {currentLang === 'es'
                  ? 'Completa el formulario y nos pondremos en contacto contigo pronto'
                  : 'Fill out the form and we\'ll get back to you soon'}
              </p>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder={t('contact.name')}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder={t('contact.email')}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder={currentLang === 'es' ? 'Teléfono' : 'Phone'}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      {currentLang === 'es' ? 'Tipo de Proyecto' : 'Project Type'}
                    </option>
                    <option value="residencial">
                      {currentLang === 'es' ? 'Residencial' : 'Residential'}
                    </option>
                    <option value="comercial">
                      {currentLang === 'es' ? 'Comercial' : 'Commercial'}
                    </option>
                    <option value="remodelacion">
                      {currentLang === 'es' ? 'Remodelación' : 'Renovation'}
                    </option>
                    <option value="otros">
                      {currentLang === 'es' ? 'Otros' : 'Other'}
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder={currentLang === 'es' ? 'Cuéntanos sobre tu proyecto' : 'Tell us about your project'}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-submit">
                  {t('contact.send')}
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Mapa */}
        <div className="map-container" ref={mapRef}>
          <div className="map-placeholder">
            <i className="fas fa-map-marked-alt"></i>
            <h4>
              {currentLang === 'es'
                ? 'Costa Rica - Servicios en todo el país'
                : 'Costa Rica - Services throughout the country'}
            </h4>
            <p>
              {currentLang === 'es'
                ? 'Brindamos servicios de arquitectura en todas las provincias'
                : 'We provide architecture services in all provinces'}
            </p>
          </div>
        </div>

        {/* Preguntas Frecuentes */}
        <div className="faq-section">
          <div className="section-title" ref={faqTitleRef}>
            <h3>{currentLang === 'es' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}</h3>
          </div>

          <div className="faq-grid" ref={faqGridRef}>
            <div className="faq-item">
              <h4>
                {currentLang === 'es'
                  ? '¿Cuál es el proceso para comenzar un proyecto?'
                  : 'What is the process to start a project?'}
              </h4>
              <p>
                {currentLang === 'es'
                  ? 'Comenzamos con una consulta inicial para entender tus necesidades, luego desarrollamos propuestas conceptuales y finalmente elaboramos la documentación técnica completa.'
                  : 'We start with an initial consultation to understand your needs, then develop conceptual proposals and finally prepare the complete technical documentation.'}
              </p>
            </div>

            <div className="faq-item">
              <h4>
                {currentLang === 'es'
                  ? '¿Qué información necesitan para cotizar un proyecto?'
                  : 'What information do you need to quote a project?'}
              </h4>
              <p>
                {currentLang === 'es'
                  ? 'Necesitamos conocer el tipo de proyecto, dimensiones del terreno, requerimientos específicos y tu presupuesto aproximado.'
                  : 'We need to know the type of project, land dimensions, specific requirements and your approximate budget.'}
              </p>
            </div>

            <div className="faq-item">
              <h4>
                {currentLang === 'es'
                  ? '¿Trabajan con clientes internacionales?'
                  : 'Do you work with international clients?'}
              </h4>
              <p>
                {currentLang === 'es'
                  ? 'Sí, tenemos experiencia trabajando con clientes extranjeros que desean construir o remodelar en Costa Rica.'
                  : 'Yes, we have experience working with foreign clients who want to build or remodel in Costa Rica.'}
              </p>
            </div>

            <div className="faq-item">
              <h4>
                {currentLang === 'es'
                  ? '¿Ofrecen servicios de construcción?'
                  : 'Do you offer construction services?'}
              </h4>
              <p>
                {currentLang === 'es'
                  ? 'Nos especializamos en diseño y dirección de obra. Trabajamos con constructores de confianza que podemos recomendar según tu proyecto.'
                  : 'We specialize in design and construction management. We work with trusted builders that we can recommend based on your project.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
