# Portafolio 3D — campo de partículas generativo

Portafolio personal de una sola página construido con React Three Fiber. En vez de un modelo 3D decorativo de fondo, el campo de partículas **es** el hilo narrativo: se reorganiza en una formación distinta por cada sección mientras haces scroll.

- **Hero** → nube dispersa, sin estructura.
- **Sobre mí** → una cinta continua, como un trazo de código.
- **Proyectos** → clusters discretos, uno por proyecto.
- **Contacto** → un núcleo denso, como una señal.

Ver el razonamiento completo de diseño en [`docs/DESIGN.md`](./docs/DESIGN.md) y la arquitectura técnica en [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md).

## Stack

| Capa | Herramienta | Por qué |
|---|---|---|
| Build | Vite + TypeScript | arranque rápido, tipado estricto |
| UI | React 18 | composición declarativa de las secciones |
| 3D | Three.js vía `@react-three/fiber` + `@react-three/drei` | integra WebGL al árbol de React sin imperative glue code |
| Post-procesado | `@react-three/postprocessing` | bloom para el brillo de las partículas |
| Animación de scroll | GSAP + ScrollTrigger | el estándar de facto para sincronizar scroll y animación |
| Estado compartido | Zustand | puente mínimo entre el DOM (scroll) y la escena WebGL |

No hay backend: todo el contenido vive en `src/data/*.ts` y el sitio se despliega como archivos estáticos.

## Empezar

```bash
pnpm install
pnpm dev        # http://localhost:5173
```

Otros comandos disponibles:

```bash
pnpm build       # build de producción a dist/
pnpm preview     # sirve el build de producción localmente
pnpm lint        # ESLint
pnpm format      # Prettier
pnpm type-check  # solo verificación de tipos, sin build
```

## Estructura del proyecto

La base actual ya separa contenido, estilos, estado y punto de entrada WebGL. Los archivos específicos del sistema de partículas (`ParticleField`, `CameraRig`, `formations` y shaders) se agregan en la siguiente etapa.

Estructura objetivo:

```
src/
├── three/            # todo lo que es WebGL puro
│   ├── Experience.tsx     # <Canvas> raíz
│   ├── ParticleField.tsx  # geometría + shader + lógica de morphing
│   ├── CameraRig.tsx      # zoom/paralaje ligado al scroll
│   ├── PostEffects.tsx    # bloom + viñeta
│   ├── formations.ts      # generadores de las 4 formaciones
│   └── shaders/            # vertex + fragment shader (GLSL)
├── sections/          # una sección de contenido = un archivo
├── components/        # Layout, Nav, ProjectCard — piezas reutilizables
├── store/             # useScrollStore (Zustand)
├── hooks/             # useScrollProgress, useReducedMotion
├── data/              # contenido editable (textos, proyectos)
├── styles/            # tokens.css — toda la paleta y tipografía
└── utils/             # helpers puros (lerp, clamp)
```

## Cómo personalizarlo con tu información

No necesitas tocar ningún componente para poner tu contenido real:

1. **Textos** → edita `src/data/content.ts` (hero, sobre mí, contacto). Los `TODO` marcan lo que debes reemplazar.
2. **Proyectos** → edita el arreglo en `src/data/projects.ts`. El orden del arreglo es el orden en pantalla.
3. **Colores y tipografía** → todo sale de `src/styles/tokens.css`. Cambiar una variable ahí se propaga a toda la UI (no a las partículas, que tienen sus propios uniforms de color en `ParticleField.tsx`).
4. **Secciones** → si agregas o quitas una sección, actualiza `navSections` en `content.ts` y agrega una formación correspondiente en `formations.ts` (ver la guía de extensión en `docs/ARCHITECTURE.md`).

## Rendimiento y accesibilidad

- El conteo de partículas baja automáticamente en pantallas angostas (`ParticleField.tsx`).
- Se respeta `prefers-reduced-motion`: desactiva la turbulencia ambiental, el paralaje de cámara y el post-procesado.
- El foco de teclado es siempre visible (`:focus-visible` en `index.css`).
- El chunk de Three.js/R3F pesa ~280 KB gzip — es el costo esperado de WebGL; si en el futuro agregas modelos `.glb` pesados, considera `React.lazy` para la `Experience` completa.

## Despliegue

Es un sitio 100% estático — `pnpm run build` genera `dist/`, que puedes subir directamente a Vercel, Netlify o GitHub Pages sin configuración adicional.
