# Dashboard

An admin dashboard built with Semantic Components, complete: every screen of
[shadcndashboard](https://github.com/shadcndashboard/shadcndashboard)'s sidebar
— its free version's screens and data, and the screens it lists as Pro —
rebuilt in Angular with this repository's library. It sits outside
`apps/presets` on purpose: it isn't a preset's showcase, it's an app — a second
test, after Sera, that the library carries a real product.

```bash
npx nx serve dashboard   # http://localhost:4203
```

## Where it comes from

- **The free screens** (Modern dashboard, Table, Form, User Profile, Notes,
  Blog, Tickets, Icons, the sign-in screens): shadcndashboard's free version —
  its routes (`src/routes/Router.tsx`), its sidebar
  (`sidebar/sidebaritems.ts`), its data (`src/api/*`,
  `src/components/tables/*`, the dashboard's cards).
- **The Pro screens** (the other dashboards, AI, Calendar, Chats, Email,
  Contacts, Invoice, the Pro User Profile, Ecommerce, Kanban, Customers,
  Orders, the theme pages, form layouts, data tables, charts, widgets, the
  side-by-side sign-in): the reference's sidebar names them but its free
  repository has no code for them. They are **made here**, from their names
  and what such screens do, with our components — not copied from its paid
  version.
- **Images**: the reference's own (`src/assets/images`, MIT): blog, profile,
  products (made smaller here: 640 px, and 96 px thumbnails, for
  `NgOptimizedImage`), AI images, integration logos, card brands, file icons,
  kanban and sign-in pictures.
- **Not its CSS.** The look is the library's: the **nova** preset (shadcn's
  base-nova, the reference's own style), shadcn's **neutral** theme and
  **Geist**. The app writes layout classes, not looks.
- **License.** MIT; the footer credits shadcndashboard, as its README asks.

What differs from the reference, deliberately:

- **Fixed data.** The reference makes names and figures up at each load;
  here they're written out, so every load shows the same. Dates are ISO
  strings, read with `Temporal`.
- **No mock server.** The data lives in memory (singleton services: blog,
  notes, tickets, invoices, products, cart): what you add, edit or delete
  holds until the page reloads, and the screens that share data see each
  other's changes (an edited product in the shop, a saved invoice in the
  list).
- **UI Elements** are pages of the app (`/ui/button`…), not links to a docs
  site.
- **Icons**: `@semantic-icons/lucide-icons` instead of Iconify.

## Screens

**Dashboards**

| Route                   | Screen                                                                                             | Library parts                                                   |
| ----------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `/`                     | Modern: greeting, update banner, Sales Overview, Total Assets, KPIs, Projects & Orders             | `ui/charts`, Select, Frame, `ui/data-table`, Toast              |
| `/dashboards/analytics` | Visitors, page views, bounce, session; traffic (7/30/90 days), sources, top pages, countries       | Stat Card, Toggle Group, area and donut charts, Table, Progress |
| `/dashboards/ecommerce` | Revenue, orders, customers, conversion; revenue by month, yearly goal, recent orders, best sellers | Stat Card, bar chart, Progress (circle), Table, Item            |
| `/dashboards/saas-ai`   | MRR, accounts, churn, AI requests; MRR, plans, AI usage, new accounts, ask the assistant           | area and horizontal bar charts, Progress, Input Group           |
| `/dashboards/school`    | Students, teachers, classes, attendance; attendance by day, exams, top students, notices           | stacked bars, Item, Table, Timeline                             |
| `/dashboards/health`    | Heart rate, steps, sleep, calories; heart rate today, activity rings, appointments, medication     | line chart, Progress (circles), Item, Checkbox                  |

**Apps**

| Route                                                                                       | Screen                                                                                                                     | Library parts                                                                                   |
| ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `/apps/ai/chat`                                                                             | History, a conversation answered word by word (canned answers), stop, `?q=`                                                | Message, Bubble, Message Scroller, Input Group, Item                                            |
| `/apps/ai/image`                                                                            | Prompt, style, shape; four pictures after a wait; earlier sets; download                                                   | Select, Toggle Group, Skeleton, Spinner, `NgOptimizedImage`                                     |
| `/apps/calendar`                                                                            | Month, week, day; events added, edited, deleted                                                                            | Scheduler, Dialog, Native Select                                                                |
| `/apps/chats`                                                                               | Conversations (unread, search), a chat with files, the contact                                                             | Message, Bubble, Message Scroller, Avatar (badge), Item                                         |
| `/apps/email`                                                                               | Folders, search, the message; star, unread, delete, reply, compose                                                         | Toggle, Dialog, Signal Forms (`email`)                                                          |
| `/apps/contacts`                                                                            | List (all, favourites, online), the contact, add and edit                                                                  | Toggle Group, Toggle, Dialog, Item                                                              |
| `/apps/notes`, `/apps/blog/*`, `/apps/tickets*`                                             | The free apps (see the reference)                                                                                          | Item, Dialog, `ui/editor`, File Upload, Tags Input, Date Picker…                                |
| `/apps/invoice/list`, `detail/:id`, `create`, `edit/:id`                                    | Totals by status, search; the invoice as it prints, mark paid, print; one form with lines added and removed                | Stat Card, Toggle Group, Table (footer), Signal Forms (`applyEach`)                             |
| `/apps/user-profile/profile`, `followers`, `friends`, `gallery`                             | Header with tabs as links; about, photos, posts and likes; follow back; remove friend; albums and a viewer                 | Toggle, Avatar Group, Dialog, Toggle Group                                                      |
| `/apps/ecommerce/shop`, `detail/:id`, `list`, `checkout`, `add-product`, `edit-product/:id` | Filters (category, price, stock), sort, cart; options, quantity, reviews; bulk delete; checkout in steps; one product form | Slider, Checkbox, Number Field, Tabs, Stepper (linear, `stepControl`), Radio Group, File Upload |
| `/apps/kanban`                                                                              | Columns, tasks moved by drag or keyboard, added, deleted                                                                   | Kanban Board, Avatar Group, Dialog                                                              |
| `/apps/customers`, `/apps/orders`                                                           | Search, sort; orders by status, pages                                                                                      | `ui/data-table`, Stat Card, Toggle Group, Pagination                                            |

**Pages, forms, tables, charts, widgets**

| Route                                                                                                                                                         | Screen                                                                                                                                                             | Library parts                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| `/pages/tables`, `/pages/form`, `/pages/user-profile`                                                                                                         | The free pages                                                                                                                                                     | Table, Field, Dialog…                                                                        |
| `/pages/account-settings`                                                                                                                                     | Account, security (password, two-step, sessions), notifications, billing                                                                                           | Tabs, Switch, Field, Signal Forms (`validate`)                                               |
| `/pages/faq`                                                                                                                                                  | Questions by topic, searchable                                                                                                                                     | Accordion, Input Group                                                                       |
| `/pages/pricing`                                                                                                                                              | Monthly or yearly, three plans, a comparison                                                                                                                       | Switch, Card, Table                                                                          |
| `/pages/roles`                                                                                                                                                | Roles, the permission matrix, each member's role                                                                                                                   | Checkbox, Avatar Group, Native Select                                                        |
| `/pages/integrations`                                                                                                                                         | Services by category, connected with a switch                                                                                                                      | Switch, Toggle Group                                                                         |
| `/forms/layouts`, `validation`, `examples`, `repeater`, `wizard`                                                                                              | Stacked, side by side, in a row, with icons, in columns; every rule's message; contact, newsletter, feedback, card; rows added and removed; steps checked in order | Field (`responsive`), Field Errors, `FormRoot`, `submit`, `applyEach`, Stepper               |
| `/tables/basic`, `dense`, `sorting`, `filtering`, `pagination`, `row-selection`, `column-visibility`, `editable`, `sticky`, `drag-drop`, `empty`, `expanding` | TanStack tables, one feature each                                                                                                                                  | `ui/data-table` (sort, filters, pages, select, visibility, expand), CDK drag and drop, Empty |
| `/charts/line`, `area`, `bar`, `pie`, `radar`, `radial`                                                                                                       | Three or four of each kind                                                                                                                                         | `ui/charts`                                                                                  |
| `/widgets/cards`, `/widgets/charts`                                                                                                                           | Figure, profile, product, project cards; small charts and rings                                                                                                    | Stat Card, small charts, Progress (circle)                                                   |
| `/ui/:element`                                                                                                                                                | Button, Avatar, Badge, Tooltip, Input, Textarea, Switch, Tabs, Select, Checkbox, Accordion, Card, Radio Group, Date Picker                                         | each one                                                                                     |
| `/icons`                                                                                                                                                      | 66 icons, searchable                                                                                                                                               | Frame, Input Group                                                                           |
| `/auth/side/*`, `/auth/*`                                                                                                                                     | Login, register, forgot password, two steps — beside a picture or boxed; 404; maintenance                                                                          | Card, Field, Password Field, OTP Field, Empty                                                |

Every screen works within a visit (checked by hand and by a scripted run
through twenty actions: chat, image, calendar, chats, email, contacts, kanban
by keyboard, invoice, checkout, product edit, form validation, wizard,
repeater, table selection, filtering, page size, row moves, pricing, roles,
password check — with a clean console).

## Structure

```
src/app/
  app-routes.ts        the routes, by section (lazy screens)
  layout/              full layout (sidebar with folding groups, header,
                       footer), nav + its icons, blank and side layouts,
                       page header, header menus, toaster
  pages/               dashboards/, the theme pages, forms/, data-tables/,
                       charts/, widgets/, ui/, and the free pages
  apps/                ai, calendar, chats, email, contacts, notes, blog,
                       tickets, invoice, user-profile, ecommerce, kanban,
                       customers, orders — each with its store when shared
  auth/                login, register, forgot password, two steps, 404, maintenance
  data/                people, products, orders, staff, and the free data
  shared/              formatting (Temporal, Intl), stores, chart tooltip and
                       legend, status badges
  components/          what the library doesn't have (below)
```

## Components the library doesn't have

In `src/app/components`, for you to judge whether they belong in the library:

- **`app-live-dot`** (`live-dot.ts`): a small pulsing dot — something live or
  new. Decorative, still for reduced motion.
- **`input[appSwatch]`** (`swatch.ts`): a colour to choose, drawn as a dot —
  a native radio; the notes' colours. Could be a variant of `scRadio`.

And two app helpers that point at a library gap:

- **`app-chart-tooltip` / `app-chart-legend`** (`shared/chart-parts.ts`): the
  chart tooltip and legend written once (about fifteen lines of markup each
  in every chart otherwise). The library keeps them composable, which is
  right; a ready-made default (the common case: label, dot, name, value) would
  save every app this wrapper.
- **`app-sort-header`, `app-staff-cell`** (`pages/data-tables/table-parts.ts`):
  a sortable header's arrow switch, written once — the same in every sortable
  table.

## Gaps found in the library

1. **`scFieldSeparator` takes no text** ("Or continue with"): the sign-in
   screens build the line from two `scSeparator`s.
2. **`scEmptyTitle` can't be an `h1`**: a standalone 404 adds its own.
3. **No coloured input states** (warning, info, success): left out.
4. **A select's label goes inside it** (`scSelectLabel`); one beside it
   leaves the select unnamed, silently.
5. **Cards are `div` only**: a card that is a `section`, `article`, `li` or
   `form` needs a wrapper (met again and again in the new screens: posts,
   grid items, forms).
6. **Anchors with a button look** are `a[scLink]` with a `variant`; `scButton`
   on an `<a>` or a `<span>` matches nothing, silently.
7. **`checked` as a plain attribute** fails on `scCheckbox` / `scSwitch`
   (`<input scSwitch checked />`: "string is not assignable to boolean"):
   their `checked` input has no `booleanAttribute` transform.
8. **A core-only TanStack column can't be bound** to `scDataTableHeaderCell` /
   `scDataTableCell` (`[column]`): `ScDataTableCellColumn` has only optional
   members, so TypeScript's weak-type check refuses a column with none of them
   (TS2559). With any feature (sorting…) it passes.
9. **Field part names**: the parts are `scFieldContentWrapper` and `scLabel`;
   `scFieldContent` / `scFieldLabel` (shadcn's names) don't exist — easy to
   reach for.

Not the library's, but met on the way:

- The neutral theme's `--chart-1` is very light: a lone line or area in it is
  hard to see, so single series use `--chart-3` here.
- ESLint's template parser can't read a template built from constants
  (`template: \`…${TABLE}\``), though the compiler can: the tables are
  written out in full.
- Playwright's full-page screenshots show an opened sidebar group overlapping
  the links below it; in the real viewport it's right.

## Not done yet

- No e2e specs for this app (checked by a scripted run, above, and by hand).
- Dark mode, phone widths and RTL aren't reviewed screen by screen.
- Hidden (non-shadcn) components carry several screens — Scheduler, Kanban
  Board, Stepper, Stat Card, Timeline, Number Field — as they are today.
- The header's search is a field without results (as in the reference's free
  version).
- Adds 7 MB of images.
