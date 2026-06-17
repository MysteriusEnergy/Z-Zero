# Arquitectura

## Idea central: dos capas independientes

El sitio tiene dos capas que **nunca se referencian directamente entre sí**:

```
┌─────────────────────────────────────────┐
│  .content-layer   (DOM normal, scrollea)  │  z-index: 1
│  Nav + Hero + About + Projects + Contact  │
├─────────────────────────────────────────┤
│  .canvas-layer    (WebGL, position: fixed)│  z-index: 0
│  Experience → ParticleField + CameraRig   │
└─────────────────────────────────────────┘
```

El contenido vive en el flujo normal del documento y produce el alto real de la página (y por tanto el scroll). El canvas WebGL está fijo, ocupa todo el viewport, y se queda detrás. Ninguno de los dos sabe que el otro existe — se comunican exclusivamente a través de un estado compartido.

## Flujo de datos: del scroll a la GPU

```
scroll del navegador
        │
        ▼
useScrollProgress()  (GSAP ScrollTrigger sobre cada <section data-section>)
        │  escribe
        ▼
useScrollStore  (Zustand: overallProgress, activeSectionIndex, sectionProgress)
        │  leen
        ├──────────────────────┬───────────────────────┐
        ▼                      ▼                        ▼
   ParticleField.tsx      CameraRig.tsx              Nav.tsx
   (useFrame, 60fps)      (useFrame, 60fps)          (re-render normal de React)
   genera nueva formación  mueve la cámara             resalta el punto activo
   y anima uMix en el       (zoom + paralaje)
   shader
```

Dos detalles de esta arquitectura son deliberados:

1. **`ParticleField` y `CameraRig` leen el store con `useScrollStore.getState()` dentro de `useFrame`, no con el hook `useScrollStore(selector)`.** Eso evita que React vuelva a renderizar 60 veces por segundo — el store ahí actúa como una simple casilla de memoria que el render loop de Three.js consulta, no como estado reactivo de React.
2. **`Nav.tsx` sí usa el hook reactivo** (`useScrollStore((s) => s.activeSectionIndex)`) porque sus actualizaciones son poco frecuentes (una vez por sección) y sí necesita re-renderizar para resaltar el punto activo.

## El campo de partículas: cómo "muta" sin recrear geometría

Esta es la pieza menos obvia, documentada porque es la que más probablemente vas a tocar.

Todas las formaciones (`src/three/formations.ts`) generan exactamente el mismo número de partículas. Eso permite tener **dos atributos de posición fijos** en la geometría:

- `position` — la formación de la que se viene (el origen).
- `aTo` — la formación hacia la que se va (el destino).

El vertex shader (`particles.vert.glsl`) simplemente interpola: `mix(position, aTo, uMix)`. Cuando `uMix` llega a 1 dentro de `ParticleField.tsx`, el destino se copia sobre `position` y `uMix` vuelve a 0 — así el siguiente cambio de sección parte de un estado limpio. No se crea ni destruye ningún `BufferGeometry` durante la vida de la página; solo se reescriben los arreglos `Float32Array` ya existentes (`needsUpdate = true`).

Encima de esa interpolación se suma una turbulencia orgánica (`driftOffset` en el shader) que sube durante la transición y baja cuando la formación se asienta — así nunca se ve como una animación CSS lineal.

### Cómo agregar una quinta sección

1. Escribe una función `miFormacion(count: number)` en `formations.ts` que devuelva `count * 3` posiciones.
2. Agrégala al arreglo `formationGenerators` en la posición que corresponda.
3. Agrega la sección a `navSections` en `data/content.ts` (mismo orden).
4. Crea el componente en `src/sections/` y agrégalo a `App.tsx`.
5. Opcional: agrega una distancia de cámara para esa sección en `SECTION_CAMERA_Z` (`CameraRig.tsx`).

No hace falta tocar el shader ni la geometría: todo el sistema escala por índice de sección.

## Por qué un shader custom y no `InstancedMesh` o `drei`

Con 3000–5000 partículas, un único `THREE.Points` con un `ShaderMaterial` es más liviano que instanciar miles de mallas, y permite que el morphing y la turbulencia ocurran enteramente en la GPU (un solo draw call). `@react-three/drei` se usa para utilidades de cámara/loaders, pero el sistema de partículas en sí se escribió a mano porque es el elemento de firma del diseño — vale la pena tener control total sobre él.

## Decisiones de rendimiento

- El conteo de partículas se reduce en pantallas angostas (`window.innerWidth < 720`) — mismo lenguaje visual, menor costo.
- `dpr={[1, 2]}` en el `<Canvas>` evita renderizar a una densidad de píxeles innecesaria en pantallas 3x.
- El bloom usa `mipmapBlur`, más barato que un blur gaussiano tradicional a resoluciones altas.
- `three`, `@react-three/*` y `gsap` están separados en chunks propios (`vite.config.ts`) para que el código de la app cambie sin invalidar el caché del vendor pesado.

## Accesibilidad como parte de la arquitectura, no un añadido

`useReducedMotion` no es un detalle cosmético: se inyecta como prop en `ParticleField` y `CameraRig`, y ambos componentes cambian su comportamiento real (turbulencia a 0, sin paralaje, sin post-procesado) en lugar de solo acortar duraciones de transición. El morphing entre formaciones se mantiene porque es información (indica navegación), no decoración.

## Qué NO incluye este proyecto a propósito

- **Backend**: no hay, porque no hace falta. Si en el futuro agregas un formulario de contacto que necesite persistencia, la opción más simple sigue siendo un servicio de terceros (Formspree, Resend) antes que montar un servidor propio.
- **Gestor de contenido**: el contenido vive en archivos TypeScript tipados (`src/data/`) en vez de un CMS, porque para un portafolio personal de una sola persona, editar un archivo y hacer `git push` es más simple que mantener una integración externa.
- **Internacionalización**: el sitio asume un solo idioma. Si lo necesitas, `src/data/content.ts` es el único lugar que tocarías para extraer las cadenas.