import type { Project } from '../data/projects';

type ProjectIndexItemProps = {
  project: Project;
};

export function ProjectIndexItem({ project }: ProjectIndexItemProps) {
  return (
    <article className="project-item">
      <span className="project-year">{project.year}</span>
      <div className="project-body">
        <div className="project-heading">
          <h3>{project.title}</h3>
          {project.href ? (
            <a href={project.href} target="_blank" rel="noreferrer">
              Ver proyecto
            </a>
          ) : project.status ? (
            <span className="project-status" data-status={project.status}>
              {project.status}
            </span>
          ) : null}
        </div>
        <p>{project.summary}</p>
        <ul className="tag-list" aria-label={`Tecnologias usadas en ${project.title}`}>
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
