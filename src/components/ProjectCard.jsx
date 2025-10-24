import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ProjectCard = ({ project }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <Link to={`/projects/${project.id}`} className="project-card">
      <img src={project.images[0]} alt={project.title} />
      <div className="project-info">
        <div className="project-text-content">
          <h3>{project.title}</h3>
          <p>{currentLang === 'es' ? project.shortDescription.es : project.shortDescription.en}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
