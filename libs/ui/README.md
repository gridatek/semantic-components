# @semantic-components/ui

The Semantic Components library: components, layouts and utilities.

## Contents

- **Components**: Button, Link, Dialog, Sidebar, and many more
- **Layouts**: Auth layout, Sidebar layout, Stacked layout
- **Class merging**: the parts use shadcn's `cn` package (a peer); in your own classes, `import { cn } from 'cn'`
- **Presets**: the components' classes come from the app's preset
  (`provideSemanticComponents({ preset })`, from `@semantic-components/presets`;
  nova by default)

## Usage

```ts
import { ScButton, ScLink } from '@semantic-components/ui';
import { cn } from 'cn';
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
