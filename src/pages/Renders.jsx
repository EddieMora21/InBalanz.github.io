import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Renders = () => {
    const { t, i18n } = useTranslation();
    const [activeFilter, setActiveFilter] = useState('all');
    const mainRef = useRef(null);
    const currentLang = i18n.language || 'es';

    // Data for designs for sale
    const projects = [
        {
            id: 1,
            title: "Villa Punta Leona",
            category: "tropical",
            description: {
                es: "El proyecto se concibe como un conjunto de hospedaje tipo Airbnb integrado a un entorno natural, donde la arquitectura busca potenciar la experiencia de descanso y disfrute del lugar. La implantación aprovecha la vegetación y las visuales, generando una sensación de retiro y conexión con la naturaleza.",
                en: "The project is conceived as an Airbnb-type lodging complex integrated into a natural environment, where the architecture seeks to enhance the experience of rest and enjoyment of the place. The implantation takes advantage of the vegetation and views, generating a sense of retreat and connection with nature."
            },
            specs: { area: "450 m²", bedrooms: 5, bathrooms: 4, levels: 2 },
            price: "Consultar",
            images: [
                "/images/projects/villa-punta-leona/1.webp",
                "/images/projects/villa-punta-leona/2.webp",
                "/images/projects/villa-punta-leona/3.webp",
                "/images/projects/villa-punta-leona/4.webp",
                "/images/projects/villa-punta-leona/5.webp"
            ]
        },
        {
            id: 2,
            title: "Residencia Punta Leona",
            category: "tropical",
            description: {
                es: "Una variante de diseño residencial enfocada en la privacidad y la integración con el paisaje costero. Espacios abiertos, ventilación cruzada y una materialidad que dialoga con el entorno tropical.",
                en: "A residential design variant focused on privacy and integration with the coastal landscape. Open spaces, cross ventilation, and a materiality that dialogues with the tropical environment."
            },
            specs: { area: "320 m²", bedrooms: 3, bathrooms: 3, levels: 2 },
            price: "Consultar",
            images: [
                "/images/projects/villa-punta-leona/6.webp",
                "/images/projects/villa-punta-leona/7.webp",
                "/images/projects/villa-punta-leona/8.webp",
                "/images/projects/villa-punta-leona/9.webp",
                "/images/projects/villa-punta-leona/10.webp"
            ]
        },
        {
            id: 3,
            title: "Apartamentos Quepos",
            category: "modern",
            description: {
                es: "Este proyecto de hospedaje se concibe a partir de volumetrías que buscan generar una imagen contemporánea y acogedora. Los interiores se caracterizan por alturas generosas que favorecen la ventilación natural y el confort térmico.",
                en: "This lodging project is conceived from volumes that seek to generate a contemporary and welcoming image. The interiors are characterized by generous heights that favor natural ventilation and thermal comfort."
            },
            specs: { area: "180 m²", bedrooms: 2, bathrooms: 2, levels: 1 },
            price: "Consultar",
            images: [
                "/images/projects/apartamentos-quepos/1.webp",
                "/images/projects/apartamentos-quepos/2.webp",
                "/images/projects/apartamentos-quepos/3.webp",
                "/images/projects/apartamentos-quepos/4.webp",
                "/images/projects/apartamentos-quepos/5.webp",
                "/images/projects/apartamentos-quepos/6.webp",
                "/images/projects/apartamentos-quepos/7.webp"
            ]
        },
        {
            id: 4,
            title: "City View",
            category: "modern",
            description: {
                es: "El proyecto se implanta en un contexto urbano con fuerte presencia natural. La volumetría se organiza mediante cuerpos escalonados que se adaptan al terreno y orientan los espacios principales hacia las vistas urbanas.",
                en: "The project is implemented in an urban context with a strong natural presence. The volumetry is organized through stepped bodies that adapt to the terrain and orient the main spaces toward urban views."
            },
            specs: { area: "210 m²", bedrooms: 3, bathrooms: 2.5, levels: 2 },
            price: "Consultar",
            images: [
                "/images/projects/city-view/1.webp",
                "/images/projects/city-view/2.webp",
                "/images/projects/city-view/3.webp",
                "/images/projects/city-view/4.webp"
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
                backgroundImage: 'linear-gradient(rgba(0, 35, 53, 0.8), rgba(0, 35, 53, 0.8)), url(/images/projects/city-view/1.webp)',
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
                                    {project.description[currentLang]}
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
                                        {project.price === 'Consultar' ? t('renders.inquire_price') || 'Consultar' : project.price}
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
