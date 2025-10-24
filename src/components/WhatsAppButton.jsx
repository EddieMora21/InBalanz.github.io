import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const WhatsAppButton = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const [isHovered, setIsHovered] = useState(false);

  // Número de WhatsApp (cambiar por el número real)
  const phoneNumber = '50612345678'; // Formato: código de país + número sin espacios ni símbolos

  const message = currentLang === 'es'
    ? 'Hola, estoy interesado en sus servicios de arquitectura.'
    : 'Hello, I am interested in your architecture services.';

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float-button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Contact us on WhatsApp"
    >
      <i className="fab fa-whatsapp"></i>
      {isHovered && (
        <span className="whatsapp-tooltip">
          {currentLang === 'es' ? '¿Necesitas ayuda?' : 'Need help?'}
        </span>
      )}
    </a>
  );
};

export default WhatsAppButton;
