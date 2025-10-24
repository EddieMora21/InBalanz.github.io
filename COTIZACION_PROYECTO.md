# COTIZACIÓN - SITIO WEB GS ARQUITECTO

**Cliente:** GS Arquitecto - Estudio de Arquitectura
**Fecha:** 21 de Octubre, 2025
**Validez:** 30 días

---

## RESUMEN EJECUTIVO

Desarrollo completo de sitio web corporativo para estudio de arquitectura con las siguientes características principales:

- ✅ Aplicación web moderna con React 19 + Vite
- ✅ Sistema bilingüe completo (Español/Inglés)
- ✅ 6 páginas principales + sistema de proyectos dinámico
- ✅ Animaciones profesionales con GSAP
- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ Sistema de gestión de contenido de proyectos
- ✅ SEO optimizado y rendimiento superior

---

## DESGLOSE DETALLADO DE DESARROLLO

### 1. CONFIGURACIÓN Y ARQUITECTURA BASE

**Tiempo estimado:** 8 horas

| Item                          | Descripción                                                | Horas |
| ----------------------------- | ---------------------------------------------------------- | ----- |
| Setup inicial del proyecto    | Configuración Vite, React 19, estructura de carpetas       | 2h    |
| Configuración de dependencias | React Router v7, i18next, GSAP, ESLint                     | 2h    |
| Arquitectura de componentes   | Estructura modular, sistema de rutas, hooks personalizados | 2h    |
| Sistema de variables CSS      | Paleta de colores, tipografías, espaciados consistentes    | 1h    |
| Configuración de build        | Optimización para producción, CDN assets                   | 1h    |

**Subtotal Sección 1:** 8 horas

---

### 2. SISTEMA DE INTERNACIONALIZACIÓN (i18n)

**Tiempo estimado:** 12 horas

| Item                    | Descripción                                               | Horas |
| ----------------------- | --------------------------------------------------------- | ----- |
| Setup i18next           | Configuración base con react-i18next                      | 2h    |
| Traducción de contenido | 200+ keys en español e inglés (nav, páginas, formularios) | 4h    |
| Language switcher       | Componente switcher con persistencia localStorage         | 2h    |
| Traducciones dinámicas  | Proyectos, servicios, contenido variable                  | 3h    |
| Testing bilingüe        | Pruebas de cambio de idioma en todas las páginas          | 1h    |

**Subtotal Sección 2:** 12 horas

---

### 3. COMPONENTES REUTILIZABLES

**Tiempo estimado:** 16 horas

| Item              | Descripción                                          | Horas |
| ----------------- | ---------------------------------------------------- | ----- |
| Header/Navigation | Nav responsive con hamburger menu, language switcher | 4h    |
| Footer            | Enlaces, información de contacto, redes sociales     | 2h    |
| ProjectCard       | Tarjeta reutilizable para grid de proyectos          | 2h    |
| ImageModal        | Modal de galería con navegación de imágenes          | 3h    |
| WhatsAppButton    | Botón flotante de WhatsApp                           | 1h    |
| ScrollToTop       | Componente para scroll al cambiar de ruta            | 1h    |
| Custom Hooks      | useScrollEffect para header sticky                   | 2h    |
| Loading states    | Componentes de carga y transiciones                  | 1h    |

**Subtotal Sección 3:** 16 horas

---

### 4. PÁGINAS PRINCIPALES

**Tiempo estimado:** 32 horas

#### 4.1 Home Page (Home.jsx)

| Item                         | Descripción                                           | Horas |
| ---------------------------- | ----------------------------------------------------- | ----- |
| Hero section con slider      | Slider de imágenes con textos rotativos sincronizados | 4h    |
| Sección proyectos destacados | Grid de proyectos con animaciones                     | 3h    |
| Preview de servicios         | Cards de servicios con hover effects                  | 2h    |
| Sección filosofía            | Contenido con imágenes y animaciones GSAP             | 3h    |
| Sección contacto             | Formulario integrado en home                          | 2h    |

**Subtotal Home:** 14h

#### 4.2 Projects Page (Projects.jsx)

| Item                | Descripción                                                  | Horas |
| ------------------- | ------------------------------------------------------------ | ----- |
| Sistema de filtrado | Filtros por categoría (Residencial, Comercial, Remodelación) | 3h    |
| Grid de proyectos   | Layout responsivo con ProjectCards                           | 2h    |
| Animaciones scroll  | GSAP ScrollTrigger para entrada de elementos                 | 2h    |

**Subtotal Projects:** 7h

#### 4.3 Project Detail Page (ProjectDetail.jsx)

| Item                            | Descripción                                  | Horas |
| ------------------------------- | -------------------------------------------- | ----- |
| Sistema dinámico con URL params | useParams para cargar proyecto por ID        | 2h    |
| Layout de detalle               | Header, descripción, características, equipo | 3h    |
| Galería de imágenes             | Grid con modal de vista expandida            | 3h    |
| Notas de proceso                | Sección de proceso de diseño con timeline    | 2h    |

**Subtotal Project Detail:** 10h

#### 4.4 Services Page (Services.jsx)

| Item               | Descripción                              | Horas |
| ------------------ | ---------------------------------------- | ----- |
| Grid de servicios  | Cards detalladas con iconos Font Awesome | 2h    |
| Sección de proceso | Flujo de trabajo paso a paso             | 2h    |
| Animaciones        | GSAP fade-in y stagger effects           | 1h    |

**Subtotal Services:** 5h

#### 4.5 About Page (About.jsx)

| Item                     | Descripción                             | Horas |
| ------------------------ | --------------------------------------- | ----- |
| Sección sobre el estudio | Historia, filosofía, contenido bilingüe | 2h    |
| Equipo/Team section      | Perfiles con imágenes y biografías      | 2h    |
| Animaciones              | Parallax y scroll effects               | 1h    |

**Subtotal About:** 5h

#### 4.6 Contact Page (Contact.jsx)

| Item                      | Descripción                          | Horas |
| ------------------------- | ------------------------------------ | ----- |
| Formulario de contacto    | Validación, estados, manejo de envío | 3h    |
| Información de contacto   | Dirección, teléfono, email, mapa     | 1h    |
| Animaciones de formulario | GSAP form animations                 | 1h    |

**Subtotal Contact:** 5h

**Total Páginas:** 46 horas

---

### 5. SISTEMA DE DATOS DE PROYECTOS

**Tiempo estimado:** 10 horas

| Item                                  | Descripción                                      | Horas |
| ------------------------------------- | ------------------------------------------------ | ----- |
| Estructura de datos (projectsData.js) | 6 proyectos con estructura completa              | 4h    |
| Contenido bilingüe                    | Descripciones, características, proceso en ES/EN | 3h    |
| Imágenes y assets                     | Selección, optimización, integración             | 2h    |
| Validación de datos                   | Testing de integridad de datos                   | 1h    |

**Subtotal Sección 5:** 10 horas

---

### 6. ANIMACIONES CON GSAP

**Tiempo estimado:** 14 horas

| Item                       | Descripción                                     | Horas |
| -------------------------- | ----------------------------------------------- | ----- |
| Setup GSAP + ScrollTrigger | Registro de plugins, configuración base         | 2h    |
| Hero slider animado        | Transiciones de imágenes y textos sincronizados | 3h    |
| Scroll animations          | Fade-in, slide-in para secciones                | 3h    |
| Stagger effects            | Animaciones en cascada para grids               | 2h    |
| Hover effects              | Microinteracciones en cards y botones           | 2h    |
| Page transitions           | Transiciones suaves entre rutas                 | 2h    |

**Subtotal Sección 6:** 14 horas

---

### 7. ESTILOS Y DISEÑO RESPONSIVE

**Tiempo estimado:** 18 horas

| Item                         | Descripción                                               | Horas |
| ---------------------------- | --------------------------------------------------------- | ----- |
| CSS Variables system         | Colores, tipografías, espaciados                          | 2h    |
| Layout principal (style.css) | Grid, flexbox, componentes base                           | 4h    |
| Responsive breakpoints       | Mobile (< 768px), Tablet (768-1024px), Desktop (> 1024px) | 6h    |
| Tipografía                   | Google Fonts (Montserrat, Playfair Display)               | 1h    |
| Iconografía                  | Integración Font Awesome 6.x                              | 1h    |
| Optimización de imágenes     | Lazy loading, responsive images                           | 2h    |
| Cross-browser testing        | Chrome, Firefox, Safari, Edge                             | 2h    |

**Subtotal Sección 7:** 18 horas

---

### 8. FUNCIONALIDADES ADICIONALES

**Tiempo estimado:** 8 horas

| Item                     | Descripción                                    | Horas |
| ------------------------ | ---------------------------------------------- | ----- |
| Scroll to top            | Funcionalidad y botón flotante                 | 1h    |
| Active link highlighting | Resaltar página actual en navegación           | 1h    |
| Sticky header            | Header que se mantiene visible al hacer scroll | 2h    |
| Mobile menu              | Hamburger menu con animación                   | 2h    |
| WhatsApp integration     | Botón flotante con link directo                | 1h    |
| 404 Page                 | Página de error personalizada                  | 1h    |

**Subtotal Sección 8:** 8 horas

---

### 9. TESTING Y QA

**Tiempo estimado:** 12 horas

| Item                | Descripción                                       | Horas |
| ------------------- | ------------------------------------------------- | ----- |
| Testing funcional   | Todas las páginas y componentes                   | 4h    |
| Testing responsive  | Mobile, tablet, desktop en múltiples dispositivos | 3h    |
| Testing bilingüe    | Cambio de idioma en todas las secciones           | 2h    |
| Testing navegación  | Todas las rutas y enlaces                         | 1h    |
| Performance testing | Lighthouse, optimización                          | 2h    |

**Subtotal Sección 9:** 12 horas

---

### 10. DOCUMENTACIÓN Y ENTREGA

**Tiempo estimado:** 8 horas

| Item               | Descripción                          | Horas |
| ------------------ | ------------------------------------ | ----- |
| CLAUDE.md          | Guía completa para desarrollo futuro | 2h    |
| GSAP_ANIMATIONS.md | Documentación de animaciones         | 2h    |
| README.md          | Instrucciones de instalación y uso   | 1h    |
| Code comments      | Comentarios en código complejo       | 2h    |
| Deployment guide   | Guía de despliegue a producción      | 1h    |

**Subtotal Sección 10:** 8 horas

---

## RESUMEN DE HORAS

| Sección   | Descripción                       | Horas         |
| --------- | --------------------------------- | ------------- |
| 1         | Configuración y Arquitectura Base | 8h            |
| 2         | Sistema de Internacionalización   | 12h           |
| 3         | Componentes Reutilizables         | 16h           |
| 4         | Páginas Principales               | 46h           |
| 5         | Sistema de Datos de Proyectos     | 10h           |
| 6         | Animaciones con GSAP              | 14h           |
| 7         | Estilos y Diseño Responsive       | 18h           |
| 8         | Funcionalidades Adicionales       | 8h            |
| 9         | Testing y QA                      | 12h           |
| 10        | Documentación y Entrega           | 8h            |
| **TOTAL** |                                   | **152 horas** |

---

## COTIZACIÓN ECONÓMICA

### Opción A: Paquete Básico

**Total horas:** 152h
**TOTAL:** **$650 USD**

- Proyecto completo desarrollado
- Código fuente + documentación completa
- Build optimizado para producción
- Deploy al hosting Hostinger
- Asistencia en obtención de dominio
- Configuración DNS y conexión del dominio
- Configuración SSL/HTTPS

### Opción B: Paquete Profesional (Recomendado) ⭐

**TOTAL:** **$1,000 USD**

- Todo lo del Paquete Básico
- 1 mes de soporte incluido
- Asistencia en el deployment
- Capacitación básica de uso
- Corrección de bugs durante el primer mes

### Opción C: Paquete Premium (Mejor valor)

**TOTAL:** **$1,200 USD**

- Todo lo del Paquete Profesional
- 3 meses de soporte extendido (valor $180)
- Corrección de bugs sin costo adicional
- Actualizaciones menores incluidas
- Ajustes de contenido (hasta 2h/mes)
- Consultas técnicas prioritarias
- Asistencia técnica preferencial

---

## TECNOLOGÍAS INCLUIDAS

### Frontend Stack

- ✅ **React 19** - Framework UI de última generación
- ✅ **Vite 7** - Build tool ultrarrápido
- ✅ **React Router v7** - Navegación SPA
- ✅ **i18next** - Sistema de internacionalización profesional
- ✅ **GSAP 3.13** - Animaciones de alto rendimiento
- ✅ **ESLint** - Calidad de código

### Características

- ✅ 100% Responsive (Mobile-first)
- ✅ Bilingüe (ES/EN) con persistencia
- ✅ SEO optimizado
- ✅ Performance optimizado (Lighthouse 90+)
- ✅ Cross-browser compatible
- ✅ Código limpio y mantenible
- ✅ Documentación completa

### Assets Incluidos

- ✅ Google Fonts (Montserrat, Playfair Display)
- ✅ Font Awesome 6.x (iconografía)
- ✅ Sistema de imágenes responsivas
- ✅ Optimización de assets

---

## ENTREGABLES

1. **Código Fuente Completo**

   - Repositorio Git con historial completo
   - Código comentado y estructurado
   - ESLint configurado

2. **Build de Producción**

   - Carpeta `dist/` optimizada
   - Assets minificados
   - Listo para deploy

3. **Sitio Web en Línea**

   - Deployment completo en Hostinger
   - Dominio configurado y funcionando
   - SSL/HTTPS configurado
   - Sitio accesible públicamente

4. **Documentación**

   - CLAUDE.md - Guía de desarrollo
   - GSAP_ANIMATIONS.md - Documentación de animaciones
   - README.md - Instrucciones de instalación
   - Guía de deployment en Hostinger

5. **Soporte**
   - 1 mes de soporte incluido (según paquete)
   - Opciones de soporte extendido disponibles

---

## CRONOGRAMA ESTIMADO

| Fase                                       | Duración   | Entregable                                     |
| ------------------------------------------ | ---------- | ---------------------------------------------- |
| **Fase 1:** Ajustes finales y optimización | Días 1-3   | Ajustes menores, optimización de código        |
| **Fase 2:** Testing completo               | Días 4-7   | Testing funcional, responsive, bilingüe        |
| **Fase 3:** Documentación final            | Días 8-10  | Completar documentación, guías                 |
| **Fase 4:** Deploy y Configuración         | Días 11-15 | Deploy a Hostinger, configuración dominio, SSL |

**Duración total:** 15 días - 1 mes máximo

---

## CONDICIONES DE PAGO

### Opción 1: Pago en 2 Partes

- 50% al inicio
- 50% al finalizar y entregar

### Opción 2: Pago Completo Anticipado (Descuento Especial)

- Descuento especial por pago anticipado
- **Opción A quedaría en:** $600 USD (descuento de $50)
- **Opción B quedaría en:** $900 USD (descuento de $100)
- **Opción C quedaría en:** $1,080 USD (descuento de $120)

---

## EXCLUSIONES

**NO incluido en esta cotización:**

- ❌ Backend/Base de datos (proyecto es estático)
- ❌ Sistema de CMS (WordPress, Strapi, etc.)
- ❌ Costo del hosting Hostinger (plan recomendado ~$3-5/mes, corre por cuenta del cliente)
- ❌ Costo del dominio (el cliente debe comprarlo, solo asistimos en la obtención ~$10-15/año)
- ❌ Contenido fotográfico profesional (se usan placeholders)
- ❌ Redacción de contenido (se requiere contenido del cliente)
- ❌ Email marketing / Newsletter
- ❌ Analytics / Google Tag Manager setup
- ❌ Integraciones con APIs externas

**Nota:** El cliente debe contratar el plan de hosting en Hostinger. Se recomienda el plan "Premium" o "Business" para mejor rendimiento. Nosotros nos encargamos de toda la configuración técnica y deployment.

**Estos servicios pueden cotizarse por separado si se requieren.**

---

## SERVICIOS ADICIONALES DISPONIBLES

### Backend Integration (+$400 USD)

- API REST con Node.js/Express
- Base de datos (MongoDB/PostgreSQL)
- Panel admin básico para gestión de proyectos
- Sistema de autenticación simple

### SEO Avanzado (+$100 USD)

- Meta tags dinámicos
- Sitemap XML
- Schema.org markup
- Open Graph optimization

### Analytics & Tracking (+$380 USD)

- Google Analytics 4 setup
- Google Tag Manager
- Event tracking básico
- Configuración de conversiones

---

## GARANTÍA Y SOPORTE

### Incluido (1 mes post-lanzamiento)

- ✅ Corrección de bugs
- ✅ Ajustes menores de diseño
- ✅ Soporte técnico por email o whattsap
- ✅ Actualizaciones de seguridad

### Soporte Extendido (Opcional)

**Plan Básico:** $100 USD/mes

- 2 horas de soporte mensual
- Respuesta en 48h
- Corrección de bugs
- Actualizaciones de dependencias

**Plan Avanzado:** $200 USD/mes

- 4 horas de soporte mensual
- Respuesta en 24h
- Nuevas features menores
- Actualizaciones de contenido
- Consultoría técnica

---

## NOTAS FINALES

1. **Código limpio y bien estructurado**: Todo el código sigue las mejores prácticas de React, con ESLint configurado y comentarios explicativos.

2. **Fácil de expandir**: La arquitectura modular permite agregar nuevas páginas, proyectos y funcionalidades sin dificultad.

3. **Bien documentado**: Documentación completa (CLAUDE.md, README.md, GSAP_ANIMATIONS.md) facilita el mantenimiento futuro.

4. **Optimizado**: Configurado para obtener buenos scores de rendimiento en Lighthouse.

5. **Accesibilidad**: Implementa prácticas básicas de accesibilidad web.

6. **Flexibilidad en precios**: Abierto a discutir ajustes según presupuesto disponible del cliente.

---

_Esta cotización está basada en el análisis completo del proyecto GS Arquitecto React desarrollado. Los precios son estimados y pueden ajustarse según requerimientos específicos adicionales._
