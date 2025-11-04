import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonialsData } from '../data/testimonialsData';

gsap.registerPlugin(ScrollTrigger);

function TestimonialsCarousel() {
  const { t, i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Refs for animations
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardRef = useRef(null);
  const starsRef = useRef(null);
  const textRef = useRef(null);
  const authorRef = useRef(null);
  const imageRef = useRef(null);
  const dotsRef = useRef(null);

  // Initial entrance animation
  useEffect(() => {
    // Set initial opacity to 1 for CSS
    gsap.set([titleRef.current, subtitleRef.current, cardRef.current], { opacity: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true
      }
    });

    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(cardRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.2)' },
      '-=0.3'
    )
    .fromTo(dotsRef.current.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
      '-=0.5'
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Animate card content change
  useEffect(() => {
    if (!cardRef.current) return;

    const tl = gsap.timeline();

    // Fade out current content
    tl.to([starsRef.current, textRef.current, authorRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: 'power2.in'
    })
    .to(imageRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: 'power2.in'
    }, '<')
    // Fade in new content
    .fromTo(starsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    )
    .fromTo(textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo(authorRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo(imageRef.current,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.5'
    );

    // Animate stars individually
    if (starsRef.current) {
      gsap.fromTo(starsRef.current.children,
        { scale: 0, rotation: -180 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: 'back.out(2)',
          delay: 0.3
        }
      );
    }
  }, [currentIndex]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonialsData[currentIndex];
  const currentLang = i18n.language;

  // Generate stars based on rating
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <i
        key={index}
        className={`fas fa-star ${index < rating ? 'star-filled' : 'star-empty'}`}
      ></i>
    ));
  };

  return (
    <section className="testimonials-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" ref={titleRef}>{t('testimonials.title')}</h2>
          <p className="section-subtitle" ref={subtitleRef}>{t('testimonials.subtitle')}</p>
        </div>

        <div className="testimonials-carousel">
          <button
            className="carousel-button carousel-button-prev"
            onClick={handlePrevious}
            aria-label="Previous testimonial"
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          <div className="testimonial-card" ref={cardRef}>
            <div className="testimonial-content">
              <div className="testimonial-stars" ref={starsRef}>
                {renderStars(currentTestimonial.rating)}
              </div>

              <blockquote className="testimonial-text" ref={textRef}>
                "{currentTestimonial.shortTestimonial[currentLang]}"
              </blockquote>

              <div className="testimonial-author" ref={authorRef}>
                <div className="author-photo">
                  <img
                    src={currentTestimonial.clientPhoto}
                    alt={currentTestimonial.name}
                  />
                </div>
                <div className="author-info">
                  <h4 className="author-name">{currentTestimonial.name}</h4>
                  <p className="author-project">
                    {currentTestimonial.project[currentLang]} - {currentTestimonial.projectType[currentLang]}
                  </p>
                  <p className="author-year">{currentTestimonial.year}</p>
                </div>
              </div>
            </div>

            <div className="testimonial-image" ref={imageRef}>
              <img
                src={currentTestimonial.image}
                alt={currentTestimonial.project[currentLang]}
              />
            </div>
          </div>

          <button
            className="carousel-button carousel-button-next"
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        <div className="carousel-dots" ref={dotsRef}>
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsCarousel;
