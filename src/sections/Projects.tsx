import { ProjectIndexItem } from '../components/ProjectIndexItem';
import { siteContent } from '../data/content';
import { projects } from '../data/projects';

export function Projects() {
  const { projects: projectsContent } = siteContent;

  return (
    <section className="section projects-section" data-section id="projects">
      <div className="section-inner">
        <div className="section-header">
          <p className="eyebrow">{projectsContent.eyebrow}</p>
          <h2>{projectsContent.title}</h2>
          <p>{projectsContent.body}</p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <ProjectIndexItem key={`${project.year}-${project.title}`} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
