# MOTORRAX

Sitio web SEO-friendly de **adventure motorcycle** para la comunidad MOTORRAX (México).

- **Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · Supabase
- **Datos:** rutas, rallies, productos y sponsors desde el proyecto Supabase NorthBikers
- **Marca:** contenido orientado a maxitrail / off-road / Rally ADV (Instagram `@_motorrax`, Facebook `/motorrax`, YouTube `@_motorrax`)

## Inicio rápido

```bash
npm install
cp .env.example .env.local   # ya incluye URL/keys públicas de Supabase
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://aezxnubglexywadbjpgo.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key (RLS) |
| `NEXT_PUBLIC_SUPABASE_STORAGE_URL` | Storage público |
| `NEXT_PUBLIC_SUPABASE_EDGE_URL` | Edge functions |
| `NEXT_PUBLIC_SERVER_ROOT_API` | `https://api.northbikers.com` |
| `NEXT_PUBLIC_FIREBASE_PAY_URL` | Cloud Function Stripe |
| `NEXT_PUBLIC_SITE_URL` | URL canónica (SEO) |

## Páginas

| Ruta | Contenido |
|------|-----------|
| `/` | Hero adventure, rutas destacadas, tienda, sponsors |
| `/rutas` | Listado + búsqueda (Supabase `routes`) |
| `/rutas/[id]` | Detalle + JSON-LD Event + video YouTube |
| `/rallies` | Rally ADV + tours MOTORRAX |
| `/tienda` | Productos activos |
| `/guias` | Guías ADV (contenido editorial) |
| `/nosotros` | Marca y redes |
| `/contacto` | Contacto |
| `/links` · `/l` · `links.motorrax.com` | **Pit Stop** — link-in-bio (redes, deals, rodadas) |
| `/sitemap.xml` · `/robots.txt` | SEO |

### Pit Stop (link-in-bio)

Página tipo Linktree para bios de Instagram, Facebook, TikTok y CTAs en video:

- **Nombre:** Pit Stop  
- **URLs:** `motorrax.com/links` · `motorrax.com/l` (corto) · `links.motorrax.com` (subdominio)  
- **Editar botones:** `src/lib/link-hub.ts`  
- **DNS (Vercel):** nameservers `ns1/ns2.vercel-dns.com` + add **both** `motorrax.com` and `links.motorrax.com` in Project → Settings → Domains. Middleware rewrites subdomain `/` → `/links`.

## SEO

- Metadata por página (title, description, Open Graph, Twitter)
- `sitemap.ts` con rutas estáticas + dinámicas desde Supabase
- `robots.ts`
- JSON-LD Organization + WebSite + Event en detalle de ruta
- `lang="es-MX"`, canonicals, keywords adventure motorcycle

## Estructura

```
src/
  app/           # App Router pages
  components/    # UI
  lib/           # config, supabase, data, seo, utils
  types/         # tipos de DB
```

## Scripts

```bash
npm run dev      # desarrollo
npm run build    # producción
npm run start    # servir build
npm run lint     # ESLint
```

## Notas

- Las imágenes de banners relativos se resuelven bajo el bucket `pictures` de Supabase Storage.
- La anon key es pública (cliente); las políticas RLS del proyecto definen el acceso.
- `publicURL` / app legacy: `https://northbikers-mrx.web.app/`
