# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Visitantes públicos del sitio (reclutadores, clientes potenciales, amigos) que navegan la landing y la futura sección de posts/blog.
- El propio autor/dueño del sitio, como único usuario del dashboard interno (uso administrativo, no público).

## Product Purpose

Portafolio personal para mostrar habilidades técnicas y atraer oportunidades (empleo y clientes). Incluirá una sección de posts/blog. Por separado, un dashboard interno de uso exclusivo del autor para ver analítica del sitio (visitantes por país). Éxito = que reclutadores/clientes que visitan el sitio se lleven una buena impresión y contacten al autor; el dashboard es una herramienta de soporte interno, no parte de la propuesta pública.

## Positioning

Portafolio personal, no un producto competitivo de nicho: el diferenciador es el trabajo, código y criterio del propio autor, no un mecanismo de producto replicable.

## Operating Context

- Landing pública: recorrida por visitantes externos sin autenticación (home + futura sección de posts).
- Dashboard interno: protegido con basicauth (ya implementado en infra vía Terraform/Caddy), pensado exclusivamente para el autor, nunca expuesto a visitantes.
- Deploy vía Docker Compose + Caddy (TLS automático) + Terraform, dominio propio configurado vía `DOMAIN`.

## Capabilities and Constraints

- Frontend: React 19 + Vite + TypeScript + Tailwind v4.
- Backend: FastAPI (Python, uv), con Postgres opcional vía `DATABASE_URL`.
- Secciones planeadas del sitio (navegación, aún sin rutas reales — el autor va a integrar react-router-dom): Retos (board de ideas/retos enviados por visitantes), Blog, Agenda (para agendar una reunión), Herramientas (utilidades que el autor construya para desarrolladores o clientes).
- Dashboard: la vista "Visitantes por país" existe en el frontend, pero el endpoint de estadísticas en el backend todavía no está listo (placeholder actual).
- Backend pendiente: endpoint `POST /challenges` para guardar los retos enviados desde el modal "Proponme un reto" (frontend ya implementado y apuntando ahí).
- Indeciso: mecanismo final de autorización del dashboard más allá del basicauth ya provisto, fuente de datos de analítica, y contenido/mecanismo de Agenda y Herramientas.

## Brand Commitments

Sin nombre de marca/identidad confirmado todavía — el texto actual ("Proyecto") es placeholder del scaffold de Vite, no un nombre real. Abierto para una decisión futura.

## Evidence on Hand

No hay contenido real cargado todavía (proyectos, posts, testimonios). El "board de ideas" de la home actual es contenido de ejemplo del scaffold y no debe tratarse como copy final.

## Product Principles

- Transmitir credibilidad técnica y buen criterio de diseño: el sitio es la vidriera profesional del autor.
- Separación clara entre lo público (modo Persuade: landing + posts) y lo privado (modo Operate: dashboard interno) — nunca mezclar tono ni exponer el dashboard a visitantes.
- Preferir contenido real (posts, proyectos propios) sobre placeholders en cuanto exista.
