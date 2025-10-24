import { useEffect } from 'react';

const ImageModal = ({ isOpen, imageSrc, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal" style={{ display: 'block' }} onClick={onClose}>
      <span className="close-modal" onClick={onClose}>&times;</span>
      <img className="modal-content" src={imageSrc} alt="Full size" onClick={(e) => e.stopPropagation()} />
    </div>
  );
};

export default ImageModal;
