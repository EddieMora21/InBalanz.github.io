# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

InBalanZ - A bilingual (Spanish/English) React-based website for an architecture studio specializing in residential design with natural integration and passive strategies. Built with Vite, React Router, i18next, and GSAP for animations.

## Tech Stack

- **React 19** with Vite as build tool
- **React Router v7** for client-side routing
- **i18next + react-i18next** for internationalization
- **GSAP** with ScrollTrigger for animations
- **ESLint** for code quality
- **CSS** organized in modular files (no CSS-in-JS or preprocessors)

## Common Commands

```bash
# Development
npm run dev          # Start dev server (usually http://localhost:5173)

# Production
npm run build        # Build for production (outputs to dist/)
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint on all files
```

## Architecture & Key Patterns

### Routing Structure
All routes defined in `src/App.jsx`:
- `/` - Home page
- `/projects` - Projects gallery with filtering
- `/projects/:id` - Dynamic project detail page
- `/services` - Services page
- `/about` - About page
- `/contact` - Contact page

### Internationalization System
- Centralized in `src/i18n.js` using i18next
- Two languages: Spanish (es - default) and English (en)
- Language preference stored in localStorage
- Translation keys organized by section (nav, hero, projects, services, philosophy, contact, footer)
- Access in components via `useTranslation()` hook: `const { t, i18n } = useTranslation()`
- Language switcher in Header component updates both i18n state and localStorage

### Project Data Architecture
- All project data centralized in `src/data/projectsData.js`
- Each project object includes:
  - Basic info: id, title, category, client, year, location, area, duration
  - Bilingual fields: shortDescription, description, features, process (all have `.es` and `.en` properties)
  - Team array with bilingual role and bio
  - Images array (currently using Unsplash URLs)
- Categories: "Residencial", "Comercial", "Remodelación", "Visualizaciones"
- Eight projects currently defined (IDs 1-8)

### Testimonials Data Architecture
- All testimonial data centralized in `src/data/testimonialsData.js`
- Each testimonial object includes:
  - Basic info: id, name, project (bilingual), projectType (bilingual), rating, year
  - Bilingual fields: shortTestimonial, fullTestimonial
  - Media: image (project image), clientPhoto
- Used in TestimonialsCarousel and TestimonialsDetailed components

### Animation Pattern with GSAP
- GSAP and ScrollTrigger registered in components that use them
- Common pattern in `Home.jsx` and other pages:
  - Create refs for animated elements
  - Use `useEffect` to set up GSAP timelines and ScrollTrigger instances
  - Typical animations: fade in + slide (y or x axis), stagger for lists
  - ScrollTrigger typically starts at `'top 80%'`
- Hero section includes slider with rotating text/colors synced to background images

### Component Structure
```
src/
├── components/
│   ├── Header.jsx               # Nav with language switcher, mobile hamburger menu
│   ├── Footer.jsx               # Site footer
│   ├── ProjectCard.jsx          # Reusable project card for grids
│   ├── ImageModal.jsx           # Modal for image gallery viewing
│   ├── ScrollToTop.jsx          # Scroll to top on route changes
│   ├── WhatsAppButton.jsx       # Floating WhatsApp contact button
│   ├── TestimonialsCarousel.jsx # Carousel for short testimonials
│   ├── TestimonialsDetailed.jsx # Detailed testimonials display
│   └── ThemeCustomizer.jsx      # Client theme color customization panel
├── pages/
│   ├── Home.jsx          # Hero, featured projects, services preview, philosophy, contact
│   ├── Projects.jsx      # Full project gallery with category filtering
│   ├── ProjectDetail.jsx # Dynamic project detail using useParams
│   ├── Services.jsx      # Services and process sections
│   ├── About.jsx         # About page
│   └── Contact.jsx       # Contact page with form
├── config/
│   └── themeConfig.js    # Theme customizer configuration and enable/disable flag
├── data/
│   ├── projectsData.js   # Central project data store
│   └── testimonialsData.js # Central testimonials data store
├── hooks/
│   ├── useScrollEffect.js      # Custom hook for scroll-based header styling
│   └── useThemeCustomizer.js   # Custom hook for theme color management
└── styles/
    ├── style.css         # Main styles with CSS variables
    └── responsive.css    # Media queries and responsive breakpoints
```

### CSS Organization
- `src/index.css` - Global resets and base styles
- `src/styles/style.css` - Main component styles with CSS variables (following Brand Identity Guide):
  - `--primary-color: #002335` (Dark Blue - main brand color)
  - `--accent-color: #5C7205` (Olive Green - secondary color)
  - `--accent-secondary: #8A862F` (Lime Green - accents)
  - `--secondary-color: #F4FFE6` (Medium Gray - backgrounds)
  - `--neutral-light: #DADADA` (Light Gray)
  - `--font-primary: 'Poppins', sans-serif` (Main titles and headings)
  - `--font-secondary: 'Montserrat', sans-serif` (Body text and versatile use)
  - `--font-body: 'Questrial', sans-serif` (Body text and content)
- `src/styles/responsive.css` - Mobile-first responsive breakpoints
- All CSS loaded in `src/main.jsx`

### Theme Customizer System
**IMPORTANT**: The site includes an optional Theme Customizer that allows clients to preview and customize brand colors in real-time.

**Enable/Disable**: Edit `src/config/themeConfig.js`:
```javascript
export const ENABLE_THEME_CUSTOMIZER = true;  // Set to false to hide
```

**Features**:
- **Live color customization** for 5 main color sections:
  - Primary Color (Headers, Navigation)
  - Accent Color (Buttons, Links)
  - Secondary Accent Color (Details)
  - Background Color (Sections)
  - Neutral Color (Borders, Grays)
- **4 preset palettes** based on brand colors
- **Persistent storage** in browser localStorage
- **Export functionality** to save color configuration as JSON
- **Bilingual interface** (Spanish/English)
- **Fully responsive** design

**Usage**:
1. Set `ENABLE_THEME_CUSTOMIZER = true` during client review sessions
2. Floating palette button appears in bottom-right corner
3. Client can customize colors and try different palettes
4. Export final configuration to JSON
5. Apply colors permanently to CSS variables in `style.css`
6. Set `ENABLE_THEME_CUSTOMIZER = false` before production deployment

**Files**:
- `src/config/themeConfig.js` - Configuration and flag
- `src/hooks/useThemeCustomizer.js` - Color management logic
- `src/components/ThemeCustomizer.jsx` - UI component
- `src/styles/style.css` (lines 3880+) - Customizer styles

See `THEME_CUSTOMIZER.md` for detailed documentation.

## Visual Brand Identity Guide

### Corporate Colors

**Primary Palette**

- **Primary Color - Dark Blue**
  - HEX: `#002335`
  - RGB: 0, 35, 53
  - CMYK: 100%, 78%, 51%, 62%
  - Usage: Main brand color, headers, primary UI elements

- **Secondary Color - Olive Green**
  - HEX: `#5C7205`
  - RGB: 92, 114, 5
  - CMYK: 66%, 35%, 100%, 23%
  - Usage: Accent color, CTAs, highlights

- **Neutral Color - Light Gray**
  - HEX: `#DADADA`
  - RGB: 218, 218, 218
  - CMYK: 17%, 12%, 13%, 0%
  - Usage: Backgrounds, borders, subtle UI elements

- **Contrast Color - Black**
  - HEX: `#000000`
  - RGB: 0, 0, 0
  - CMYK: 100%, 100%, 100%, 100%
  - Usage: Text, strong contrast elements

**Secondary Palette**

- **Medium Blue**
  - HEX: `#014086`
  - RGB: 1, 64, 102
  - CMYK: 100%, 72%, 35%, 24%

- **Lime Green**
  - HEX: `#8A862F`
  - RGB: 138, 182, 47
  - CMYK: 54%, 7%, 97%, 0%

- **Medium Gray**
  - HEX: `#F4FFE6`
  - RGB: 244, 239, 230
  - CMYK: 5%, 6%, 11%, 0%

- **White**
  - HEX: `#FFFFFF`
  - RGB: 255, 255, 255
  - CMYK: 0%, 0%, 0%, 0%

### Typography Guidelines

**Philosophy**
Complementing the logo with sans-serif typefaces is crucial because this type of font conveys modernity, clarity, and simplicity, reinforcing readability and the visual strength of the brand. By using sans-serif fonts in titles, featured text, or secondary branding applications, harmony with the logo style is maintained, visual overload is avoided, and the graphic identity is consistent and easily recognizable across all media.

**Primary Typefaces**

- **Poppins** - Main titles and headings
- **Sans-serif (generic)** - Featured text and subtitles
- **Questrial** - Body text and general content
- **Montserrat** - Versatile applications and hierarchies

**Alternative Typefaces**

- **Calibri** - Corporate documents and Office use
- **Caviar Dreams** - Decorative and special elements
- **GeoSans** - Modern and digital applications
- **Futura** - Editorial design and printed materials

### Application Guidelines

1. **Color Consistency**
   - Maintain color consistency across all brand materials
   - Primary colors (dark blue and olive green) should be predominant
   - Secondary colors are used for accents and variations

2. **Typography**
   - Use sans-serif fonts to reinforce modernity and readability
   - Maintain clear typographic hierarchies
   - Ensure consistency in font pairing across materials

3. **Accessibility**
   - Ensure sufficient contrast between text and background
   - Follow WCAG guidelines for color contrast ratios
   - Test readability across different screen sizes and devices

4. **Brand Cohesion**
   - All design elements should align with the brand's modern, clean aesthetic
   - Maintain visual consistency across digital and print materials
   - Use the brand palette to create recognizable patterns

### Design Guidelines
**IMPORTANT STYLING RULES:**
- ❌ **NEVER use gradients** (`linear-gradient`, `radial-gradient`, etc.)
- ✅ **ALWAYS use solid colors** from CSS variables or rgba values
- ✅ Use `background-color` instead of `background` with gradients
- ✅ For color transitions, use solid color changes with CSS transitions
- ✅ For shine/overlay effects, use solid semi-transparent colors (rgba)

### Header/Navigation Behavior
- Uses `useScrollEffect()` custom hook to add `.scrolled` class on scroll
- Active link highlighting via `useLocation()` hook
- Hamburger menu toggles `.active` class on `.nav-menu` for mobile
- Language switcher integrated into nav menu

### State Management
- No global state library - uses React hooks and context
- Language state: managed by i18next + localStorage
- Navigation state: React Router's `useLocation` and `useParams`
- UI state: local component state with `useState`

## Important Development Notes

### Adding New Projects
1. Add project object to `src/data/projectsData.js` array
2. Ensure all bilingual fields have both `.es` and `.en` properties
3. Use sequential ID (string format: '1', '2', etc.)
4. Add project images (update URLs in images array)
5. Project cards and detail pages will automatically render new data

### Adding Translations
1. Edit `src/i18n.js` resources object
2. Add keys to both `es.translation` and `en.translation` objects
3. Use nested structure for organization (e.g., `services.title`)
4. Access in components via `t('key.path')`

### Working with GSAP Animations
**IMPORTANT**: Before implementing any GSAP animation, consult the `GSAP_ANIMATIONS.md` file for complete examples and best practices.

- Always register plugins: `gsap.registerPlugin(ScrollTrigger)`
- Create refs for elements to animate
- Set up animations in `useEffect` (runs once on mount)
- Clean up ScrollTrigger instances if needed (return cleanup function from useEffect)
- For language-dependent animations, include language in useEffect dependencies
- Refer to `GSAP_ANIMATIONS.md` for specific animation patterns:
  - Fade In variations (from all directions)
  - Text animations (letter by letter, typewriter, rotating)
  - Image reveals and parallax effects
  - Card animations and hover effects
  - Sliders and carousels
  - Stagger animations
  - Form animations
  - Navigation animations
  - Counter/number animations
  - ScrollTrigger configurations

### Font Awesome Icons
- Icons loaded from CDN in `index.html`
- Use class names like `<i className="fas fa-home"></i>`
- Available in Header hamburger menu and throughout UI

### External Dependencies
- Google Fonts (Poppins, Questrial, Montserrat) loaded via CSS import in `style.css`
- Font Awesome 6.x loaded from CDN in `index.html`
- Unsplash images for projects and hero (requires internet connection)
- Avatar images from pravatar.cc for testimonials

## Build & Deployment

- Vite builds to `dist/` directory
- Static site - can be deployed to any static hosting (Netlify, Vercel, GitHub Pages, etc.)
- No backend required - forms currently have no submission handling (add backend integration as needed)
- Ensure base URL is configured in `vite.config.js` if deploying to subdirectory
