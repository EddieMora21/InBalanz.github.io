import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useScrollEffect } from '../hooks/useScrollEffect';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrollEffect();
  const location = useLocation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="container">
        <div className="header-container">
          <Link to="/" className="logo" onClick={closeMenu}>
            <img src="/logo-principal.webp" alt="InBalanZ" className="logo-image" />
          </Link>
          <nav>
            <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
              <li>
                <Link to="/" className={isActive('/')} onClick={closeMenu}>
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/projects" className={isActive('/projects')} onClick={closeMenu}>
                  {t('nav.projects')}
                </Link>
              </li>
              <li>
                <Link to="/services" className={isActive('/services')} onClick={closeMenu}>
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link to="/about" className={isActive('/about')} onClick={closeMenu}>
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className={isActive('/contact')} onClick={closeMenu}>
                  {t('nav.contact')}
                </Link>
              </li>
              <div className="language-switcher">
                <button
                  className={i18n.language === 'es' ? 'active' : ''}
                  onClick={() => changeLanguage('es')}
                >
                  ES
                </button>
                <button
                  className={i18n.language === 'en' ? 'active' : ''}
                  onClick={() => changeLanguage('en')}
                >
                  EN
                </button>
              </div>
            </ul>
            <div className="hamburger" onClick={toggleMenu}>
              <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
