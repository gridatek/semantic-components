# ScStackedLayout

A generic layout component that provides a stacked structure with slots for navbar, main content, and footer.

## Structure

```
┌───────────────────────────────────────────────┐
│ scStackedLayout (data-slot="stacked-layout")│
├───────────────────────────────────────────────┤
│              [scNavbar]                       │
├───────────────────────────────────────────────┤
│  <main data-slot="stacked-layout-content">    │
│         <router-outlet />                     │
│  </main>                                      │
├───────────────────────────────────────────────┤
│              [scFooter]                       │
└───────────────────────────────────────────────┘
```

## Usage

### Basic Usage

```typescript
import { ScStackedLayout } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-layout',
  imports: [ScStackedLayout, MyNavbar, MyFooter],
  template: `
    <scStackedLayout>
      <my-navbar scNavbar />
      <my-footer scFooter />
    </sc-stacked-layout>
  `,
})
export class AppLayout {}
```

### With Routes

Configure your routes to use the layout as a parent:

```typescript
const routes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      { path: '', loadComponent: () => import('./pages/home') },
      { path: 'about', loadComponent: () => import('./pages/about') },
    ],
  },
];
```

## Content Projection

| Attribute  | Description                               |
| ---------- | ----------------------------------------- |
| `scNavbar` | Projects content into the top navbar area |
| `scFooter` | Projects content into the footer area     |

## Data Slots

| Element | Slot                                 | Description              |
| ------- | ------------------------------------ | ------------------------ |
| Host    | `data-slot="stacked-layout"`         | The layout container     |
| Main    | `data-slot="stacked-layout-content"` | Main content with router |

## Inputs

| Input   | Type     | Default | Description                         |
| ------- | -------- | ------- | ----------------------------------- |
| `class` | `string` | `''`    | Additional CSS classes for the host |

## Styling

The layout applies the following default styles:

- `min-h-screen`: Minimum height of full viewport
- `flex flex-col`: Flexbox column layout
- `flex-1` on main: Main content expands to fill available space
