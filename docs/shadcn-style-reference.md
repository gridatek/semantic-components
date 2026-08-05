# Finding shadcn Styles

How to locate the upstream shadcn/ui styles so you can compare them against our
components in `libs/ui`.

Verified against `shadcn-ui/ui@main` on 2026-08-01.

## The one thing to know first

**The styles are not in the `.tsx` files anymore.** shadcn moved them into theme
stylesheets. The component file only maps a variant name to a CSS class:

```tsx
// registry/bases/base/ui/button.tsx
const buttonVariants = cva('cn-button group/button inline-flex shrink-0 …', {
  variants: {
    variant: {
      default: 'cn-button-variant-default',
      outline: 'cn-button-variant-outline',
      // …
    },
  },
});
```

The actual declarations live in the theme CSS:

```css
/* registry/styles/style-nova.css */
.cn-button-variant-default {
  @apply bg-primary text-primary-foreground hover:bg-primary/80;
}
```

So when comparing our styling to shadcn's, **read the CSS file**. Reading the
`.tsx` will only tell you the variant/slot structure.

## Where things live

All paths are under `https://github.com/shadcn-ui/ui/tree/main/`.

| What you want                                      | Path                                                      |
| -------------------------------------------------- | --------------------------------------------------------- |
| **Styles** (class declarations)                    | `apps/v4/registry/styles/style-<theme>.css`               |
| Component source (structure, slots, variant names) | `apps/v4/registry/bases/base/ui/*.tsx`                    |
| Usage examples / demos                             | `apps/v4/examples/base/*.tsx`                             |
| Theme list and metadata                            | `apps/v4/registry/styles.tsx`                             |
| Defaults                                           | `apps/v4/registry/config.ts` (`DEFAULT_CONFIG`)           |
| **RTL mapping table**                              | `packages/shadcn/src/utils/transformers/transform-rtl.ts` |

> Historical note: the path `apps/v4/examples/base/ui` no longer exists. If you
> find it referenced anywhere, it is stale.

### The three bases

`registry/bases/` contains three parallel implementations, differing only in the
headless primitive library they wrap:

| Base    | Primitives                 | Files |
| ------- | -------------------------- | ----- |
| `base`  | Base UI (`@base-ui/react`) | 62    |
| `radix` | Radix UI                   | 61    |
| `aria`  | React Aria                 | 58    |

**Use `base`.** It is what `DEFAULT_CONFIG.base` points to and what shadcn treats
as canonical. They share the same `cn-*` class names, so the theme CSS applies to
all three — the base choice does not affect styling.

## Which theme is the default

**`nova`.** Confirmed in `apps/v4/registry/config.ts`:

```ts
export const DEFAULT_CONFIG: DesignSystemConfig = {
  base: 'base',
  style: 'nova',
  baseColor: 'neutral',
  theme: 'neutral',
  iconLibrary: 'lucide',
  radius: 'default', // 0.625rem
  // …
};
```

So the file to diff against is **`apps/v4/registry/styles/style-nova.css`**.

Beware a trap: `registry/styles.tsx` lists `vega` first and describes it as
"Clean, neutral, and familiar", which reads like the default. It is not — it is
just first in the picker. `DEFAULT_CONFIG.style` is the authority.

The full set (8 themes, ~70KB each):

| Theme                                  | Description                                   |
| -------------------------------------- | --------------------------------------------- |
| `vega`                                 | Clean, neutral, and familiar                  |
| **`nova`**                             | **Reduced padding and margins — the default** |
| `maia`                                 | Rounded, with generous spacing                |
| `lyra`, `mira`, `luma`, `sera`, `rhea` | Further variations                            |

They differ in real spacing and radius values, so make sure you are diffing
against `nova` and not whichever file you opened first.

## The styles you are reading are LTR-first

This is the second thing that trips people up. `style-nova.css` is full of
**physical** properties — 49 uses of `pr-*`/`pl-*`/`mr-*`/`ml-*`, against 2
logical ones, and not a single `[dir=rtl]` or `:dir()` anywhere.

That does **not** mean shadcn ignores RTL. RTL is a **build-time transform**, not
something expressed in the CSS. The registry build generates a parallel
`styles/<style>/ui-rtl/` tree by running every component through
`transformDirection()`, which rewrites physical classes to logical ones. The RTL
demos import from that tree:

```tsx
// examples/base/badge-rtl.tsx
import { Badge } from '@/styles/base-nova/ui-rtl/badge';
```

**That tree is gitignored** — `apps/v4/styles/` contains only a README on GitHub.
You cannot fetch the RTL output; you have to apply the mapping yourself (or
generate it with `pnpm --filter=v4 registry:build --style all` in a clone).

The same transform ships to consumers as `shadcn migrate rtl`.

### Consequence for comparing

**Apply the mapping before you diff, or every logical class in our code will look
like a divergence when it is actually the correct transformed form.** Our
`pe-2`/`ps-2` is exactly what `transformDirection` produces from upstream's
`pr-2`/`pl-2` — same style, further along the pipeline.

The table in `transform-rtl.ts` is the authority. Direct replacements:

```
-ml- → -ms-      pl-  → ps-      left-  → start-    rounded-l- → rounded-s-
-mr- → -me-      pr-  → pe-      right- → end-      rounded-tl- → rounded-ss-
ml-  → ms-       text-left  → text-start     border-l- → border-s-
mr-  → me-       text-right → text-end       border-r- → border-e-
scroll-pl- → scroll-ps-    float-left  → float-start    origin-left → origin-start
```

Four rules are not simple renames, and are the easiest to miss:

| Case              | Rule                                                  |
| ----------------- | ----------------------------------------------------- |
| `translate-x-*`   | add an `rtl:` variant with the sign flipped           |
| `space-x-*`       | add `rtl:space-x-reverse` (likewise `divide-x-*`)     |
| `cn-rtl-flip`     | marker class → becomes `rtl:rotate-180`               |
| `cursor-w-resize` | add `rtl:` variant with the value swapped (`w` ↔ `e`) |

`cn-rtl-flip` is worth calling out: it is how upstream flips **directional
icons** — chevrons and arrows in pagination, carousel and breadcrumb. Grep
upstream for it to find every icon that must rotate in RTL.

### What must stay physical

The mapping is not universal. Four groups in this repo keep physical
properties on purpose, and converting them is a regression, not a fix.

**1. Centring: `left-1/2` paired with `-translate-x-1/2`.** This is the one that
looks most like an oversight. `translate-x` has no logical form — it does not
flip — so changing only the inset moves the element off-centre in RTL:

```
left-1/2  -translate-x-1/2   ✅ centred in both directions
start-1/2 -translate-x-1/2   ❌ off-centre in RTL
```

Upstream's transform handles this by adding an `rtl:` variant with the sign
flipped, rather than by touching the inset. If you convert the inset, you must
do both. Affects tooltip, radio, the resizable handle and toast-stack's centre
positions.

**2. Explicitly physical APIs.** Where a component takes a side or position by
name — `side="left"`, `direction="left"`, `'top-right'` — the caller means
literally left. Its border or offset must sit on the matching physical edge, so
a logical property puts it on the wrong side in RTL. Affects drawer, sheet,
sidebar and toast-stack.

**3. Spatial widgets.** Image cropper, image compare, image annotator and
org-chart. Handle offsets pair with physical resize cursors (`w-resize`,
`sw-resize`), and mirroring a crop box or a diagram is wrong regardless of
writing direction. Flipping the position without the cursor is worse than
leaving both.

**4. Anything an overlay is coupled to.** The media progress fills are absolutely
positioned over a slider. Flipping the overlay without confirming the slider's
own thumb math would desync them.

The general test: ask whether the edge is _the trailing one_ (flip it) or _a
specific physical side_ (leave it). Close buttons, badges and indicators are the
former; a `side="left"` drawer is the latter.

## Fetching a file

Use `gh api` — the `contents` endpoint returns base64:

```bash
gh api repos/shadcn-ui/ui/contents/apps/v4/registry/styles/style-nova.css \
  --jq '.content' | base64 -d > nova.css
```

Same pattern for a component:

```bash
gh api repos/shadcn-ui/ui/contents/apps/v4/registry/bases/base/ui/button.tsx \
  --jq '.content' | base64 -d
```

Listing a directory:

```bash
gh api repos/shadcn-ui/ui/contents/apps/v4/registry/bases/base/ui --jq '.[].name'
```

## Navigating the CSS

The whole file is one scope block, `.style-nova { … }`, with 58 component
sections delimited by `MARK` comments:

```css
.style-nova {
  /* MARK: Accordion */
  .cn-accordion-item {
    @apply not-last:border-b;
  }
  …
  /* MARK: Button */
  .cn-button {
    @apply …;
  }
}
```

Jump to a component:

```bash
grep -n "MARK:" nova.css              # table of contents
grep -n "cn-button" nova.css          # every button-related class
sed -n '148,210p' nova.css            # read the Button section
```

Class naming is predictable: `cn-<component>`,
`cn-<component>-variant-<name>`, `cn-<component>-size-<name>`, and
`cn-<component>-<slot>`.

## Comparing against our components

Our styles are inline `cn()` strings in the component `.ts` files, not a
stylesheet, so the comparison is per-class rather than file-to-file. For a given
component: pull the `cn-*` block out of `nova.css`, then read the matching
`libs/ui/src/lib/components/<name>/*.ts`.

**Logical properties are not a divergence.** We write `pe-*`, `ms-*`,
`border-e`, `text-start` inline, which is the _output_ of upstream's RTL
transform. Run the mapping in the section above over the shadcn class before
concluding anything differs. Where our code still uses a physical property, that
is a bug, not a style choice — the repo is RTL-first by policy.

Known deliberate divergences — do **not** "fix" these to match upstream:

- **`--destructive`** is darkened to `oklch(0.52 0.245 27.325)` (shadcn ships
  `0.577`) so that the `bg-destructive/10 text-destructive` pairing clears the
  4.5:1 WCAG AA contrast minimum.
- **Decomposition** — upstream ships one file per component; we split into
  composable directives, so one shadcn class often maps to several of our
  directives.

See also [component-design-principles.md](component-design-principles.md) and
[data-slot-pattern.md](data-slot-pattern.md).
