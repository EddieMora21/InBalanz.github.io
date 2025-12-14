import { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { blogData } from '../data/blogData';

gsap.registerPlugin(ScrollTrigger);

const BlogPost = () => {
    const { t, i18n } = useTranslation();
    const { id } = useParams();
    const currentLang = i18n.language;
    const post = blogData.find(p => p.id === parseInt(id));

    const contentRef = useRef(null);
    const heroRef = useRef(null);
    const [readingProgress, setReadingProgress] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Reading Progress Bar
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setReadingProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);

        // Hero Parallax
        if (heroRef.current) {
            gsap.to(heroRef.current, {
                backgroundPosition: `50% ${window.scrollY * 0.5}px`,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        }

        // Content Animation
        if (contentRef.current) {
            const paragraphs = contentRef.current.querySelectorAll('p, h2, h3, ul, blockquote');
            gsap.fromTo(paragraphs,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: "top 80%"
                    }
                }
            );
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, [id]);

    if (!post) {
        return (
            <div className="container" style={{ padding: '150px 0', textAlign: 'center' }}>
                <h2>Post not found</h2>
                <Link to="/blog" className="btn">Back to Blog</Link>
            </div>
        );
    }

    return (
        <div className="blog-post-page">
            {/* Reading Progress Bar */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: `${readingProgress}%`,
                height: '5px',
                backgroundColor: 'var(--accent-color)',
                zIndex: 9999,
                transition: 'width 0.1s ease'
            }}></div>

            {/* Hero Image */}
            <div className="post-hero" ref={heroRef} style={{
                height: '70vh',
                backgroundImage: `url(${post.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                backgroundAttachment: 'fixed' // Simple parallax fallback
            }}>
                <div className="overlay" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div className="container" style={{ textAlign: 'center', color: 'white' }}>
                        <span style={{
                            backgroundColor: 'var(--accent-color)',
                            padding: '8px 20px',
                            borderRadius: '30px',
                            textTransform: 'uppercase',
                            fontWeight: '700',
                            fontSize: '0.9rem',
                            marginBottom: '20px',
                            display: 'inline-block'
                        }}>
                            {post.category}
                        </span>
                        <h1 style={{
                            fontSize: '3.5rem',
                            maxWidth: '900px',
                            margin: '0 auto 20px',
                            lineHeight: 1.2,
                            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                        }}>
                            {post.title[currentLang]}
                        </h1>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', fontSize: '1.1rem' }}>
                            <span><i className="far fa-calendar"></i> {post.date}</span>
                            <span><i className="far fa-user"></i> {post.author}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ maxWidth: '800px', padding: '80px 20px' }}>
                <Link to="/blog" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: 'var(--accent-color)',
                    fontWeight: '600',
                    marginBottom: '50px',
                    textDecoration: 'none',
                    fontSize: '1.1rem'
                }}>
                    <i className="fas fa-arrow-left"></i> {t('blog.backToBlog')}
                </Link>

                <div className="post-content" ref={contentRef} style={{
                    fontSize: '1.25rem',
                    lineHeight: 1.8,
                    color: '#333',
                    fontFamily: 'Georgia, serif' // More editorial feel
                }} dangerouslySetInnerHTML={{ __html: post.content[currentLang] }}>
                </div>

                {/* Share / Tags section could go here */}
                <div style={{ marginTop: '80px', borderTop: '1px solid #eee', paddingTop: '40px', textAlign: 'center' }}>
                    <h3 style={{ marginBottom: '20px' }}>Share this article</h3>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <button style={{ background: 'none', border: '1px solid #ddd', padding: '10px 20px', borderRadius: '30px', cursor: 'pointer' }}><i className="fab fa-facebook-f"></i> Facebook</button>
                        <button style={{ background: 'none', border: '1px solid #ddd', padding: '10px 20px', borderRadius: '30px', cursor: 'pointer' }}><i className="fab fa-twitter"></i> Twitter</button>
                        <button style={{ background: 'none', border: '1px solid #ddd', padding: '10px 20px', borderRadius: '30px', cursor: 'pointer' }}><i className="fab fa-linkedin-in"></i> LinkedIn</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
