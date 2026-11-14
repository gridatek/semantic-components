# Sera

shadcn's Sera announcement, rebuilt with Semantic Components: the same pages, colours and fonts, our components. This is an app of screens — not the presets library (`libs/presets`), whose `sera` preset it uses.

- **Source**: shadcn-ui/ui, `apps/v4/app/(app)/(styles)/sera` (MIT): six screens on `base-sera` — Audience Analytics, Article Directory, Empty State, Edit Article, Media Library, Media Library Table.
- **Look**: the Sera preset (`app.config.ts`); shadcn's `taupe` theme, light and dark, square corners, and its fonts — Playfair Display for headings, Noto Sans for the text — in `styles.css` and `index.html`.
- **Charts**: the library's, as they are (Recharts' API).

```sh
npx nx serve sera   # http://localhost:4202
```

## Screens

`/` is shadcn's page: the header, then the six screens. Each also has its own route, full page — to compare with shadcn's and to take screenshots:

| Route                  | Screen              | Folder (`src/app/screens/`) |
| ---------------------- | ------------------- | --------------------------- |
| `/audience-analytics`  | Audience Analytics  | `audience-analytics/`       |
| `/article-directory`   | Article Directory   | `article-directory/`        |
| `/empty-state`         | Empty State         | `empty-state/`              |
| `/edit-article`        | Edit Article        | `edit-article/`             |
| `/media-library`       | Media Library       | `media-library/`            |
| `/media-library-table` | Media Library Table | `media-library-table/`      |

Each follows shadcn's file of the same name, with our parts. Where they differ, on purpose:

- **No dark mode**, as shadcn's screens (its theme switcher is commented out).
- **Dates with `Temporal`**, not `Date` and date-fns.
- **Pagination keeps its own state**: shadcn's three static pages are `totalItems` / `pageSize`; Previous is disabled on page 1.
- **One `h1` per screen**: Edit Article's article title is an `h2` (shadcn's is an `h1` under the page's `h1`).
- **Icon buttons named by an `sr-only` span**, not `aria-label`.
- **Lucide's newer names**: Funnel, Ellipsis, EllipsisVertical, CodeXml, TextAlignStart/Center/End.
- **The traffic chart's dashed line, dotted grid and marked point** are classes on our chart parts (no `strokeDasharray` or `ReferenceDot` input).
- **The size filter** is our Range Slider (two thumbs); our Slider has one.
