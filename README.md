# Semantic Components

A collection of accessible, customizable UI components for Angular applications.

## Features

### Modern Angular Architecture

- **Angular 21+** with standalone components (no NgModules)
- **Signals** for reactive state management
- **OnPush change detection** for optimal performance
- **TypeScript-first** with strict type safety

### Declarative

- **State-driven UI** - Control components through template bindings, not imperative methods
- **No .open() calls** - Use `[open]="signal()"` instead of `dialog.open()`
- **Template-based** - Everything lives in your templates, easy to see and understand
- **Reactive by default** - UI automatically updates with your state

### Composable

- **Specialized components** instead of one monolithic component with many inputs
- **Slot-based patterns** - Compose UIs by nesting components together
- **Maximum flexibility** - Build exactly what you need without prop drilling
- **Single responsibility** - Each component has one clear purpose

### Comprehensive Component Library

- **70+ production-ready components** including forms, navigation, data display, and feedback
- **Advanced components** like Data Tables, Charts, Rich Text Editor, Kanban Board, and more
- **Form components** with validation, field composition, and accessibility built-in

### Accessibility First

- **WCAG AA compliant** with full keyboard navigation
- **ARIA attributes** and semantic HTML
- **Focus management** and screen reader support
- **Color contrast** and responsive touch targets

### Modern Styling

- **Tailwind CSS 4** for utility-first styling
- **CSS custom properties** for easy theming
- **Dark mode support** built-in
- **Responsive design** with mobile-first approach

### Developer Experience

- **Comprehensive documentation** with live examples
- **Type-safe APIs** with input/output functions
- **Predictable patterns** across all components
- **Tree-shakeable** for optimal bundle sizes

## Development

This project uses [Nx](https://nx.dev) as the build system.

### Prerequisites

- Node.js
- npm or yarn

### Getting Started

```bash
# Install dependencies
npm install

# Run the showcase app
npx nx serve showcase

# Run tests
npx nx test

# Build the library
npx nx build
```

## License

MIT
