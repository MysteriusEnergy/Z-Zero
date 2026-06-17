# Decisiones de diseño

## El sujeto

Un portafolio personal de quien diseña y construye interfaces — no una empresa, no un producto con feature list. El trabajo de la página es uno solo: que en los primeros segundos quede claro que quien lo hizo presta atención al detalle, y que el camino hasta "contáctame" sea corto.

## Color

| Token | Valor | Uso |
|---|---|---|
| `--color-void` | `#0b0e14` | fondo — azul-carbón, no negro puro |
| `--color-void-soft` | `#11151d` | superficies ligeramente elevadas |
| `--color-ink` | `#ece9e2` | texto principal — blanco cálido, no `#fff` |
| `--color-muted` | `#8b92a1` | texto secundario |
| `--color-ember` | `#ff6b4a` | partículas (acento primario), eyebrows, foco |
| `--color-jade` | `#4ade9c` | partículas (acento secundario), tags de proyecto |
| `--color-line` | `#1e2430` | líneas divisorias |

**Por qué no es el típico "fondo negro + un solo acento ácido":** ese patrón funciona, pero aparece en casi cualquier sitio generado con IA hoy, independientemente del contenido. Aquí el fondo es azul-carbón (no negro puro, tiene temperatura) y hay **dos** acentos —ember y jade— que conviven y se mezclan en el shader según la sección, no uno solo aplicado de forma plana. La mezcla entre ambos colores en las partículas (`uAccentMix` en el shader) es parte del lenguaje visual, no solo paleta estática.

## Tipografía

- **Display — Fraunces**: una serif contemporánea con detalles ópticos marcados. Se eligió específicamente *en contraste* con el campo de partículas, que es frío y técnico — la tipografía aporta la calidez que el WebGL no tiene. Evita la sans-serif técnica genérica (Inter/Söhne para todo) que es la opción por defecto en casi cualquier portafolio de desarrollador.
- **Body — Inter**: cuerpo de texto neutro y de alta legibilidad; aquí sí tiene sentido lo "neutro", porque su trabajo es no competir con la display.
- **Mono — JetBrains Mono**: reservada para metadatos (años de proyecto, etiquetas, eyebrows). Funciona como un guiño discreto al oficio (código) sin que todo el sitio se sienta como una terminal.

## Layout

Una sola columna larga, sin grid de tarjetas. El contenido se lee de arriba a abajo igual que el campo de partículas se transforma de abajo a arriba — el layout y la animación cuentan la misma historia de progreso. Los proyectos se listan como filas tipo índice editorial (año + título + resumen + link), no como cards con imagen — mantiene el foco en el texto y evita depender de fotografías de producto que en un scaffold inicial no existen.

```
[ nav fija, esquina superior — discreta ]
[ canvas fijo, fondo, toda la pantalla ]
[ Hero    — nube dispersa ]
[ About   — cinta continua ]
[ Projects — clusters, uno por proyecto ]
[ Contact  — núcleo denso ]
```

## La firma: partículas que mutan, no decoran

El riesgo de diseño que vale la pena nombrar: en vez de un modelo 3D bonito pero estático de fondo (la opción segura), el campo de partículas **es la estructura de navegación**. Cada formación corresponde a una sección y comunica algo sobre su contenido — dispersión para la introducción abierta, un trazo continuo para una narrativa personal, clusters discretos para ítems separables (proyectos), un núcleo denso para el punto de cierre (contacto). Si quitas el texto, la secuencia de formaciones todavía cuenta una historia de apertura → narrativa → opciones → convergencia.

## Restricciones que se mantuvieron a propósito

- Sin `border-radius` grandes ni sombras suaves — las líneas finas (`--color-line`) y el espacio negativo hacen el trabajo de separación.
- Sin iconografía decorativa: los únicos elementos gráficos son el campo de partículas y la tipografía misma.
- Microinteracciones mínimas (hover en `project-card`, label de nav al pasar el mouse) — el movimiento grande ya lo tiene el canvas; el DOM no necesita competir con él.