import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Renders = () => {
    const { t } = useTranslation();
    const [activeFilter, setActiveFilter] = useState('all');
    const mainRef = useRef(null);

    // Mock Data for Catalog with multiple images
    const projects = [
        {
            id: 1,
            title: "Casa Horizonte",
            category: "modern",
            description: "Un diseño que abraza la línea del horizonte, maximizando las vistas y la luz natural. Espacios abiertos que fluyen entre el interior y el exterior.",
            specs: { area: "250 m²", bedrooms: 3, bathrooms: 2.5, levels: 2 },
            price: "$1,200",
            images: [
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            ]
        },
        {
            id: 2,
            title: "Villa Tropical",
            category: "tropical",
            description: "Arquitectura vernácula reinterpretada para la vida moderna. Techos altos, ventilación cruzada y materiales naturales que se integran con la selva.",
            specs: { area: "180 m²", bedrooms: 2, bathrooms: 2, levels: 1 },
            price: "$950",
            images: [
                "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            ]
        },
        {
            id: 3,
            title: "Loft Industrial",
            category: "industrial",
            description: "Estética cruda y refinada. Estructuras de acero expuestas, grandes ventanales y una distribución tipo loft ideal para la vida urbana.",
            specs: { area: "120 m²", bedrooms: 1, bathrooms: 1.5, levels: 2 },
            price: "$800",
            images: [
                "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600566752355-35792bedcfe1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            ]
        }
    ];

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(p => p.category === activeFilter);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const sections = document.querySelectorAll('.project-section');

            sections.forEach((section) => {
                const info = section.querySelector('.project-info-col');
                const images = section.querySelector('.project-images-col');

                if (window.innerWidth > 768) {
                    ScrollTrigger.create({
                        trigger: section,
                        start: 'top top',
                        end: 'bottom bottom',
                        pin: info,
                        scrub: true,
                        // markers: true, // Uncomment for debugging
                    });
                }
            });
        }, mainRef);

        return () => ctx.revert();
    }, [activeFilter]);

    return (
        <div className="renders-page" ref={mainRef}>
            {/* Hero Section */}
            <section className="renders-hero" style={{
                backgroundImage: 'linear-gradient(rgba(0, 35, 53, 0.8), rgba(0, 35, 53, 0.8)), url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '60vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: 'white',
                marginTop: '80px',
                marginBottom: '50px'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>{t('renders.title')}</h1>
                    <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', opacity: 0.9 }}>{t('renders.subtitle')}</p>
                </div>
            </section>

            {/* Filters */}
            <div className="container" style={{ marginBottom: '50px' }}>
                <div className="filters-container" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '15px',
                    flexWrap: 'wrap'
                }}>
                    {['all', 'modern', 'minimalist', 'tropical', 'industrial'].map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            style={{
                                padding: '10px 25px',
                                borderRadius: '30px',
                                border: '1px solid var(--accent-color)',
                                backgroundColor: activeFilter === filter ? 'var(--accent-color)' : 'transparent',
                                color: activeFilter === filter ? 'white' : 'var(--accent-color)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                fontWeight: '500'
                            }}
                        >
                            {t(`renders.filters.${filter}`)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Projects List */}
            <div className="projects-list">
                {filteredProjects.map((project, index) => (
                    <section key={project.id} className="project-section" style={{
                        display: 'flex',
                        flexDirection: window.innerWidth <= 768 ? 'column' : (index % 2 === 0 ? 'row' : 'row-reverse'),
                        minHeight: '100vh',
                        position: 'relative',
                        backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9'
                    }}>
                        {/* Info Column (Pinned) */}
                        <div className="project-info-col" style={{
                            width: window.innerWidth <= 768 ? '100%' : '40%',
                            height: window.innerWidth <= 768 ? 'auto' : '100vh',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            padding: '50px',
                            boxSizing: 'border-box',
                            zIndex: 2
                        }}>
                            <div className="info-content">
                                <span style={{
                                    color: 'var(--accent-color)',
                                    fontWeight: '700',
                                    letterSpacing: '2px',
                                    textTransform: 'uppercase',
                                    fontSize: '0.9rem',
                                    display: 'block',
                                    marginBottom: '15px'
                                }}>
                                    {t(`renders.filters.${project.category}`)}
                                </span>

                                <h2 style={{
                                    fontSize: '3rem',
                                    color: 'var(--primary-color)',
                                    marginBottom: '20px',
                                    lineHeight: 1.1
                                }}>
                                    {project.title}
                                </h2>

                                <p style={{
                                    fontSize: '1.1rem',
                                    lineHeight: 1.8,
                                    color: '#555',
                                    marginBottom: '30px'
                                }}>
                                    {project.description}
                                </p>

                                <div className="specs-grid" style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '20px',
                                    marginBottom: '40px',
                                    borderTop: '1px solid #eee',
                                    borderBottom: '1px solid #eee',
                                    padding: '20px 0'
                                }}>
                                    <div>
                                        <strong style={{ display: 'block', color: 'var(--primary-color)' }}>{t('renders.specs.area')}</strong>
                                        <span style={{ color: '#666' }}>{project.specs.area}</span>
                                    </div>
                                    <div>
                                        <strong style={{ display: 'block', color: 'var(--primary-color)' }}>{t('renders.specs.bedrooms')}</strong>
                                        <span style={{ color: '#666' }}>{project.specs.bedrooms}</span>
                                    </div>
                                    <div>
                                        <strong style={{ display: 'block', color: 'var(--primary-color)' }}>{t('renders.specs.bathrooms')}</strong>
                                        <span style={{ color: '#666' }}>{project.specs.bathrooms}</span>
                                    </div>
                                    <div>
                                        <strong style={{ display: 'block', color: 'var(--primary-color)' }}>{t('renders.specs.levels')}</strong>
                                        <span style={{ color: '#666' }}>{project.specs.levels}</span>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                                    <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary-color)' }}>
                                        {project.price}
                                    </div>
                                    <a href={`mailto:contacto@inbalanz.com?subject=Consulta sobre ${project.title}`} className="btn" style={{
                                        backgroundColor: 'var(--accent-color)',
                                        color: 'white',
                                        padding: '15px 40px',
                                        borderRadius: '30px',
                                        textDecoration: 'none',
                                        fontWeight: '600',
                                        boxShadow: '0 10px 20px rgba(92, 114, 5, 0.3)'
                                    }}>
                                        {t('renders.inquire')}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Images Column (Scrolls) */}
                        <div className="project-images-col" style={{
                            width: window.innerWidth <= 768 ? '100%' : '60%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            {project.images.map((img, i) => (
                                <div key={i} className="image-wrapper" style={{
                                    height: '100vh',
                                    width: '100%',
                                    overflow: 'hidden'
                                }}>
                                    <img src={img} alt={`${project.title} view ${i + 1}`} style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s ease'
                                    }} />
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default Renders;
