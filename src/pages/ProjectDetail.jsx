import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  // Refs
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const horizontalSectionRef = useRef(null);
  const horizontalWrapperRef = useRef(null);

  const project = projectsData.find(p => p.id === id);

  // Find next project
  const currentIndex = projectsData.findIndex(p => p.id === id);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  // Duplicate images for horizontal scroll effect if needed
  const galleryImages = project ? [...project.images, ...project.images] : [];

  useLayoutEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      // Hero Parallax
      gsap.to('.hero-bg', {
        yPercent: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // Pinned Story Section
      const storySection = document.querySelector('.story-section');
      if (storySection && window.innerWidth > 768) {
        const details = storySection.querySelector('.story-details');
        const images = storySection.querySelector('.story-images');

        ScrollTrigger.create({
          trigger: storySection,
          start: 'top top',
          end: 'bottom bottom',
          pin: details,
          scrub: true
        });
      }

      // Horizontal Scroll Gallery
      if (horizontalSectionRef.current && horizontalWrapperRef.current) {
        const sections = gsap.utils.toArray('.horizontal-item');
        const totalWidth = sections.length * 100; // 100vw per item or adjust based on width

        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: horizontalSectionRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () => "+=" + horizontalWrapperRef.current.offsetWidth
          }
        });
      }

      // Fade in elements
      gsap.utils.toArray('.fade-up').forEach(elem => {
        gsap.fromTo(elem,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: elem,
              start: 'top 85%'
            }
          }
        );
      });

    }, mainRef);

    return () => ctx.revert();
  }, [project, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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

  return (
    <div className="project-detail-page" ref={mainRef} style={{ overflowX: 'hidden' }}>

      {/* Hero Section */}
      <div ref={heroRef} style={{
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="hero-bg" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '120%', // Taller for parallax
          backgroundImage: `url(${project.images[0]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1
        }}></div>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.4)',
          zIndex: 0
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white' }}>
          <span className="fade-up" style={{
            display: 'block',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            marginBottom: '20px',
            fontSize: '1rem'
          }}>
            {project.category}
          </span>
          <h1 className="fade-up" style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            lineHeight: 1,
            marginBottom: '30px',
            textShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}>
            {project.title}
          </h1>
          <div className="fade-up" style={{ display: 'flex', justifyContent: 'center', gap: '40px', fontSize: '1.1rem' }}>
            <span>{project.location}</span>
            <span>{project.year}</span>
          </div>
        </div>
      </div>

      {/* Intro Section */}
      <section className="section" style={{ padding: '150px 0', backgroundColor: 'white' }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <p className="fade-up" style={{
              fontSize: '1.8rem',
              lineHeight: 1.6,
              color: 'var(--primary-color)',
              fontFamily: 'Georgia, serif'
            }}>
              "{project.shortDescription[currentLang]}"
            </p>
            <div className="fade-up" style={{
              marginTop: '80px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '40px',
              textAlign: 'left'
            }}>
              <div>
                <h4 style={{ color: '#999', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '10px' }}>{t('projects.client')}</h4>
                <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>{project.client}</p>
              </div>
              <div>
                <h4 style={{ color: '#999', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '10px' }}>{t('projects.area')}</h4>
                <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>{project.area}</p>
              </div>
              <div>
                <h4 style={{ color: '#999', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '10px' }}>{t('projects.duration')}</h4>
                <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>{project.duration}</p>
              </div>
              <div>
                <h4 style={{ color: '#999', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '10px' }}>{t('projects.team')}</h4>
                <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>InBalanz Team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pinned Story Section */}
      <section className="story-section" style={{
        display: 'flex',
        flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
        backgroundColor: '#f5f5f5'
      }}>
        <div className="story-details" style={{
          width: window.innerWidth <= 768 ? '100%' : '40%',
          height: window.innerWidth <= 768 ? 'auto' : '100vh',
          padding: '80px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5'
        }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '30px', color: 'var(--primary-color)' }}>
            {currentLang === 'es' ? 'La Historia' : 'The Story'}
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#555', marginBottom: '30px' }}>
            {project.description[currentLang]}
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#555' }}>
            {project.process[currentLang]}
          </p>
        </div>
        <div className="story-images" style={{
          width: window.innerWidth <= 768 ? '100%' : '60%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {project.images.slice(0, 3).map((img, i) => (
            <div key={i} style={{ height: '100vh', width: '100%' }}>
              <img src={img} alt="Project detail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </section>

      {/* Horizontal Scroll Gallery */}
      <section ref={horizontalSectionRef} style={{
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#111',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div ref={horizontalWrapperRef} style={{ display: 'flex', height: '80vh', paddingLeft: '10vw' }}>
          <div className="horizontal-item" style={{
            minWidth: '40vw',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '5vw',
            color: 'white'
          }}>
            <div>
              <h2 style={{ fontSize: '3rem', marginBottom: '20px' }}>
                {currentLang === 'es' ? 'Galería Visual' : 'Visual Gallery'}
              </h2>
              <p style={{ opacity: 0.7 }}>
                {currentLang === 'es' ? 'Desliza para explorar' : 'Scroll to explore'} &rarr;
              </p>
            </div>
          </div>
          {galleryImages.map((img, i) => (
            <div key={i} className="horizontal-item" style={{
              minWidth: '60vw',
              height: '100%',
              marginRight: '5vw',
              position: 'relative'
            }}>
              <img src={img} alt="Gallery" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onClick={() => openModal(img)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="section" style={{ padding: '150px 0' }}>
        <div className="container">
          <h2 className="fade-up" style={{ textAlign: 'center', marginBottom: '80px', fontSize: '2.5rem' }}>
            {t('projects.mainFeatures')}
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {project.features[currentLang].map((feature, i) => (
              <div key={i} className="fade-up" style={{
                padding: '30px',
                border: '1px solid #eee',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px'
              }}>
                <i className="fas fa-check" style={{ color: 'var(--accent-color)' }}></i>
                <span style={{ fontSize: '1.1rem' }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Project Footer */}
      <section style={{
        height: '60vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${nextProject.images[0]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4)',
          zIndex: -1
        }}></div>
        <div style={{ textAlign: 'center', color: 'white', zIndex: 1 }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px' }}>
            {currentLang === 'es' ? 'Siguiente Proyecto' : 'Next Project'}
          </p>
          <h2 style={{ fontSize: '4rem', marginBottom: '30px' }}>{nextProject.title}</h2>
          <Link to={`/projects/${nextProject.id}`} className="btn-outline" style={{
            borderColor: 'white',
            color: 'white',
            padding: '15px 40px'
          }}>
            {currentLang === 'es' ? 'Ver Proyecto' : 'View Project'}
          </Link>
        </div>
      </section>

      <ImageModal isOpen={modalOpen} imageSrc={selectedImage} onClose={closeModal} />
    </div>
  );
};

export default ProjectDetail;
