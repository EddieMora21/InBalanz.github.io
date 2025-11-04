import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonialsData } from '../data/testimonialsData';

gsap.registerPlugin(ScrollTrigger);

function TestimonialsDetailed() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);

  // Initialize refs array
  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, testimonialsData.length);
  }, []);

  // Entrance animations
  useEffect(() => {
    // Set initial opacity to 1 for CSS
    gsap.set([titleRef.current, subtitleRef.current], { opacity: 1 });

    // Animate section header
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true
      }
    });

    headerTl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.5'
    );

    // Animate each card on scroll
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const cardTl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          once: true
        }
      });

      const image = card.querySelector('.testimonial-detailed-image');
      const content = card.querySelector('.testimonial-detailed-content');
      const stars = card.querySelectorAll('.testimonial-rating i');
      const authorPhoto = card.querySelector('.author-photo-detailed');
      const authorName = card.querySelector('.testimonial-author-name');
      const projectType = card.querySelector('.testimonial-project-type');
      const testimonialText = card.querySelector('.testimonial-full-text');

      // Card entrance
      cardTl.fromTo(card,
        { y: 80, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
      );

      // Image reveal with scale
      if (image) {
        gsap.fromTo(image.querySelector('img'),
          { scale: 1.2, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true
            },
            delay: 0.2
          }
        );
      }

      // Animate author photo with rotation
      if (authorPhoto) {
        gsap.fromTo(authorPhoto,
          { scale: 0, rotation: -180 },
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
            delay: 0.4
          }
        );
      }

      // Animate stars with stagger
      if (stars.length > 0) {
        gsap.fromTo(stars,
          { scale: 0, rotation: -180, opacity: 0 },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: 'back.out(2.5)',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true
            },
            delay: 0.5
          }
        );
      }

      // Animate author info
      if (authorName) {
        gsap.fromTo(authorName,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true
            },
            delay: 0.6
          }
        );
      }

      if (projectType) {
        gsap.fromTo(projectType,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true
            },
            delay: 0.7
          }
        );
      }

      // Animate testimonial text with word reveal effect
      if (testimonialText) {
        gsap.fromTo(testimonialText,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true
            },
            delay: 0.8
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

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
    <section className="testimonials-detailed-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" ref={titleRef}>{t('testimonials.detailedTitle')}</h2>
          <p className="section-subtitle" ref={subtitleRef}>{t('testimonials.detailedSubtitle')}</p>
        </div>

        <div className="testimonials-detailed-grid">
          {testimonialsData.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="testimonial-detailed-card"
              ref={el => cardsRef.current[index] = el}
            >
              <div className="testimonial-detailed-image">
                <img
                  src={testimonial.image}
                  alt={testimonial.project[currentLang]}
                />
                <div className="testimonial-overlay">
                  <span className="testimonial-project-name">
                    {testimonial.project[currentLang]}
                  </span>
                </div>
              </div>

              <div className="testimonial-detailed-content">
                <div className="testimonial-header">
                  <div className="testimonial-author-section">
                    <div className="author-photo-detailed">
                      <img
                        src={testimonial.clientPhoto}
                        alt={testimonial.name}
                      />
                    </div>
                    <div>
                      <h3 className="testimonial-author-name">{testimonial.name}</h3>
                      <p className="testimonial-project-type">
                        {testimonial.projectType[currentLang]} • {testimonial.year}
                      </p>
                    </div>
                  </div>
                  <div className="testimonial-rating">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>

                <blockquote className="testimonial-full-text">
                  "{testimonial.fullTestimonial[currentLang]}"
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsDetailed;
