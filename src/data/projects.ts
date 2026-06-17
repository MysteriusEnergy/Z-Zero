export type Project = {
  title: string;
  year: string;
  summary: string;
  tags: string[];
  href?: string;
  status?: 'Privado' | 'Público' | 'Próximamente';
};

export const projects: Project[] = [
  {
    title: 'DevLog',
    year: '2026',
    summary:
      'Aplicación web Full Stack para registrar, organizar y analizar sesiones de trabajo en proyectos personales o profesionales. Permite gestión de proyectos, tracking de tiempo y visualización de métricas de productividad.',
    tags: ['SvelteKit', 'TypeScript', 'Django', 'DRF', 'PostgreSQL', 'JWT'],
    status: 'Público',
  },
  {
    title: 'Sistema Web Empresarial - CIAT',
    year: '2025',
    summary:
      'Plataforma web empresarial desarrollada para optimizar procesos internos de una organización multinacional. Participé en el desarrollo frontend, backend e integración mediante APIs REST.',
    tags: ['React', 'Python', 'Django REST Framework', 'MySQL', 'REST API'],
    status: 'Privado',
  },
  {
    title: 'Sistema Comparador y Sincronizador de Bases de Datos',
    year: '2025',
    summary:
      'Herramienta desarrollada en Python para comparar estructuras de bases de datos MySQL, detectar diferencias y generar scripts SQL de sincronización automáticamente.',
    tags: ['Python', 'MySQL', 'SQL'],
    status: 'Público',
  },
  {
    title: 'Instalador Automatizado de Servicios y Dominios',
    year: '2025',
    summary:
      'Solución de automatización para instalación y configuración de dominios, servicios, bases de datos y despliegue de aplicaciones empresariales.',
    tags: ['Java', 'Install4J', 'MySQL', 'Infraestructura'],
    status: 'Privado',
  },
  {
    title: 'Implementación de Sistema de Tickets Empresarial',
    year: '2025',
    summary:
      'Implementación y despliegue de plataforma empresarial para gestión de incidencias, incluyendo configuración de servidores, dominios y bases de datos.',
    tags: ['Linux', 'MySQL', 'Deploy', 'Infraestructura'],
    status: 'Privado',
  },
];
