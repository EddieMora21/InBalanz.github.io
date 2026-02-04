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

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Refs
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const horizontalSectionRef = useRef(null);
  const horizontalWrapperRef = useRef(null);
  const mobileCarouselRef = useRef(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentGallerySlide, setCurrentGallerySlide] = useState(0);

  const project = projectsData.find(p => p.id === id);

  // Find next project
  const currentIndex = projectsData.findIndex(p => p.id === id);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  // Gallery images for horizontal scroll
  const galleryImages = project ? project.images : [];

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

      // Pinned Story Section with Narrative Animation
      const storySection = document.querySelector('.story-section');
      if (storySection) {
        if (!isMobile) {
          const details = storySection.querySelector('.story-details');

          ScrollTrigger.create({
            trigger: storySection,
            start: 'top top',
            end: 'bottom bottom',
            pin: details,
            scrub: true
          });
        }

        if (!isMobile) {
          // Chapter animation synced with images
          const chapters = storySection.querySelectorAll('.narrative-chapter');
          const images = storySection.querySelectorAll('.story-images > div');

          images.forEach((image, i) => {
            if (chapters[i]) {
              ScrollTrigger.create({
                trigger: image,
                start: 'top 50%',
                end: 'bottom 50%',
                onEnter: () => {
                  gsap.to(chapters, { opacity: 0, y: 20, visibility: 'hidden', duration: 0.4 });
                  gsap.fromTo(chapters[i],
                    { opacity: 0, y: 20, visibility: 'hidden' },
                    { opacity: 1, y: 0, visibility: 'visible', duration: 0.6, ease: 'power2.out' }
                  );
                },
                onEnterBack: () => {
                  gsap.to(chapters, { opacity: 0, y: 20, visibility: 'hidden', duration: 0.4 });
                  gsap.fromTo(chapters[i],
                    { opacity: 0, y: -20, visibility: 'hidden' },
                    { opacity: 1, y: 0, visibility: 'visible', duration: 0.6, ease: 'power2.out' }
                  );
                }
              });
            }
          });
        }
      }

      // Horizontal Scroll Animation - Desktop Only
      if (!isMobile && horizontalSectionRef.current && horizontalWrapperRef.current) {
        const wrapper = horizontalWrapperRef.current;
        const scrollWidth = wrapper.scrollWidth - window.innerWidth;

        gsap.to(wrapper, {
          x: -scrollWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: horizontalSectionRef.current,
            start: 'top top',
            end: () => `+=${scrollWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
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
  }, [project, id, isMobile]); // Added isMobile to dependency array

  // Scroll listener for mobile carousel to sync dots
  useEffect(() => {
    const carousel = mobileCarouselRef.current;
    if (isMobile && carousel) {
      const handleScroll = () => {
        const slideWidth = carousel.offsetWidth;
        const newSlide = Math.round(carousel.scrollLeft / slideWidth);
        if (newSlide !== currentSlide) {
          setCurrentSlide(newSlide);
        }
      };
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, [isMobile, currentSlide]);

  const scrollCarousel = (direction) => {
    const carousel = mobileCarouselRef.current;
    if (carousel) {
      const slideWidth = carousel.offsetWidth;
      const targetScroll = carousel.scrollLeft + (direction === 'next' ? slideWidth : -slideWidth);
      carousel.scrollTo({ left: targetScroll, behavior: behavior }); // Fixed to use behavior variable if needed, or just stay behavior
    }
  };

  // Scroll listener for horizontal gallery (Visual Gallery)
  useEffect(() => {
    const wrapper = horizontalWrapperRef.current;
    if (isMobile && wrapper) {
      const handleScroll = () => {
        const itemWidth = wrapper.offsetWidth * 0.85 + 15; // 85vw width + 15px margin
        const newSlide = Math.round(wrapper.scrollLeft / itemWidth);
        if (newSlide !== currentGallerySlide) {
          setCurrentGallerySlide(newSlide);
        }
      };
      wrapper.addEventListener('scroll', handleScroll);
      return () => wrapper.removeEventListener('scroll', handleScroll);
    }
  }, [isMobile, currentGallerySlide]);

  const scrollGallery = (direction) => {
    const wrapper = horizontalWrapperRef.current;
    if (wrapper) {
      const itemWidth = wrapper.offsetWidth * 0.85 + 15;
      const targetScroll = wrapper.scrollLeft + (direction === 'next' ? itemWidth : -itemWidth);
      wrapper.scrollTo({ left: targetScroll, behavior: 'smooth' });
    }
  };

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
      <section className="section" style={{ padding: isMobile ? '80px 0' : '150px 0', backgroundColor: 'white' }}>
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
              textAlign: isMobile ? 'center' : 'left'
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

      {/* Pinned Story Section (Desktop) / Carousel (Mobile) */}
      <section className="story-section" style={{
        backgroundColor: '#f5f5f5',
        position: 'relative',
        overflow: isMobile ? 'hidden' : 'visible'
      }}>
        {isMobile ? (
          /* Mobile: Unified Horizontal Carousel */
          <div className="mobile-story-container" style={{ position: 'relative' }}>
            <div
              ref={mobileCarouselRef}
              className="mobile-story-carousel"
              style={{
                display: 'flex',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {[
                {
                  num: '01',
                  title: currentLang === 'es' ? 'La Historia' : 'The History',
                  subtitle: currentLang === 'es' ? 'Origen y Contexto' : 'Origin & Context',
                  text: project.description[currentLang].split('. ').slice(0, 3).join('. ') + '.',
                  img: project.images[0]
                },
                {
                  num: '02',
                  title: currentLang === 'es' ? 'El Concepto' : 'The Concept',
                  subtitle: currentLang === 'es' ? 'Filosofía de Diseño' : 'Design Philosophy',
                  text: project.shortDescription[currentLang],
                  img: project.images[1]
                },
                {
                  num: '03',
                  title: currentLang === 'es' ? 'Visión' : 'Vision',
                  subtitle: currentLang === 'es' ? 'Relación con el Entorno' : 'Relationship with Nature',
                  text: project.description[currentLang].split('. ').slice(3, 7).join('. ') + '.',
                  img: project.images[2]
                },
                {
                  num: '04',
                  title: currentLang === 'es' ? 'Características' : 'Features',
                  subtitle: currentLang === 'es' ? 'Atributos Clave' : 'Key Attributes',
                  features: project.features[currentLang].slice(0, 4),
                  img: project.images[3]
                },
                {
                  num: '05',
                  title: currentLang === 'es' ? 'El Proceso' : 'The Process',
                  subtitle: currentLang === 'es' ? 'Desarrollo Técnico' : 'Technical Development',
                  text: project.process[currentLang],
                  img: project.images[4]
                }
              ].map((slide, i) => (
                <div key={i} className="story-slide" style={{
                  minWidth: '100%',
                  scrollSnapAlign: 'start',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {/* Top: Text Content */}
                  <div style={{ padding: '40px 25px', backgroundColor: '#f5f5f5' }}>
                    <h2 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '3px', color: '#999', marginBottom: '10px' }}>{slide.num}. {slide.title}</h2>
                    <h3 style={{ fontSize: '1.8rem', marginBottom: '15px', color: 'var(--primary-color)' }}>{slide.subtitle}</h3>
                    {slide.features ? (
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {slide.features.map((f, idx) => (
                          <li key={idx} style={{ fontSize: '0.9rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <i className="fas fa-check" style={{ color: 'var(--accent-color)', fontSize: '0.7rem' }}></i>
                            {f}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#333' }}>{slide.text}</p>
                    )}

                    {/* Dots Container (Synced) */}
                    <div style={{
                      marginTop: '25px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      {[0, 1, 2, 3, 4].map(dot => (
                        <div key={dot} style={{
                          width: dot === currentSlide ? '24px' : '8px',
                          height: '4px',
                          backgroundColor: dot === currentSlide ? 'var(--accent-color)' : '#ccc',
                          borderRadius: '4px',
                          transition: 'all 0.3s'
                        }}></div>
                      ))}
                    </div>
                  </div>
                  {/* Bottom: Image */}
                  <div style={{ height: '50vh', width: '100%' }}>
                    <img src={slide.img} alt={slide.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows Overlay */}
            {currentSlide > 0 && (
              <button
                onClick={() => scrollCarousel('prev')}
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '65%',
                  transform: 'translateY(-50%)',
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(10px)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 20,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  color: 'var(--primary-color)'
                }}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
            )}
            {currentSlide < 4 && (
              <button
                onClick={() => scrollCarousel('next')}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '65%',
                  transform: 'translateY(-50%)',
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(10px)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 20,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  color: 'var(--primary-color)'
                }}
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            )}
          </div>
        ) : (
          /* Desktop: GSAP Pinned Side-by-Side */
          <div style={{ display: 'flex' }}>
            <div className="story-details" style={{
              width: '40%',
              height: '100vh',
              padding: '80px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: '#f5f5f5',
              position: 'relative'
            }}>
              <div className="narrative-chapters" style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}>
                <div className="narrative-chapter" data-chapter="0" style={{ opacity: 1, visibility: 'visible', transition: 'opacity 0.4s, transform 0.4s', width: '100%' }}>
                  <h2 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '3px', color: '#999', marginBottom: '10px' }}>01. {currentLang === 'es' ? 'La Historia' : 'The History'}</h2>
                  <h3 style={{ fontSize: '2.5rem', marginBottom: '30px', color: 'var(--primary-color)' }}>{currentLang === 'es' ? 'Origen y Contexto' : 'Origin & Context'}</h3>
                  <p style={{ fontSize: '1.2rem', lineHeight: 1.6, color: '#333' }}>
                    {project.description[currentLang].split('. ').slice(0, 3).join('. ') + '.'}
                  </p>
                </div>
                <div className="narrative-chapter" data-chapter="1" style={{ position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)', opacity: 0, visibility: 'hidden', transition: 'opacity 0.4s, transform 0.4s' }}>
                  <h2 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '3px', color: '#999', marginBottom: '10px' }}>02. {currentLang === 'es' ? 'El Concepto' : 'The Concept'}</h2>
                  <h3 style={{ fontSize: '2.5rem', marginBottom: '30px', color: 'var(--primary-color)' }}>{currentLang === 'es' ? 'Filosofía de Diseño' : 'Design Philosophy'}</h3>
                  <p style={{ fontSize: '1.2rem', lineHeight: 1.6, color: '#333' }}>
                    {project.shortDescription[currentLang]}
                  </p>
                </div>
                <div className="narrative-chapter" data-chapter="2" style={{ position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)', opacity: 0, visibility: 'hidden', transition: 'opacity 0.4s, transform 0.4s' }}>
                  <h2 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '3px', color: '#999', marginBottom: '10px' }}>03. {currentLang === 'es' ? 'Visión' : 'Vision'}</h2>
                  <h3 style={{ fontSize: '2.5rem', marginBottom: '30px', color: 'var(--primary-color)' }}>{currentLang === 'es' ? 'Relación con el Entorno' : 'Relationship with Nature'}</h3>
                  <p style={{ fontSize: '1.2rem', lineHeight: 1.6, color: '#333' }}>
                    {project.description[currentLang].split('. ').slice(3, 7).join('. ') + '.'}
                  </p>
                </div>
                <div className="narrative-chapter" data-chapter="3" style={{ position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)', opacity: 0, visibility: 'hidden', transition: 'opacity 0.4s, transform 0.4s' }}>
                  <h2 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '3px', color: '#999', marginBottom: '10px' }}>04. {currentLang === 'es' ? 'Características' : 'Features'}</h2>
                  <h3 style={{ fontSize: '2.5rem', marginBottom: '30px', color: 'var(--primary-color)' }}>{currentLang === 'es' ? 'Atributos Clave' : 'Key Attributes'}</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {project.features[currentLang].slice(0, 4).map((f, i) => (
                      <li key={i} style={{ fontSize: '1.1rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <i className="fas fa-check" style={{ color: 'var(--accent-color)', fontSize: '0.7rem' }}></i>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="narrative-chapter" data-chapter="4" style={{ position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)', opacity: 0, visibility: 'hidden', transition: 'opacity 0.4s, transform 0.4s' }}>
                  <h2 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '3px', color: '#999', marginBottom: '10px' }}>05. {currentLang === 'es' ? 'El Proceso' : 'The Process'}</h2>
                  <h3 style={{ fontSize: '2.5rem', marginBottom: '30px', color: 'var(--primary-color)' }}>{currentLang === 'es' ? 'Desarrollo Técnico' : 'Technical Development'}</h3>
                  <p style={{ fontSize: '1.2rem', lineHeight: 1.6, color: '#333' }}>
                    {project.process[currentLang]}
                  </p>
                </div>
              </div>
            </div>
            <div className="story-images" style={{ width: '60%', display: 'flex', flexDirection: 'column' }}>
              {project.images.slice(0, 5).map((img, i) => (
                <div key={i} style={{ height: '100vh', width: '100%' }}>
                  <img src={img} alt="Project detail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Horizontal Scroll Gallery */}
      <section ref={horizontalSectionRef} className="horizontal-gallery-section" style={{
        height: isMobile ? 'auto' : '100vh',
        minHeight: isMobile ? '80vh' : '100vh',
        overflow: 'hidden',
        backgroundColor: '#111',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: isMobile ? '60px 0' : 0
      }}>
        {/* Mobile Title Section */}
        {isMobile && (
          <div className="mobile-gallery-info" style={{ padding: '0 25px', marginBottom: '30px', color: 'white' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>
              {currentLang === 'es' ? 'Galería Visual' : 'Visual Gallery'}
            </h2>
            <p style={{ opacity: 0.5, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {currentLang === 'es' ? 'Desliza para explorar' : 'Swipe to explore'} <i className="fas fa-arrow-right"></i>
            </p>
          </div>
        )}

        <div className="horizontal-gallery-container" style={{ position: 'relative' }}>
          <div ref={horizontalWrapperRef} className="horizontal-wrapper" style={{
            display: 'flex',
            height: isMobile ? '60vh' : '80vh',
            paddingLeft: isMobile ? '25px' : '10vw',
            overflowX: isMobile ? 'auto' : 'visible',
            scrollSnapType: isMobile ? 'x mandatory' : 'none',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none'
          }}>
            {!isMobile && (
              <div className="horizontal-item intro-item" style={{
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
            )}
            {galleryImages.map((img, i) => (
              <div key={i} className="horizontal-item" style={{
                minWidth: isMobile ? '85vw' : '65vw',
                height: '100%',
                marginRight: isMobile ? '15px' : '5vw',
                position: 'relative',
                scrollSnapAlign: 'start',
                borderRadius: isMobile ? '15px' : 0,
                overflow: 'hidden'
              }}>
                <img src={img} alt="Gallery" style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  cursor: 'pointer'
                }}
                  onClick={() => openModal(img)}
                />
                <div className="gallery-counter" style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  color: 'white',
                  fontSize: '0.8rem'
                }}>
                  {i + 1} / {galleryImages.length}
                </div>
              </div>
            ))}
          </div>

          {/* Gallery Arrows Overlay (Mobile Only) */}
          {isMobile && currentGallerySlide > 0 && (
            <button
              onClick={() => scrollGallery('prev')}
              style={{
                position: 'absolute',
                left: '5px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 20,
                color: 'white'
              }}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
          )}
          {isMobile && currentGallerySlide < galleryImages.length - 1 && (
            <button
              onClick={() => scrollGallery('next')}
              style={{
                position: 'absolute',
                right: '5px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 20,
                color: 'white'
              }}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          )}
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
          <h2 style={{ fontSize: isMobile ? '2.5rem' : '4rem', marginBottom: '30px' }}>{nextProject.title}</h2>
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
