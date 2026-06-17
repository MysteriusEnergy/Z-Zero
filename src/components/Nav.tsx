import { navSections } from '../data/content';
import { useScrollStore } from '../store/useScrollStore';

export function Nav() {
  const activeSectionIndex = useScrollStore((state) => state.activeSectionIndex);

  return (
    <nav className="site-nav" aria-label="Secciones principales">
      <a className="site-mark" href="#hero" aria-label="Ir al inicio">
        Z/Zero
      </a>
      <div className="nav-list">
        {navSections.map((section, index) => (
          <a
            aria-current={activeSectionIndex === index ? 'page' : undefined}
            className="nav-link"
            href={`#${section.id}`}
            key={section.id}
          >
            <span className="nav-dot" />
            <span className="nav-label">{section.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
