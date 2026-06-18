export const navSections = [
  { id: 'hero', label: 'Inicio' },
  { id: 'about', label: 'Sobre mí' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'contact', label: 'Contacto' },
] as const;

export const siteContent = {
  hero: {
    eyebrow: 'Full Stack Developer & IT Infrastructure Specialist',
    title: 'Soluciones web listas para producción.',
    body: 'Combino frontend moderno, backend robusto e infraestructura confiable para construir aplicaciones web escalables, eficientes y bien estructuradas.',
    cta: 'Ver proyectos',
  },
  about: {
    eyebrow: 'Sobre mí',
    title: 'Construyo software pensando en producto, arquitectura e infraestructura.',
    body: [
      'Soy Desarrollador de Software con experiencia en desarrollo Full Stack e infraestructura TIC.',
      'He trabajado en proyectos empresariales construyendo aplicaciones web, APIs REST, automatización de procesos y despliegues en entornos productivos.',
      'Me enfoco en crear soluciones escalables, eficientes y bien estructuradas.',
    ],
  },
  projects: {
    eyebrow: 'Proyectos',
    title: 'Soluciones Full Stack, automatización e infraestructura.',
    body: 'Una selección de proyectos donde he trabajado en aplicaciones web empresariales, APIs REST, herramientas de automatización, despliegues e infraestructura lista para producción.',
  },
  contact: {
    eyebrow: 'Contacto',
    title: 'Si necesitas una solución web sólida, hablemos.',
    body: 'Estoy abierto a colaborar en proyectos Full Stack, aplicaciones empresariales, APIs, automatización e infraestructura.',
    email: 'johnmariorestrepo890@gmail.com',
    links: [
      { label: 'GitHub', href: 'https://github.com/MysteriusEnergy' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/john-mario-restrepo-9b0631150/' },
    ],
  },
};
