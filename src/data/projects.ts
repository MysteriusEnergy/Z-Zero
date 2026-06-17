export type Project = {
  title: string;
  year: string;
  summary: string;
  tags: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    title: 'Sistema de reservas',
    year: '2026',
    summary:
      'TODO: reemplaza este ejemplo con un proyecto real. Describe el problema, tu rol y el impacto en una frase concreta.',
    tags: ['React', 'TypeScript', 'UX'],
    href: 'https://example.com',
  },
  {
    title: 'Dashboard operativo',
    year: '2025',
    summary:
      'Un layout editorial para mostrar métricas, estados y decisiones sin convertir la interfaz en una tabla infinita.',
    tags: ['Data UI', 'Design System', 'Performance'],
  },
  {
    title: 'Landing experimental',
    year: '2024',
    summary:
      'Exploración visual con scroll narrativo, microinteracciones y una dirección de arte más expresiva.',
    tags: ['Motion', 'Creative Dev', 'WebGL'],
  },
];
