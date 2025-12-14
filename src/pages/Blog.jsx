import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { blogData } from '../data/blogData';

gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
    const { t, i18n } = useTranslation();
    const heroRef = useRef(null);
    const featuredRef = useRef(null);
    const gridRef = useRef(null);
    const currentLang = i18n.language;

    // Assuming the first post is the featured one
    const featuredPost = blogData[0];
    const otherPosts = blogData.slice(1);

    useEffect(() => {
        // Hero Animation
        const tl = gsap.timeline();
        tl.fromTo(heroRef.current.querySelector('h1'),
            { y: 100, opacity: 0, rotateX: -20 },
            { y: 0, opacity: 1, rotateX: 0, duration: 1.2, ease: 'power4.out' }
        ).fromTo(heroRef.current.querySelector('p'),
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
            '-=0.8'
        );

        // Featured Post Animation
        if (featuredRef.current) {
            gsap.fromTo(featuredRef.current.querySelector('.featured-image-wrapper'),
                { scale: 1.1, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1.5,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: featuredRef.current,
                        start: 'top 80%'
                    }
                }
            );

            gsap.fromTo(featuredRef.current.querySelector('.featured-content'),
                { x: 50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    delay: 0.3,
                    scrollTrigger: {
                        trigger: featuredRef.current,
                        start: 'top 80%'
                    }
                }
            );
        }

        // Grid Animation
        if (gridRef.current) {
            gsap.fromTo(gridRef.current.querySelectorAll('.blog-card'),
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: 'top 85%',
                    }
                }
            );
        }
    }, []);

    return (
        <div className="blog-page">
            {/* Hero Section */}
            <section className="blog-hero" ref={heroRef} style={{
                height: '50vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: 'var(--primary-color)',
                marginTop: '80px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container">
                    <span style={{
                        display: 'block',
                        textTransform: 'uppercase',
                        letterSpacing: '3px',
                        marginBottom: '10px',
                        fontSize: '0.9rem',
                        color: 'var(--accent-color)',
                        fontWeight: '700'
                    }}>
                        InBalanz Journal
                    </span>
                    <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', lineHeight: 1 }}>{t('blog.title')}</h1>
                    <p style={{ fontSize: '1.3rem', maxWidth: '600px', margin: '0 auto', opacity: 0.8 }}>{t('blog.subtitle')}</p>
                </div>
            </section>

            {/* Featured Post */}
            <section className="featured-post-section" ref={featuredRef} style={{ paddingBottom: '80px' }}>
                <div className="container">
                    <div className="featured-wrapper" style={{
                        display: 'grid',
                        gridTemplateColumns: '1.5fr 1fr',
                        gap: '50px',
                        alignItems: 'center'
                    }}>
                        <div className="featured-image-wrapper" style={{
                            height: '500px',
                            overflow: 'hidden',
                            borderRadius: '20px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                        }}>
                            <img src={featuredPost.image} alt={featuredPost.title[currentLang]} style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }} />
                        </div>
                        <div className="featured-content">
                            <span style={{
                                backgroundColor: 'var(--accent-color)',
                                color: 'white',
                                padding: '5px 15px',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                marginBottom: '20px',
                                display: 'inline-block'
                            }}>
                                {featuredPost.category}
                            </span>
                            <h2 style={{
                                fontSize: '2.5rem',
                                marginBottom: '20px',
                                color: 'var(--primary-color)',
                                lineHeight: 1.2
                            }}>
                                {featuredPost.title[currentLang]}
                            </h2>
                            <p style={{
                                fontSize: '1.1rem',
                                color: '#666',
                                marginBottom: '30px',
                                lineHeight: 1.6
                            }}>
                                {featuredPost.excerpt[currentLang]}
                            </p>
                            <Link to={`/blog/${featuredPost.id}`} className="btn" style={{
                                backgroundColor: 'var(--primary-color)',
                                color: 'white',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                                {t('blog.readMore')} <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="section" ref={gridRef} style={{ backgroundColor: '#f9f9f9', padding: '100px 0' }}>
                <div className="container">
                    <h3 style={{
                        fontSize: '2rem',
                        marginBottom: '50px',
                        color: 'var(--primary-color)',
                        borderBottom: '2px solid var(--accent-color)',
                        display: 'inline-block',
                        paddingBottom: '10px'
                    }}>
                        Latest Articles
                    </h3>
                    <div className="blog-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                        gap: '40px'
                    }}>
                        {otherPosts.map(post => (
                            <div key={post.id} className="blog-card" style={{
                                backgroundColor: 'white',
                                borderRadius: '15px',
                                overflow: 'hidden',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                transition: 'transform 0.3s ease',
                                display: 'flex',
                                flexDirection: 'column',
                                cursor: 'pointer'
                            }}
                                onMouseEnter={(e) => {
                                    gsap.to(e.currentTarget, { y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)', duration: 0.3 });
                                    gsap.to(e.currentTarget.querySelector('img'), { scale: 1.1, duration: 0.5 });
                                }}
                                onMouseLeave={(e) => {
                                    gsap.to(e.currentTarget, { y: 0, boxShadow: '0 10px 30px rgba(0,0,0,0.05)', duration: 0.3 });
                                    gsap.to(e.currentTarget.querySelector('img'), { scale: 1, duration: 0.5 });
                                }}
                            >
                                <div className="card-image" style={{ height: '250px', overflow: 'hidden' }}>
                                    <img src={post.image} alt={post.title[currentLang]} style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s ease'
                                    }}
                                    />
                                </div>
                                <div className="card-content" style={{ padding: '30px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                        <span style={{
                                            fontSize: '0.8rem',
                                            color: 'var(--accent-color)',
                                            fontWeight: '700',
                                            textTransform: 'uppercase'
                                        }}>
                                            {post.category}
                                        </span>
                                        <span style={{ fontSize: '0.85rem', color: '#999' }}>{post.date}</span>
                                    </div>

                                    <h3 style={{
                                        fontSize: '1.5rem',
                                        marginBottom: '15px',
                                        color: 'var(--primary-color)',
                                        lineHeight: 1.3,
                                        fontWeight: '700'
                                    }}>
                                        {post.title[currentLang]}
                                    </h3>
                                    <p style={{
                                        fontSize: '1rem',
                                        color: '#666',
                                        marginBottom: '25px',
                                        flexGrow: 1,
                                        lineHeight: 1.6
                                    }}>
                                        {post.excerpt[currentLang]}
                                    </p>
                                    <Link to={`/blog/${post.id}`} style={{
                                        color: 'var(--primary-color)',
                                        fontWeight: '700',
                                        textDecoration: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                        marginTop: 'auto',
                                        alignSelf: 'flex-start',
                                        borderBottom: '2px solid var(--accent-color)',
                                        paddingBottom: '2px'
                                    }}>
                                        {t('blog.readMore')}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blog;
