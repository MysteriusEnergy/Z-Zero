# Portafolio 3D — campo de partículas generativo

Mi portafolio personal: una sola página construida con React Three Fiber. En vez de un modelo 3D decorativo de fondo, el campo de partículas **es** el hilo narrativo: se reorganiza en una formación distinta por cada sección mientras haces scroll.

- **Hero** → nube dispersa, sin estructura.
- **Sobre mí** → una cinta continua, como un trazo de código.
- **Proyectos** → clusters discretos, uno por proyecto.
- **Contacto** → un núcleo denso, como una señal.

El razonamiento de diseño está en [`docs/DESIGN.md`](./docs/DESIGN.md) y la arquitectura técnica en [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md).

## Stack

| Capa | Herramienta | Por qué |
|---|---|---|
| Build | Vite + TypeScript | arranque rápido, tipado estricto |
| UI | React 18 | composición declarativa de las secciones |
| 3D | Three.js vía `@react-three/fiber` + `@react-three/drei` | integra WebGL al árbol de React sin imperative glue code |
| Post-procesado | `@react-three/postprocessing` | bloom para el brillo de las partículas |
| Animación de scroll | GSAP + ScrollTrigger | sincroniza scroll y animación |
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
├── components/        # Layout, Nav, ProjectIndexItem — piezas reutilizables
├── store/             # useScrollStore (Zustand)
├── hooks/             # useScrollProgress, useReducedMotion
├── data/              # contenido (textos, proyectos)
├── styles/            # tokens.css — paleta y tipografía; index.css — estilos de UI
└── utils/             # helpers puros (lerp, clamp)
```

## Dónde vive el contenido

Si quiero actualizar la página no toco los componentes, solo los datos:

1. **Textos** (hero, sobre mí, contacto) → `src/data/content.ts`.
2. **Proyectos** → el arreglo en `src/data/projects.ts`. El orden del arreglo es el orden en pantalla; cada proyecto puede llevar `href` (enlace) o `status` (`Público` / `Privado` / `Próximamente`).
3. **Colores y tipografía** → `src/styles/tokens.css`. Cambiar una variable ahí se propaga a toda la UI (no a las partículas, que tienen sus propios uniforms de color en `ParticleField.tsx`).
4. **Secciones** → al agregar o quitar una sección, actualizo `navSections` en `content.ts` y agrego una formación en `formations.ts` (guía de extensión en `docs/ARCHITECTURE.md`).

## Rendimiento y accesibilidad

- El conteo de partículas baja automáticamente en pantallas angostas (`ParticleField.tsx`).
- Se respeta `prefers-reduced-motion`: desactiva la turbulencia ambiental, el paralaje de cámara y el post-procesado.
- El foco de teclado es siempre visible (`:focus-visible` en `index.css`).
- El chunk de Three.js/R3F pesa ~280 KB gzip — es el costo esperado de WebGL; si en el futuro agrego modelos `.glb` pesados, conviene `React.lazy` para la `Experience` completa.

## Despliegue

Es un sitio 100% estático — `pnpm build` genera `dist/`, que se sube directamente a Vercel, Netlify o GitHub Pages sin configuración adicional.
