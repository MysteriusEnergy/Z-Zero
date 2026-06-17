import { siteContent } from '../data/content';

export function Hero() {
  const { hero } = siteContent;

  return (
    <section className="section hero-section" data-section id="hero">
      <div className="section-inner hero-inner">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p className="hero-copy">{hero.body}</p>
        <a className="text-link" href="#projects">
          {hero.cta}
        </a>
      </div>
    </section>
  );
}
