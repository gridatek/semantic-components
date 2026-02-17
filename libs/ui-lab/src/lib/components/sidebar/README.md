# Sidebar Component (scx)

A comprehensive sidebar component system for Angular applications with collapsible states, mobile responsiveness, keyboard shortcuts, and state persistence.

## Components

### Core Components

- `ScSidebarProvider` - Root provider component with state management
- `ScSidebar` - Main sidebar container
- `ScSidebarTrigger` - Toggle button
- `ScSidebarRail` - Resize handle for collapsing/expanding
- `ScSidebarInset` - Main content wrapper

### Layout Components

- `ScSidebarHeader` - Header section
- `ScSidebarFooter` - Footer section
- `ScSidebarContent` - Scrollable content area
- `ScSidebarSeparator` - Visual separator
- `ScSidebarInput` - Styled input for search

### Menu Components

- `ScSidebarMenu` - Menu list container (ul)
- `ScSidebarMenuItem` - Menu list item (li)
- `ScSidebarMenuButton` - Menu button/link (works with both button and a elements)
- `ScSidebarMenuAction` - Action button on menu items
- `ScSidebarMenuBadge` - Badge/counter display
- `ScSidebarMenuSkeleton` - Loading skeleton
- `ScSidebarMenuSub` - Submenu container (ul)
- `ScSidebarMenuSubItem` - Submenu item (li)
- `ScSidebarMenuSubButton` - Submenu button/link

### Group Components

- `ScSidebarGroup` - Group container
- `ScSidebarGroupLabel` - Group header/label
- `ScSidebarGroupAction` - Action button for groups
- `ScSidebarGroupContent` - Group content wrapper

## Features

- **Reactive State Management** - Built with Angular signals
- **Keyboard Shortcuts** - Cmd/Ctrl + B to toggle sidebar
- **LocalStorage Persistence** - State persists across page refreshes
- **Mobile Responsive** - Sheet drawer on mobile devices
- **Multiple Variants** - sidebar, floating, inset
- **Collapsible Modes** - offcanvas, icon, none
- **Two-way Binding** - Model support for open state
- **CSS Variables** - Customizable widths

## How It Works

The sidebar uses a clever layout technique to push content to the side instead of overlaying it:

```
┌─────────────────────────────────────────────────────────┐
│ ScSidebarProvider (flex container)                     │
│ ┌─────────────────────┬─────────────────────────────┐   │
│ │  ScSidebar         │  ScSidebarInset            │   │
│ │ ┌─────────────────┐ │  (main content)             │   │
│ │ │ Gap Div         │ │                             │   │
│ │ │ • Width: 16rem  │ │  <header>                   │   │
│ │ │ • No height     │ │    <button>Toggle</button>  │   │
│ │ │ • Pushes content│ │  </header>                  │   │
│ │ └─────────────────┘ │                             │   │
│ │                     │  <main>                     │   │
│ │ ┌─────────────────┐ │    Your content here        │   │
│ │ │ Fixed Container │ │                             │   │
│ │ │ (actual sidebar)│ │                             │   │
│ │ │ • Position fixed│ │                             │   │
│ │ │ • Overlays gap  │ │                             │   │
│ │ └─────────────────┘ │                             │   │
│ └─────────────────────┴─────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Key Concepts

1. **Gap Div** - An invisible spacer with width but no height that participates in the flex layout, creating space for the sidebar
2. **Fixed Container** - The actual sidebar content, positioned fixed to overlay the gap
3. **Flex Layout** - The provider uses flexbox, making the gap and content area sit side-by-side
4. **Responsive Collapse** - When collapsed, the gap width transitions to 0, allowing content to use full width

This architecture ensures smooth transitions and proper content flow without JavaScript layout calculations.

## Basic Usage

```typescript
import { ScSidebarProvider, ScSidebar, ScSidebarTrigger, ScSidebarHeader, ScSidebarContent, ScSidebarFooter, ScSidebarMenu, ScSidebarMenuItem, ScSidebarMenuButton, ScSidebarInset } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-layout',
  imports: [
    ScSidebarProvider,
    ScSidebar,
    // ... other imports
  ],
  template: `
    <div scSidebarProvider>
      <div scSidebar>
        <div scSidebarHeader>
          <h2>My App</h2>
        </div>

        <div scSidebarContent>
          <ul scSidebarMenu>
            <li scSidebarMenuItem>
              <a scSidebarMenuButton routerLink="/dashboard">Dashboard</a>
            </li>
          </ul>
        </div>

        <div scSidebarFooter>User Info</div>
      </div>

      <main scSidebarInset>
        <header>
          <button scSidebarTrigger>Toggle</button>
        </header>
        <router-outlet />
      </main>
    </div>
  `,
})
export class AppLayout {}
```

## Advanced Usage

### With Submenu

```html
<ul scSidebarMenu>
  <li scSidebarMenuItem>
    <a scSidebarMenuButton>Projects</a>
    <ul scSidebarMenuSub>
      <li scSidebarMenuSubItem>
        <a scSidebarMenuSubButton routerLink="/projects/1">Project 1</a>
      </li>
    </ul>
  </li>
</ul>
```

### With Groups

```html
<div scSidebarGroup>
  <div scSidebarGroupLabel>Navigation</div>
  <div scSidebarGroupContent>
    <ul scSidebarMenu>
      <!-- menu items -->
    </ul>
  </div>
</div>
```

### Variants

```html
<!-- Default sidebar -->
<div scSidebar variant="sidebar" collapsible="icon">
  <!-- Floating sidebar -->
  <div scSidebar variant="floating" collapsible="icon">
    <!-- Inset sidebar -->
    <div scSidebar variant="inset" collapsible="icon"></div>
  </div>
</div>
```

### Two-way Binding

```typescript
@Component({
  template: `
    <div scSidebarProvider [(open)]="sidebarOpen">
      <!-- sidebar content -->
    </div>
  `,
})
export class MyComponent {
  sidebarOpen = signal(true);
}
```

## Configuration

### CSS Variables

The sidebar uses CSS variables that can be customized:

```css
:root {
  --sidebar-width: 16rem;
  --sidebar-width-mobile: 18rem; /* Available but not currently used */
  --sidebar-width-icon: 3rem;
}
```

**Note:** The mobile sidebar currently uses the default width from the Sheet component. The `--sidebar-width-mobile` variable is available for future customization if needed.

### Props

#### ScSidebar

- `side` - 'left' | 'right' (default: 'left')
- `variant` - 'sidebar' | 'floating' | 'inset' (default: 'sidebar')
- `collapsible` - 'offcanvas' | 'icon' | 'none' (default: 'offcanvas')

#### ScSidebarMenuButton

- `size` - 'default' | 'sm' | 'lg' (default: 'default')
- `isActive` - boolean (default: false)
- `tooltip` - string (optional)

#### ScSidebarMenuSubButton

- `size` - 'sm' | 'md' (default: 'md')
- `isActive` - boolean (default: false)

## Keyboard Shortcuts

- `Cmd + B` (Mac) / `Ctrl + B` (Windows) - Toggle sidebar

## State Persistence

The sidebar state is automatically saved to `localStorage` (key: `sc-sidebar-state`). The state will be restored when the page is refreshed.

## Mobile Behavior

On screens smaller than 768px (md breakpoint), the sidebar automatically switches to a sheet drawer that slides in from the side using the `ScSheetProvider`, `ScSheetPortal`, and `ScSheet` components. The `ScSidebarTrigger` automatically handles mobile vs desktop toggle logic.

### Mobile Implementation Details

The mobile view uses the new ScSheet architecture with a provider pattern:

- `ScSheetProvider` manages the open state and side
- `ScSheetPortal` creates the overlay with backdrop
- `ScSheet` is the dialog panel with slide animations

**Mobile Width:** The mobile sidebar uses the default width provided by the Sheet component rather than a custom width. This ensures consistency with other sheet-based UI elements and provides a responsive width that adapts to different device sizes.

## Accessibility

- All interactive elements are keyboard accessible
- Proper ARIA attributes are applied
- Focus management is handled automatically
- Screen reader support included

## Demo

See a comprehensive demo at `/dashboard` in the blocks application.
