# Wanderlust Explorer

MVP del explorador de experiencias de **Wanderlust Labs**: una app multipágina con Next.js (App Router), React y TypeScript para descubrir, buscar, filtrar y guardar experiencias de viaje.

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Páginas

| Ruta | Descripción |
| --- | --- |
| `/` | Home con hero, botón a `/experiences` y accesos directos por categoría y destino |
| `/experiences` | Explorador con las 100 tarjetas, barra de búsqueda y filtros de categoría y destino |
| `/experiences/[id]` | Detalle de una experiencia (100 páginas prerenderizadas con `generateStaticParams`) |
| `/favorites` | Experiencias marcadas como favoritas |
| `/profile` | Perfil simulado con el resumen de favoritos guardados |

## Búsqueda y filtros en la URL

La búsqueda y los filtros viven en los query params, así que cualquier vista se puede compartir:

```
/experiences?search=vela&category=adventure&destination=Croatia
```

- **`search`**: filtra por título con una regex case-insensitive (`new RegExp(term, "i")`). El término se escapa antes, para que caracteres como `(` o `?` no rompan la búsqueda.
- **`category`**: `adventure`, `culture`, `food`, `wellness` o `nature`.
- **`destination`**: país de destino (p. ej. `Croatia`, `Japan`).

Los tres filtros son independientes y se combinan entre sí. Al cargar la página con params, los inputs aparecen ya rellenos y los resultados ya filtrados. La búsqueda espera 300 ms sin teclear antes de actualizar la URL, para no llenar el historial con cada tecla. Pulsa `/` para enfocar la búsqueda.

## Estructura

```
src/
├── app/                      # Rutas (App Router)
├── components/               # Navbar, SearchBar, FilterBar, ExperienceCard, ExperienceGrid…
├── data/experiences.ts       # Dataset de 100 experiencias generado con IA
├── hooks/
│   ├── useFilters.ts         # Lee y escribe los filtros en la URL (useSearchParams + usePathname)
│   ├── useExperiences.ts     # Aplica los filtros al dataset
│   └── useFavorites.tsx      # Estado de favoritos (useState) compartido entre páginas
├── lib/experiences.ts        # Lógica de filtrado y utilidades
└── types/experience.ts       # interface Experience y tipos relacionados
```

### Favoritos

Los IDs favoritos se guardan en un `useState` dentro de `FavoritesProvider`, que envuelve la app en el layout raíz. En el App Router el layout no puede pasar props directamente a las páginas, así que cada página obtiene el estado con el custom hook `useFavorites()` y desde ahí lo pasa como props (`favoriteIds`, `onToggleFavorite`, `isFavorite`) a `ExperienceGrid` y `ExperienceCard`. No se usa ninguna librería de estado externa y, tal como pide la spec, los favoritos no persisten al recargar la página.

## Design References

- **[Airbnb Experiences](https://www.airbnb.com/s/experiences)**: tarjetas con imagen 4:3, corazón superpuesto en la esquina y metadatos compactos (valoración, duración y precio por persona).
- **[GetYourGuide](https://www.getyourguide.com/)**: hero con buscador y accesos directos por categoría y destino. Los filtros en forma de *chips* horizontales del explorador salen de aquí.
- **[Headout](https://www.headout.com/)**: página de detalle en dos columnas, con imagen grande a un lado y bloque de precio destacado junto a la acción principal.

La paleta (arena, verde azulado y coral) y la tipografía serif para titulares (Fraunces) buscan un tono editorial de viaje, más cálido que el de un e-commerce genérico.

## Stack

- Next.js 16 (App Router, Cache Components, Turbopack)
- React 19 y TypeScript
- Tailwind CSS 4
- Imágenes de ejemplo de [picsum.photos](https://picsum.photos)
