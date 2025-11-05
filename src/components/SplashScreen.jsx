import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const SplashScreen = ({ onComplete }) => {
  const splashRef = useRef(null);
  const logoRef = useRef(null);
  const [headerReady, setHeaderReady] = useState(false);

  useEffect(() => {
    // Wait for header to be ready
    const checkHeader = setInterval(() => {
      const headerLogo = document.querySelector('.logo-image');
      if (headerLogo) {
        setHeaderReady(true);
        clearInterval(checkHeader);
      }
    }, 50);

    return () => clearInterval(checkHeader);
  }, []);

  useEffect(() => {
    if (!headerReady) return;

    // Get header logo position
    const headerLogo = document.querySelector('.logo-image');
    if (!headerLogo || !logoRef.current || !splashRef.current) return;

    const headerLogoRect = headerLogo.getBoundingClientRect();
    const logoRect = logoRef.current.getBoundingClientRect();

    const translateX = headerLogoRect.left - logoRect.left + (headerLogoRect.width - logoRect.width) / 2;
    const translateY = headerLogoRect.top - logoRect.top + (headerLogoRect.height - logoRect.height) / 2;
    const finalScale = headerLogoRect.width / logoRect.width; // Tamaño igual al logo del header

    // Create timeline
    const timeline = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // Step 1: Logo appears large in center (0-0.5s)
    timeline.fromTo(
      logoRef.current,
      {
        scale: 0,
        opacity: 0
      },
      {
        scale: 1.5,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
      }
    );

    // Step 2: Logo stays in center (0.5-1.3s) - 0.8 seconds for user to read
    timeline.to(logoRef.current, {
      duration: 0.8
    });

    // Step 3: Move logo to header position while continuously shrinking (1.3-2.3s) - 1 second duration
    timeline.to(logoRef.current, {
      x: translateX,
      y: translateY,
      scale: finalScale,
      duration: 1,
      ease: 'power2.inOut'
    });

    // Step 4: Slide splash screen up to reveal page (1.9-2.8s)
    // Starts at 1.9s (overlapping with logo movement) so you see the logo arriving
    timeline.to(splashRef.current, {
      y: '-100%',
      duration: 0.9,
      ease: 'power2.inOut'
    }, '-=0.4'); // Starts 0.4s before the previous animation ends

    return () => {
      timeline.kill();
    };
  }, [onComplete, headerReady]);

  return (
    <div className="splash-screen" ref={splashRef}>
      <div className="splash-logo" ref={logoRef}>
        <img src="/animacion1.svg" alt="InBalanZ" />
      </div>
    </div>
  );
};

export default SplashScreen;
