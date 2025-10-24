# GSAP Animation Guide

Guía completa de animaciones con GSAP para el proyecto GS Arquitecto.

## Índice

1. [Configuración Inicial](#configuración-inicial)
2. [Animaciones Básicas](#animaciones-básicas)
3. [Timelines](#timelines)
4. [ScrollTrigger](#scrolltrigger)
5. [Animaciones de Entrada (Fade In)](#animaciones-de-entrada-fade-in)
6. [Animaciones de Texto](#animaciones-de-texto)
7. [Animaciones de Imágenes](#animaciones-de-imágenes)
8. [Animaciones de Tarjetas/Cards](#animaciones-de-tarjetascards)
9. [Sliders y Carruseles](#sliders-y-carruseles)
10. [Animaciones con Stagger](#animaciones-con-stagger)
11. [Hover y Interacciones](#hover-y-interacciones)
12. [Animaciones de Formularios](#animaciones-de-formularios)
13. [Animaciones de Navegación](#animaciones-de-navegación)
14. [Efectos Parallax](#efectos-parallax)
15. [Animaciones de Números/Contadores](#animaciones-de-númeroscontadores)
16. [Mejores Prácticas](#mejores-prácticas)

---

## Configuración Inicial

### 1. Importar GSAP en el componente

```jsx
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar plugins al inicio
gsap.registerPlugin(ScrollTrigger);
```

### 2. Crear Referencias

```jsx
import { useRef } from 'react';

const MyComponent = () => {
  const elementRef = useRef(null);
  const containerRef = useRef(null);

  // Para múltiples elementos
  const itemsRef = useRef([]);

  return (
    <div ref={containerRef}>
      <h1 ref={elementRef}>Title</h1>
    </div>
  );
};
```

### 3. Setup básico en useEffect

```jsx
useEffect(() => {
  // Animaciones aquí

  // Cleanup (opcional pero recomendado para ScrollTrigger)
  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);
```

---

## Animaciones Básicas

### Fade In Simple

```jsx
useEffect(() => {
  gsap.fromTo(elementRef.current,
    { opacity: 0 },
    { opacity: 1, duration: 1 }
  );
}, []);
```

### Slide In desde abajo

```jsx
useEffect(() => {
  gsap.fromTo(elementRef.current,
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
  );
}, []);
```

### Slide In desde arriba

```jsx
gsap.fromTo(elementRef.current,
  { y: -50, opacity: 0 },
  { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
);
```

### Slide In desde la izquierda

```jsx
gsap.fromTo(elementRef.current,
  { x: -100, opacity: 0 },
  { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
);
```

### Slide In desde la derecha

```jsx
gsap.fromTo(elementRef.current,
  { x: 100, opacity: 0 },
  { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
);
```

### Scale In (zoom in)

```jsx
gsap.fromTo(elementRef.current,
  { scale: 0.8, opacity: 0 },
  { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.7)' }
);
```

### Rotate In

```jsx
gsap.fromTo(elementRef.current,
  { rotation: -90, opacity: 0 },
  { rotation: 0, opacity: 1, duration: 1, ease: 'power3.out' }
);
```

---

## Timelines

### Timeline Secuencial

```jsx
useEffect(() => {
  const tl = gsap.timeline();

  tl.fromTo(titleRef.current,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 1 }
  )
  .fromTo(subtitleRef.current,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 1 }
  )
  .fromTo(buttonRef.current,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 1 }
  );
}, []);
```

### Timeline con Overlap (animaciones solapadas)

```jsx
const tl = gsap.timeline();

tl.fromTo(titleRef.current,
  { y: 30, opacity: 0 },
  { y: 0, opacity: 1, duration: 1 }
)
.fromTo(subtitleRef.current,
  { y: 30, opacity: 0 },
  { y: 0, opacity: 1, duration: 1 },
  '-=0.7' // Comienza 0.7s antes de que termine la anterior
)
.fromTo(buttonRef.current,
  { y: 30, opacity: 0 },
  { y: 0, opacity: 1, duration: 1 },
  '-=0.7'
);
```

### Timeline con Delay

```jsx
const tl = gsap.timeline({ delay: 0.5 });

tl.fromTo(element1Ref.current,
  { y: 30, opacity: 0 },
  { y: 0, opacity: 1, duration: 1 }
)
.fromTo(element2Ref.current,
  { y: 30, opacity: 0 },
  { y: 0, opacity: 1, duration: 1 },
  '+=0.3' // Espera 0.3s después de la anterior
);
```

### Timeline con Callbacks

```jsx
const tl = gsap.timeline({
  onStart: () => console.log('Timeline started'),
  onComplete: () => console.log('Timeline completed')
});

tl.fromTo(elementRef.current,
  { opacity: 0 },
  {
    opacity: 1,
    duration: 1,
    onComplete: () => {
      // Hacer algo cuando esta animación termina
    }
  }
);
```

---

## ScrollTrigger

### ScrollTrigger Básico

```jsx
useEffect(() => {
  gsap.fromTo(elementRef.current,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: elementRef.current,
        start: 'top 80%', // Cuando el top del elemento está al 80% del viewport
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    }
  );
}, []);
```

### ScrollTrigger con Markers (para debug)

```jsx
scrollTrigger: {
  trigger: elementRef.current,
  start: 'top 80%',
  markers: true, // Muestra markers para debugging
  id: 'my-animation' // Nombre para identificar
}
```

### ScrollTrigger con Scrub (animación atada al scroll)

```jsx
gsap.to(elementRef.current, {
  y: 100,
  scrollTrigger: {
    trigger: elementRef.current,
    start: 'top top',
    end: 'bottom top',
    scrub: true, // La animación sigue el scroll
  }
});
```

### ScrollTrigger con Pin (fijar elemento)

```jsx
gsap.to(elementRef.current, {
  scale: 1.5,
  scrollTrigger: {
    trigger: containerRef.current,
    start: 'top top',
    end: '+=500',
    pin: true, // Fija el elemento mientras se anima
    scrub: 1
  }
});
```

### ScrollTrigger para múltiples elementos

```jsx
useEffect(() => {
  const elements = containerRef.current.querySelectorAll('.item');

  elements.forEach((element) => {
    gsap.fromTo(element,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
        }
      }
    );
  });
}, []);
```

---

## Animaciones de Entrada (Fade In)

### Fade In con diferentes direcciones

```jsx
// Fade In Bottom
gsap.fromTo(element,
  { y: 60, opacity: 0 },
  { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
);

// Fade In Top
gsap.fromTo(element,
  { y: -60, opacity: 0 },
  { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
);

// Fade In Left
gsap.fromTo(element,
  { x: -60, opacity: 0 },
  { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
);

// Fade In Right
gsap.fromTo(element,
  { x: 60, opacity: 0 },
  { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
);
```

### Fade In con Scale

```jsx
gsap.fromTo(element,
  { scale: 0.5, opacity: 0 },
  {
    scale: 1,
    opacity: 1,
    duration: 1,
    ease: 'back.out(1.7)' // Efecto de rebote
  }
);
```

### Fade In con Rotation

```jsx
gsap.fromTo(element,
  { rotation: 180, opacity: 0, transformOrigin: 'center center' },
  { rotation: 0, opacity: 1, duration: 1, ease: 'power3.out' }
);
```

---

## Animaciones de Texto

### Texto aparecer letra por letra

```jsx
import { SplitText } from 'gsap/SplitText'; // Requiere licencia GSAP Club
gsap.registerPlugin(SplitText);

useEffect(() => {
  const split = new SplitText(textRef.current, { type: 'chars' });

  gsap.fromTo(split.chars,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.03,
      ease: 'power3.out'
    }
  );
}, []);
```

### Texto aparecer palabra por palabra (sin SplitText)

```jsx
// HTML: <h1 ref={textRef}><span>Palabra</span> <span>por</span> <span>palabra</span></h1>

useEffect(() => {
  const words = textRef.current.querySelectorAll('span');

  gsap.fromTo(words,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    }
  );
}, []);
```

### Texto con efecto typewriter (sin plugins)

```jsx
const [displayText, setDisplayText] = useState('');
const fullText = "Diseño Arquitectónico con Enfoque Natural";

useEffect(() => {
  let currentIndex = 0;
  const interval = setInterval(() => {
    if (currentIndex <= fullText.length) {
      setDisplayText(fullText.slice(0, currentIndex));
      currentIndex++;
    } else {
      clearInterval(interval);
    }
  }, 50);

  return () => clearInterval(interval);
}, []);
```

### Texto con cambio de color

```jsx
gsap.fromTo(textRef.current,
  { color: '#ffffff', opacity: 0 },
  {
    color: '#2e8b57',
    opacity: 1,
    duration: 1.5,
    ease: 'power2.inOut'
  }
);
```

### Texto rotativo (como en Home.jsx)

```jsx
const [currentIndex, setCurrentIndex] = useState(0);
const texts = ['Enfoque Natural', 'Diseño Sostenible', 'Espacios Armoniosos'];

useEffect(() => {
  const interval = setInterval(() => {
    // Animar salida
    gsap.to(textRef.current, {
      y: -30,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        // Cambiar texto
        setCurrentIndex((prev) => (prev + 1) % texts.length);

        // Animar entrada
        gsap.fromTo(textRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
        );
      }
    });
  }, 3000);

  return () => clearInterval(interval);
}, []);
```

---

## Animaciones de Imágenes

### Image Reveal (revelar imagen)

```jsx
// HTML necesita un wrapper
// <div className="image-wrapper" ref={wrapperRef}>
//   <img src="..." ref={imageRef} />
// </div>

// CSS necesario:
// .image-wrapper { overflow: hidden; }

useEffect(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapperRef.current,
      start: 'top 80%'
    }
  });

  // Revelar imagen de izquierda a derecha
  tl.fromTo(wrapperRef.current,
    { clipPath: 'inset(0 100% 0 0)' },
    { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power3.out' }
  )
  .fromTo(imageRef.current,
    { scale: 1.3 },
    { scale: 1, duration: 1.2, ease: 'power3.out' },
    0 // Comienza al mismo tiempo que la anterior
  );
}, []);
```

### Hover en Imagen (zoom suave)

```jsx
// Usar onMouseEnter y onMouseLeave

const handleMouseEnter = () => {
  gsap.to(imageRef.current, {
    scale: 1.1,
    duration: 0.6,
    ease: 'power2.out'
  });
};

const handleMouseLeave = () => {
  gsap.to(imageRef.current, {
    scale: 1,
    duration: 0.6,
    ease: 'power2.out'
  });
};

return (
  <div
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    style={{ overflow: 'hidden' }}
  >
    <img ref={imageRef} src="..." />
  </div>
);
```

### Parallax en Imagen

```jsx
useEffect(() => {
  gsap.to(imageRef.current, {
    y: -100,
    ease: 'none',
    scrollTrigger: {
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    }
  });
}, []);
```

### Image Gallery Stagger

```jsx
useEffect(() => {
  const images = containerRef.current.querySelectorAll('.gallery-image');

  gsap.fromTo(images,
    { y: 60, opacity: 0, scale: 0.9 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%'
      }
    }
  );
}, []);
```

---

## Animaciones de Tarjetas/Cards

### Card Flip (voltear tarjeta)

```jsx
// CSS necesario:
// .card { transform-style: preserve-3d; }
// .card-front, .card-back { backface-visibility: hidden; }
// .card-back { transform: rotateY(180deg); }

const [isFlipped, setIsFlipped] = useState(false);

const handleFlip = () => {
  gsap.to(cardRef.current, {
    rotationY: isFlipped ? 0 : 180,
    duration: 0.6,
    ease: 'power2.inOut'
  });
  setIsFlipped(!isFlipped);
};
```

### Cards Stagger (aparecer en secuencia)

```jsx
useEffect(() => {
  gsap.fromTo(containerRef.current.querySelectorAll('.project-card'),
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2, // 0.2s entre cada card
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%'
      }
    }
  );
}, []);
```

### Card Hover Elevation

```jsx
const handleMouseEnter = () => {
  gsap.to(cardRef.current, {
    y: -10,
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
    duration: 0.3,
    ease: 'power2.out'
  });
};

const handleMouseLeave = () => {
  gsap.to(cardRef.current, {
    y: 0,
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    duration: 0.3,
    ease: 'power2.out'
  });
};
```

### Card con animación de contenido interno

```jsx
const handleMouseEnter = () => {
  const tl = gsap.timeline();

  tl.to(cardRef.current, {
    y: -10,
    duration: 0.3
  })
  .to(overlayRef.current, {
    opacity: 1,
    duration: 0.3
  }, 0)
  .fromTo(titleRef.current,
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.3 },
    0.1
  );
};
```

---

## Sliders y Carruseles

### Slider Automático (como en Home.jsx)

```jsx
const [currentSlide, setCurrentSlide] = useState(0);
const slides = ['slide1.jpg', 'slide2.jpg', 'slide3.jpg'];

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, 5000);

  return () => clearInterval(interval);
}, []);

// Animar transición
useEffect(() => {
  gsap.fromTo('.slide',
    { opacity: 0 },
    { opacity: 1, duration: 1, ease: 'power2.inOut' }
  );
}, [currentSlide]);
```

### Slider con controles manuales

```jsx
const goToSlide = (index) => {
  const direction = index > currentSlide ? 1 : -1;

  // Animar salida
  gsap.to(slideRef.current, {
    x: -100 * direction,
    opacity: 0,
    duration: 0.5,
    ease: 'power2.in',
    onComplete: () => {
      setCurrentSlide(index);

      // Animar entrada
      gsap.fromTo(slideRef.current,
        { x: 100 * direction, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  });
};
```

### Carousel con múltiples items

```jsx
const scrollCarousel = (direction) => {
  const container = carouselRef.current;
  const scrollAmount = 300; // px

  gsap.to(container, {
    scrollLeft: container.scrollLeft + (scrollAmount * direction),
    duration: 0.5,
    ease: 'power2.out'
  });
};
```

### Infinite Slider (loop continuo)

```jsx
useEffect(() => {
  const sliderWidth = sliderRef.current.offsetWidth;

  gsap.to(sliderRef.current, {
    x: -sliderWidth,
    duration: 20,
    ease: 'none',
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize(x => parseFloat(x) % sliderWidth)
    }
  });
}, []);
```

---

## Animaciones con Stagger

### Stagger Básico

```jsx
gsap.fromTo('.item',
  { y: 50, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.2 // Cada item comienza 0.2s después del anterior
  }
);
```

### Stagger desde el centro

```jsx
gsap.fromTo('.item',
  { scale: 0, opacity: 0 },
  {
    scale: 1,
    opacity: 1,
    duration: 0.6,
    stagger: {
      from: 'center',
      amount: 1 // Tiempo total para todos los staggers
    }
  }
);
```

### Stagger en Grid

```jsx
gsap.fromTo('.grid-item',
  { y: 50, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: {
      grid: [3, 4], // 3 filas, 4 columnas
      from: 'start',
      amount: 1.5
    },
    scrollTrigger: {
      trigger: '.grid-container',
      start: 'top 80%'
    }
  }
);
```

### Stagger con función personalizada

```jsx
gsap.fromTo('.item',
  { y: 50, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: {
      each: 0.1,
      from: 'random', // Orden aleatorio
      ease: 'power2.inOut'
    }
  }
);
```

---

## Hover y Interacciones

### Hover Scale

```jsx
const handleMouseEnter = () => {
  gsap.to(elementRef.current, {
    scale: 1.05,
    duration: 0.3,
    ease: 'power2.out'
  });
};

const handleMouseLeave = () => {
  gsap.to(elementRef.current, {
    scale: 1,
    duration: 0.3,
    ease: 'power2.out'
  });
};
```

### Hover con color change

```jsx
const handleMouseEnter = () => {
  gsap.to(elementRef.current, {
    backgroundColor: '#2e8b57',
    color: '#ffffff',
    duration: 0.3
  });
};

const handleMouseLeave = () => {
  gsap.to(elementRef.current, {
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    duration: 0.3
  });
};
```

### Hover con rotación 3D

```jsx
const handleMouseMove = (e) => {
  const card = cardRef.current;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = (y - centerY) / 10;
  const rotateY = (centerX - x) / 10;

  gsap.to(card, {
    rotationX: rotateX,
    rotationY: rotateY,
    duration: 0.5,
    ease: 'power2.out',
    transformPerspective: 1000
  });
};

const handleMouseLeave = () => {
  gsap.to(cardRef.current, {
    rotationX: 0,
    rotationY: 0,
    duration: 0.5,
    ease: 'power2.out'
  });
};
```

### Button Click Animation

```jsx
const handleClick = () => {
  gsap.to(buttonRef.current, {
    scale: 0.95,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
    ease: 'power2.inOut'
  });
};
```

---

## Animaciones de Formularios

### Input Focus Animation

```jsx
const handleFocus = (e) => {
  const label = e.target.previousElementSibling;

  gsap.to(label, {
    y: -25,
    scale: 0.85,
    color: '#2e8b57',
    duration: 0.3,
    ease: 'power2.out'
  });
};

const handleBlur = (e) => {
  if (!e.target.value) {
    const label = e.target.previousElementSibling;

    gsap.to(label, {
      y: 0,
      scale: 1,
      color: '#666',
      duration: 0.3,
      ease: 'power2.out'
    });
  }
};
```

### Form Submit Success

```jsx
const handleSubmit = async (e) => {
  e.preventDefault();

  // Animar loading
  gsap.to(buttonRef.current, {
    scale: 0.95,
    opacity: 0.7,
    duration: 0.3
  });

  // Simular envío
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Success animation
  const tl = gsap.timeline();

  tl.to(formRef.current, {
    opacity: 0,
    y: -20,
    duration: 0.5
  })
  .set(successMessageRef.current, { display: 'block' })
  .fromTo(successMessageRef.current,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
  );
};
```

### Input Error Shake

```jsx
const showError = (inputRef) => {
  gsap.fromTo(inputRef.current,
    { x: -10 },
    {
      x: 10,
      duration: 0.1,
      repeat: 3,
      yoyo: true,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.set(inputRef.current, { x: 0 });
      }
    }
  );

  gsap.to(inputRef.current, {
    borderColor: '#e74c3c',
    duration: 0.3
  });
};
```

### Form Fields Stagger In

```jsx
useEffect(() => {
  const fields = formRef.current.querySelectorAll('.form-field');

  gsap.fromTo(fields,
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out'
    }
  );
}, []);
```

---

## Animaciones de Navegación

### Menu Mobile Slide In

```jsx
const toggleMenu = () => {
  if (menuOpen) {
    gsap.to(menuRef.current, {
      x: '100%',
      duration: 0.4,
      ease: 'power3.inOut',
      onComplete: () => setMenuOpen(false)
    });
  } else {
    setMenuOpen(true);
    gsap.fromTo(menuRef.current,
      { x: '100%' },
      { x: 0, duration: 0.4, ease: 'power3.inOut' }
    );
  }
};
```

### Menu Items Stagger

```jsx
useEffect(() => {
  if (menuOpen) {
    const items = menuRef.current.querySelectorAll('li');

    gsap.fromTo(items,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out'
      }
    );
  }
}, [menuOpen]);
```

### Header Scroll Effect

```jsx
useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 100) {
      gsap.to(headerRef.current, {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        padding: '15px 0',
        duration: 0.3
      });
    } else {
      gsap.to(headerRef.current, {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        padding: '25px 0',
        duration: 0.3
      });
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### Active Link Indicator

```jsx
const animateActiveLink = (linkRef) => {
  gsap.to('.nav-indicator', {
    width: linkRef.current.offsetWidth,
    x: linkRef.current.offsetLeft,
    duration: 0.3,
    ease: 'power2.out'
  });
};
```

---

## Efectos Parallax

### Parallax Simple

```jsx
useEffect(() => {
  gsap.to(elementRef.current, {
    y: -100,
    ease: 'none',
    scrollTrigger: {
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    }
  });
}, []);
```

### Parallax con múltiples velocidades

```jsx
useEffect(() => {
  // Capa lenta
  gsap.to(layer1Ref.current, {
    y: -50,
    ease: 'none',
    scrollTrigger: {
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    }
  });

  // Capa rápida
  gsap.to(layer2Ref.current, {
    y: -150,
    ease: 'none',
    scrollTrigger: {
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    }
  });
}, []);
```

### Parallax Horizontal

```jsx
gsap.to(elementRef.current, {
  x: -200,
  ease: 'none',
  scrollTrigger: {
    trigger: containerRef.current,
    start: 'top center',
    end: 'bottom center',
    scrub: 1
  }
});
```

### Parallax con Scale

```jsx
gsap.fromTo(elementRef.current,
  { scale: 0.8 },
  {
    scale: 1.2,
    ease: 'none',
    scrollTrigger: {
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    }
  }
);
```

---

## Animaciones de Números/Contadores

### Counter Animation

```jsx
const [count, setCount] = useState(0);
const targetValue = 1000;

useEffect(() => {
  gsap.to({ val: 0 }, {
    val: targetValue,
    duration: 2,
    ease: 'power2.out',
    onUpdate: function() {
      setCount(Math.floor(this.targets()[0].val));
    },
    scrollTrigger: {
      trigger: counterRef.current,
      start: 'top 80%',
      once: true
    }
  });
}, []);

return <div ref={counterRef}>{count}</div>;
```

### Multiple Counters

```jsx
const stats = [
  { label: 'Proyectos', value: 150 },
  { label: 'Clientes', value: 80 },
  { label: 'Años', value: 15 }
];

useEffect(() => {
  stats.forEach((stat, index) => {
    const element = document.getElementById(`counter-${index}`);

    gsap.fromTo({ val: 0 },
      { val: stat.value },
      {
        val: stat.value,
        duration: 2,
        ease: 'power2.out',
        onUpdate: function() {
          element.textContent = Math.floor(this.targets()[0].val);
        },
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
          once: true
        }
      }
    );
  });
}, []);
```

---

## Mejores Prácticas

### 1. Cleanup de ScrollTrigger

```jsx
useEffect(() => {
  // Crear animaciones con ScrollTrigger

  return () => {
    // Limpiar todos los ScrollTriggers del componente
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);
```

### 2. Guardar referencias a animaciones

```jsx
const animationRef = useRef(null);

useEffect(() => {
  animationRef.current = gsap.to(elementRef.current, {
    x: 100,
    duration: 1,
    paused: true
  });

  return () => {
    animationRef.current?.kill();
  };
}, []);

// Controlar la animación
const playAnimation = () => animationRef.current?.play();
const pauseAnimation = () => animationRef.current?.pause();
```

### 3. Usar context para animaciones relacionadas

```jsx
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from('.item', { y: 50, opacity: 0, stagger: 0.1 });
    gsap.from('.title', { x: -100, opacity: 0 });
  }, containerRef);

  return () => ctx.revert(); // Limpia todas las animaciones del contexto
}, []);
```

### 4. Optimizar rendimiento

```jsx
// Usar will-change en CSS para elementos animados
// .animated-element { will-change: transform, opacity; }

// Usar transform en lugar de propiedades como left, top
// ❌ Evitar
gsap.to(element, { left: 100 });

// ✅ Usar
gsap.to(element, { x: 100 });
```

### 5. Easings más comunes

```jsx
// Entrada suave
ease: 'power3.out'

// Salida suave
ease: 'power3.in'

// Entrada y salida suave
ease: 'power3.inOut'

// Efecto rebote
ease: 'back.out(1.7)'

// Elástico
ease: 'elastic.out(1, 0.3)'

// Sin easing (linear)
ease: 'none'
```

### 6. Duraciones recomendadas

```jsx
// Animaciones rápidas (hover, click)
duration: 0.3

// Animaciones normales (fade in, slide)
duration: 0.8 - 1

// Animaciones lentas (parallax, hero)
duration: 1.5 - 2

// Transiciones muy rápidas
duration: 0.15
```

### 7. Responsive Animations

```jsx
useEffect(() => {
  const mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    // Animaciones para desktop
    gsap.from('.item', { x: -100, opacity: 0 });
  });

  mm.add("(max-width: 767px)", () => {
    // Animaciones para mobile
    gsap.from('.item', { y: 50, opacity: 0 });
  });

  return () => mm.revert();
}, []);
```

### 8. Debugging

```jsx
// Activar markers en ScrollTrigger
scrollTrigger: {
  trigger: element,
  markers: true, // Muestra líneas de inicio/fin
  id: 'my-animation' // Identificador
}

// Ver estado de una animación
console.log(animation.progress()); // 0 a 1
console.log(animation.isActive()); // true/false

// Pausar todas las animaciones
gsap.globalTimeline.pause();
```

---

## Ejemplos Completos de Páginas

### Hero Section con múltiples animaciones

```jsx
const Hero = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Parallax en background
    gsap.to(backgroundRef.current, {
      y: 100,
      ease: 'none',
      scrollTrigger: {
        trigger: backgroundRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });

    // Secuencia de entrada
    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )
    .fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.7'
    )
    .fromTo(buttonRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.7'
    );
  }, []);

  return (
    <section className="hero">
      <div ref={backgroundRef} className="hero-background" />
      <h1 ref={titleRef}>Diseño Arquitectónico</h1>
      <p ref={subtitleRef}>Con enfoque natural</p>
      <button ref={buttonRef}>Ver Proyectos</button>
    </section>
  );
};
```

### Gallery con filtros animados

```jsx
const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const galleryRef = useRef(null);

  useEffect(() => {
    const items = galleryRef.current.querySelectorAll('.gallery-item');

    gsap.fromTo(items,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      }
    );
  }, [filter]);

  const handleFilterChange = (newFilter) => {
    const items = galleryRef.current.querySelectorAll('.gallery-item');

    // Animar salida
    gsap.to(items, {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setFilter(newFilter);
      }
    });
  };

  return (
    <div>
      <div className="filters">
        <button onClick={() => handleFilterChange('all')}>Todos</button>
        <button onClick={() => handleFilterChange('residential')}>Residencial</button>
      </div>
      <div ref={galleryRef} className="gallery">
        {/* Gallery items */}
      </div>
    </div>
  );
};
```

---

## Recursos y Referencias

- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [GSAP Easing Visualizer](https://greensock.com/ease-visualizer/)
- [CodePen GSAP Examples](https://codepen.io/GreenSock/)

---

**Nota**: Este documento debe ser consultado antes de implementar cualquier animación en el proyecto para mantener consistencia y mejores prácticas.
