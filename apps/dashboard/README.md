# Dashboard

An admin dashboard built with Semantic Components: the screens and data of
[shadcndashboard](https://github.com/shadcndashboard/shadcndashboard) (MIT,
React + shadcn/ui on Base UI), rebuilt in Angular with this repository's
library. It sits outside `apps/presets` on purpose: it isn't a preset's
showcase, it's an app — a second test, after Sera, that the library carries a
real product.

```bash
npx nx serve dashboard   # http://localhost:4203
```

## Where it comes from

- **Screens, texts and data**: shadcndashboard's free version — its routes
  (`src/routes/Router.tsx`), its sidebar (`sidebar/sidebaritems.ts`), its data
  (`src/api/*`, `src/components/tables/*`, the dashboard's cards). The blog's
  and profile's images are its own (`public/images`).
- **Not its CSS.** The look is the library's: the **nova** preset
  (shadcn's base-nova, the reference's own style), shadcn's **neutral** theme
  (as the showcase's) and **Geist** (the reference's font). The app writes
  layout classes, not looks.
- **License.** MIT; the footer credits shadcndashboard, as its README asks.

What differs from the reference, deliberately:

- **Fixed data.** The reference makes names and figures up at each load
  (chance, lodash); here they're written out, so every load shows the same.
  Dates are ISO strings, read with `Temporal`.
- **No mock server.** The reference serves its data through MSW; here the
  data lives in memory (`shared/stores.ts`, singleton services): what you add,
  edit or delete holds until the page reloads.
- **Icons**: a set from `@semantic-icons/lucide-icons` instead of Iconify.
- **Auth**: the "boxed" variant of each screen (the reference also lists
  side-by-side ones in its pro version).
- **One style.** The reference can switch to shadcn's Lyra; this app runs on
  nova only (the library's presets could make that a choice later).

## Screens

| Route                                                     | Screen                                                                                             | Library parts it leans on                                                                                       |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `/`                                                       | Modern dashboard: greeting, update banner, Sales Overview, Total Assets, 3 KPIs, Projects & Orders | `ui/charts` (two lines, tooltip, legend), Select, Card, Badge, Frame, `ui/data-table` (sorting), Toast          |
| `/pages/tables`                                           | Basic, hover, striped and checkbox tables; a data table (search, sort, pages)                      | Table, Checkbox (select all, indeterminate), `ui/data-table` (global filter, sort, pagination), Pagination      |
| `/pages/form`                                             | Every kind of input                                                                                | Field, Input, Select, Password Field, Textarea, Input Group, File Upload, Checkbox, Radio Group, Switch         |
| `/pages/user-profile`                                     | Profile header, personal information and address, each edited in a dialog                          | Avatar, Link (button looks), Dialog, Signal Forms (`required`, `email`)                                         |
| `/apps/notes`                                             | Notes: list + search, the chosen note edited, its colour, add in a dialog                          | Item (`button`, `aria-pressed`), Input Group, Textarea, Dialog, Empty, the app's Swatch                         |
| `/apps/tickets`, `/apps/tickets/create`                   | Counts by status (they filter), search, list with delete; create form                              | Item, Table, Badge, Avatar, Select, Signal Forms                                                                |
| `/apps/blog/post`                                         | Blog listing: featured posts, then the grid                                                        | Card, Badge, Avatar, `NgOptimizedImage`                                                                         |
| `/apps/blog/detail/:slug`                                 | The post, its comments and replies, a comment box                                                  | `ui/editor` (`scEditorView`), Separator, Empty                                                                  |
| `/apps/blog/create`, `/apps/blog/edit/:id`                | One form for both: title, excerpt, the text, cover, status, featured, category, tags, date         | `ui/editor` (toolbar of commands), File Upload, Radio Group, Switch, Select, Tags Input, Date Picker + Calendar |
| `/apps/blog/manage-blog`                                  | Every post: search, sort, pages; view, edit, delete                                                | `ui/data-table`, Pagination, Link                                                                               |
| `/icons`                                                  | 66 icons, searchable                                                                               | Frame, Input Group                                                                                              |
| `/auth/login`, `register`, `forgot-password`, `two-steps` | Sign-in screens                                                                                    | Card, Field, Password Field, Checkbox, OTP Field, Separator                                                     |
| `/auth/404`, `/auth/maintenance`                          | Error and maintenance pages (any unknown URL lands on 404)                                         | Empty                                                                                                           |

Every screen works within a visit: notes, tickets and posts are added, edited
and deleted; filters, searches, sorting, pages, the chart's period, the theme
(light / dark / system, saved) and the dialogs all act.

## Structure

```
src/app/
  app-routes.ts        the routes (lazy screens)
  layout/              full layout (sidebar, header, footer), blank layout,
                       page header (title + breadcrumb), header menus, toaster
  pages/               dashboard, tables, form, user profile, icons
  apps/                blog, notes, tickets
  auth/                login, register, forgot password, two steps, 404, maintenance
  data/                the reference's data, written out
  shared/              formatting (Temporal, Intl), the in-memory stores
  components/          what the library doesn't have (below)
```

## Components the library doesn't have

In `src/app/components`, for you to judge whether they belong in the library:

- **`app-live-dot`** (`live-dot.ts`): a small pulsing dot — something live or
  new (the dashboard's "Update" banner). Decorative (`aria-hidden`), still for
  reduced motion.
- **`input[appSwatch]`** (`swatch.ts`): a colour to choose, drawn as a dot —
  a native radio, so a group with one `name` gets arrow keys for free; named by
  `aria-label`. The notes' colours. In the library it could be a variant of
  `scRadio` (which draws its own dot) or a Swatch Group part.

## Gaps found in the library

Things the app had to work around — candidates for the library:

1. **`scFieldSeparator` takes no text.** shadcn's FieldSeparator can hold
   "Or continue with" in its middle; ours draws the line only. The sign-in
   screens build the "or" line from two `scSeparator`s.
2. **`scEmptyTitle` can't be an `h1`** (h2–h6 only, by design: an empty state
   inside a page). On a standalone page — the 404, the maintenance page — the
   empty state _is_ the page, so the app adds its own `h1` (the "404", a
   visually hidden one for maintenance).
3. **No coloured input states.** The reference's Form page shows warning,
   info and success inputs; the library has the invalid state only (Signal
   Forms' errors). Left out here.
4. **A select's label goes inside it** (`scSelectLabel`): a `<label scLabel>`
   beside `scSelect` in a `scField` leaves the select unnamed (found while
   testing: the combobox had no name). Worth a dev warning, or `scField`
   naming a select as it names an input.
5. **Cards are `div` only** (`div[scCard]`): a card that is a `section`,
   `article` or `form` needs a wrapper.
6. **Anchors with a button look** are `a[scLink]` with a `variant` (no
   `scButton` on an `<a>`) — fine, but easy to get wrong; worth a line in the
   Button docs.

## Not done yet

- No e2e specs for this app (it was checked by hand: every route rendered with
  a clean console, and the main actions run through end to end).
- Dark mode, phone widths and RTL aren't reviewed screen by screen yet.
- Avatars use plain `img` (`scAvatarImage`), not `NgOptimizedImage`; the
  blog's covers do use it.
- The header's search is a field without results (as in the reference's free
  version).
