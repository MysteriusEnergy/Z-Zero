import { siteContent } from '../data/content';

export function About() {
  const { about } = siteContent;

  return (
    <section className="section" data-section id="about">
      <div className="section-inner section-grid">
        <div>
          <p className="eyebrow">{about.eyebrow}</p>
          <h2>{about.title}</h2>
        </div>
        <div className="section-copy">
          {about.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
