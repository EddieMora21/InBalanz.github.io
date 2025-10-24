import { useState, useEffect, useRef } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../data/projectsData';
import ImageModal from '../components/ImageModal';

gsap.registerPlugin(ScrollTrigger);

const ProjectDetail = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  // Refs para animaciones
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const metaRef = useRef(null);
  const galleryRef = useRef(null);
  const descRef = useRef(null);
  const featuresRef = useRef(null);

  const project = projectsData.find(p => p.id === id);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage('');
  };

  // Animaciones
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Hero animations
    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )
    .fromTo(metaRef.current.querySelectorAll('span'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
      '-=0.6'
    );

    // Gallery stagger
    if (galleryRef.current) {
      gsap.fromTo(galleryRef.current.querySelectorAll('img'),
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );
    }

    // Description
    if (descRef.current) {
      gsap.fromTo(descRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: descRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );
    }

    // Features
    if (featuresRef.current) {
      gsap.fromTo(featuresRef.current.querySelectorAll('.feature-item'),
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [project]);

  return (
    <div className="project-detail">
      {/* Hero del Proyecto */}
      <div className="project-detail-hero" ref={heroRef} style={{
        backgroundImage: `url(${project.images[0]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="project-detail-hero-overlay"></div>
        <div className="container">
          <div className="project-detail-hero-content">
            <Link to="/projects" className="back-button">
              <i className="fas fa-arrow-left"></i> {currentLang === 'es' ? 'Volver a Proyectos' : 'Back to Projects'}
            </Link>
            <h1 ref={titleRef}>{project.title}</h1>
            <p className="project-category">{project.category}</p>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Project Meta */}
        <div className="project-meta-section" ref={metaRef}>
          <div className="project-meta-grid">
            <div className="meta-item">
              <i className="fas fa-user"></i>
              <div>
                <span className="meta-label">{t('projects.client')}</span>
                <span className="meta-value">{project.client}</span>
              </div>
            </div>
            <div className="meta-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <span className="meta-label">{t('projects.location')}</span>
                <span className="meta-value">{project.location}</span>
              </div>
            </div>
            <div className="meta-item">
              <i className="fas fa-ruler-combined"></i>
              <div>
                <span className="meta-label">{t('projects.area')}</span>
                <span className="meta-value">{project.area}</span>
              </div>
            </div>
            <div className="meta-item">
              <i className="fas fa-calendar"></i>
              <div>
                <span className="meta-label">{t('projects.year')}</span>
                <span className="meta-value">{project.year}</span>
              </div>
            </div>
            <div className="meta-item">
              <i className="fas fa-clock"></i>
              <div>
                <span className="meta-label">{t('projects.duration')}</span>
                <span className="meta-value">{project.duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Description */}
        <div className="project-description-section" ref={descRef}>
          <h2>{currentLang === 'es' ? 'Acerca del Proyecto' : 'About the Project'}</h2>
          <p className="project-description-text">{project.description[currentLang]}</p>
        </div>

        {/* Project Gallery */}
        <div className="project-gallery-section">
          <h2>{currentLang === 'es' ? 'Galería del Proyecto' : 'Project Gallery'}</h2>
          <div className="project-gallery" ref={galleryRef}>
            {project.images.map((image, index) => (
              <div key={index} className="gallery-image-wrapper">
                <img
                  src={image}
                  alt={`${project.title} - ${index + 1}`}
                  onClick={() => openModal(image)}
                />
                <div className="gallery-overlay">
                  <i className="fas fa-search-plus"></i>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Features */}
        <div className="project-features-section">
          <h2>{t('projects.mainFeatures')}</h2>
          <div className="features-grid" ref={featuresRef}>
            {project.features[currentLang].map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Process and Challenges */}
        <div className="project-process-section">
          <h2>{t('projects.processAndChallenges')}</h2>
          <div className="process-content">
            <p>{project.process[currentLang]}</p>
          </div>
        </div>

        {/* Team */}
        <div className="team-section">
          <h2>{t('projects.team')}</h2>
          <div className="team-grid">
            {project.team.map((member, index) => (
              <div key={index} className="team-member-card">
                <div className="team-avatar">
                  {member.name.charAt(0)}
                </div>
                <h3>{member.name}</h3>
                <p className="team-role">{member.role[currentLang]}</p>
                <p className="team-bio">{member.bio[currentLang]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal isOpen={modalOpen} imageSrc={selectedImage} onClose={closeModal} />
    </div>
  );
};

export default ProjectDetail;
