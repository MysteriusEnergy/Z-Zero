import { siteContent } from '../data/content';

export function Contact() {
  const { contact } = siteContent;

  return (
    <section className="section contact-section" data-section id="contact">
      <div className="section-inner section-grid">
        <div>
          <p className="eyebrow">{contact.eyebrow}</p>
          <h2>{contact.title}</h2>
        </div>
        <div className="section-copy contact-links">
          <p>{contact.body}</p>
          <a className="email-link" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          <div className="social-list">
            {contact.links.map((link) => (
              <a href={link.href} key={link.label} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
