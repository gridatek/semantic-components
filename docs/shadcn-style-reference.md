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

| What you want                                      | Path                                            |
| -------------------------------------------------- | ----------------------------------------------- |
| **Styles** (class declarations)                    | `apps/v4/registry/styles/style-<theme>.css`     |
| Component source (structure, slots, variant names) | `apps/v4/registry/bases/base/ui/*.tsx`          |
| Usage examples / demos                             | `apps/v4/examples/base/*.tsx`                   |
| Theme list and metadata                            | `apps/v4/registry/styles.tsx`                   |
| Defaults                                           | `apps/v4/registry/config.ts` (`DEFAULT_CONFIG`) |

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

Known deliberate divergences — do **not** "fix" these to match upstream:

- **`--destructive`** is darkened to `oklch(0.52 0.245 27.325)` (shadcn ships
  `0.577`) so that the `bg-destructive/10 text-destructive` pairing clears the
  4.5:1 WCAG AA contrast minimum.
- **RTL** — we use logical properties (`border-e`, `ms-*`, `pe-*`, `text-start`)
  where upstream uses physical ones in places.
- **Decomposition** — upstream ships one file per component; we split into
  composable directives, so one shadcn class often maps to several of our
  directives.

See also [component-design-principles.md](component-design-principles.md) and
[data-slot-pattern.md](data-slot-pattern.md).
