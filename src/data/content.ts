export const navSections = [
  { id: 'hero', label: 'Inicio' },
  { id: 'about', label: 'Sobre mí' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'contact', label: 'Contacto' },
] as const;

export const siteContent = {
  hero: {
    eyebrow: 'Portafolio generativo',
    title: 'Interfaces con detalle, ritmo y criterio visual.',
    body: 'TODO: reemplaza este texto con una frase clara sobre quién eres, qué construyes y por qué vale la pena hablar contigo.',
    cta: 'Ver proyectos',
  },
  about: {
    eyebrow: 'Sobre mí',
    title: 'Diseño experiencias digitales que se sienten precisas, no genéricas.',
    body: [
      'TODO: cuenta en dos o tres líneas tu enfoque profesional: frontend, producto, visual design, sistemas, performance o lo que realmente te represente.',
      'La idea es que esta sección funcione como una cinta narrativa: menos biografía larga, más criterio de trabajo.',
    ],
  },
  projects: {
    eyebrow: 'Proyectos',
    title: 'Una selección corta, editable y enfocada.',
    body: 'Cada proyecto debería explicar el problema, tu rol y el resultado. Por ahora dejamos datos de ejemplo para validar el layout.',
  },
  contact: {
    eyebrow: 'Contacto',
    title: 'Si el trabajo conecta, hablemos.',
    body: 'TODO: reemplaza estos enlaces con tu correo, LinkedIn, GitHub o el canal que prefieras.',
    email: 'hola@example.com',
    links: [
      { label: 'GitHub', href: 'https://github.com/' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    ],
  },
};
