# Toast Components

A succinct message that is displayed temporarily to provide feedback.

## Architecture

Unlike other components that use template-based triggers, Toast uses a **service-based architecture**:

```
ScToaster (Injectable)
    │
    └── show(config) ──► Creates ToastData ──► Updates signal ──► ScToastStack renders
                                                                       │
                                                                       ├── ScToast (container)
                                                                       │     ├── ScToastTitle
                                                                       │     ├── ScToastDescription
                                                                       │     ├── ScToastAction
                                                                       │     └── ScToastClose
                                                                       │
                                                                       └── [Multiple toasts stack]
```

## Components

| Component            | Selector                  | Description                                                  |
| -------------------- | ------------------------- | ------------------------------------------------------------ |
| `ScToastStack`       | `<sc-toast-stack>`        | Container that renders all active toasts. Place once in app. |
| `ScToast`            | `div[sc-toast]`           | Individual toast wrapper with variant styling                |
| `ScToastTitle`       | `[sc-toast-title]`        | Toast title text                                             |
| `ScToastDescription` | `[sc-toast-description]`  | Toast description text                                       |
| `ScToastAction`      | `button[sc-toast-action]` | Action button inside toast                                   |
| `ScToastClose`       | `button[sc-toast-close]`  | Close button to dismiss toast                                |

## Service

### ScToaster

```typescript
@Injectable({ providedIn: 'root' })
class ScToaster {
  // Signal containing all active toasts
  readonly toasts: Signal<ToastData[]>;

  // Show a new toast, returns toast ID
  show(config: ToastConfig): string;

  // Dismiss a specific toast by ID
  dismiss(id: string): void;

  // Dismiss all toasts
  dismissAll(): void;
}
```

### ToastConfig

```typescript
interface ToastConfig {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number; // Default: 5000ms. Set to 0 for no auto-dismiss
}
```

## Usage

### 1. Add ScToastStack to your app (once)

```html
<!-- In your app.component.html or layout -->
<sc-toast-stack />
```

### 2. Inject ScToaster and show toasts

```typescript
import { Component, inject } from '@angular/core';
import { ScToaster } from './ui/toast';

@Component({
  // ...
})
export class MyComponent {
  private readonly toast = inject(ScToaster);

  showSuccess(): void {
    this.toast.show({
      title: 'Success',
      description: 'Your changes have been saved.',
    });
  }

  showError(): void {
    this.toast.show({
      variant: 'destructive',
      title: 'Error',
      description: 'Something went wrong.',
    });
  }

  showWithAction(): void {
    this.toast.show({
      title: 'File uploaded',
      description: 'photo.jpg has been uploaded.',
      action: {
        label: 'View',
        onClick: () => this.router.navigate(['/files']),
      },
    });
  }
}
```

## Variants

| Variant       | Description                         |
| ------------- | ----------------------------------- |
| `default`     | Standard toast with neutral styling |
| `destructive` | Red styling for errors or warnings  |

## Features

- **Auto-dismiss**: Toasts auto-dismiss after 5 seconds by default
- **Custom duration**: Set `duration` in config (0 = no auto-dismiss)
- **Stacking**: Multiple toasts stack from bottom on desktop, top on mobile
- **Actions**: Add action buttons that execute callbacks
- **Accessibility**: Uses `role="status"` and `aria-live="polite"`

## Accessibility

- Uses `role="status"` for screen reader announcements
- `aria-live="polite"` ensures toasts are announced without interrupting
- `aria-atomic="true"` ensures the entire toast is read
- Close button has `aria-label="Close"`

## Styling

Toasts use Tailwind CSS classes with shadcn/ui design tokens:

- Default variant: `border bg-background text-foreground`
- Destructive variant: `border-destructive bg-destructive text-destructive-foreground`

The toaster positions toasts:

- Mobile: Top of screen, stacking downward
- Desktop: Bottom-right, stacking upward
