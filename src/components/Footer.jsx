import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>GS Arquitecto</h3>
            <p>{t('footer.description')}</p>
          </div>
          <div className="footer-column">
            <h3>{t('footer.quickLinks')}</h3>
            <ul>
              <li><Link to="/">{t('nav.home')}</Link></li>
              <li><Link to="/projects">{t('nav.projects')}</Link></li>
              <li><Link to="/services">{t('nav.services')}</Link></li>
              <li><Link to="/about">{t('nav.about')}</Link></li>
              <li><Link to="/contact">{t('nav.contact')}</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>{t('footer.services')}</h3>
            <ul>
              <li>{t('services.architecturalDesign')}</li>
              <li>{t('services.constructionPlans')}</li>
              <li>{t('services.constructionManagement')}</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>{t('footer.followUs')}</h3>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2023 GS Arquitecto. {t('footer.allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
