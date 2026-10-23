# @semantic-components/ui

The Semantic Components library: components, layouts, utilities, and `cn()`.

## Contents

- **Components**: Button, Link, Dialog, Sidebar, and many more
- **Layouts**: Auth layout, Sidebar layout, Stacked layout
- **Utils**: `cn()` (Tailwind class merging via `clsx` + `tailwind-merge`)
- **Presets**: the components' classes come from the app's preset
  (`provideScConfig({ preset })`, from `@semantic-components/preset-styles`;
  nova by default)

## Usage

```ts
import { ScButton, ScLink, cn } from '@semantic-components/ui';
```

## Entry points

The components built on another library have their own entry point, and that
library is an optional peer: install it only for the entry point you use.

| Entry point                                | Needs                     |
| ------------------------------------------ | ------------------------- |
| `@semantic-components/ui/animated-counter` | `motion`                  |
| `@semantic-components/ui/carousel`         | `embla-carousel`          |
| `@semantic-components/ui/confetti`         | `canvas-confetti`         |
| `@semantic-components/ui/data-table`       | `@tanstack/angular-table` |
| `@semantic-components/ui/pdf-viewer`       | `pdfjs-dist`              |
| `@semantic-components/ui/phone-input`      | `libphonenumber-js`       |
| `@semantic-components/ui/qr-code`          | `uqr`                     |
