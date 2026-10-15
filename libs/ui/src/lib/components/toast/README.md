# Toast Components

A succinct message that is displayed temporarily to provide feedback.

## Architecture

You show toasts from code (`ScToaster.show(config)`) and write how a toast looks once, in your app: an `<ng-template scToastTemplate let-toast>` with the parts. The toaster puts each toast in its frame (`scToast`: variant styles, swipe to dismiss, pause on hover) in a stack it creates, and renders your template in it.

```
ScToaster.show({ title, description, variant, action })
    └── ScToastStack (created by the toaster; one polite live region)
          └── ScToast (each toast's frame)
                └── your scToastTemplate: ScToastIcon, ScToastTitle, ScToastDescription, ScToastAction, ScToastClose
```

## Parts

| Part                 | Selector                       | Does                                                                         |
| -------------------- | ------------------------------ | ---------------------------------------------------------------------------- |
| `ScToastTemplate`    | `ng-template[scToastTemplate]` | How a toast looks — once, in your app; `let-toast` is the toast's data       |
| `ScToastIcon`        | `[scToastIcon]`                | Your icon, coloured by the toast's variant (a spinner turns while `loading`) |
| `ScToastTitle`       | `[scToastTitle]`               | The title                                                                    |
| `ScToastDescription` | `[scToastDescription]`         | The description                                                              |
| `ScToastAction`      | `button[scToastAction]`        | Runs the toast's `action`, then dismisses it: write `toast.action.label`     |
| `ScToastClose`       | `button[scToastClose]`         | Dismisses the toast: write its icon and name it                              |
| `ScToast`            | `div[scToast]`                 | Each toast's frame (the stack renders it)                                    |
| `ScToastStack`       | `sc-toast-stack`               | The stack — the toaster creates it in an overlay: don't place it yourself    |

## Service

### ScToaster

```typescript
@Service()
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

### 1. Write how a toast looks (once, in your app)

```html
<!-- app.html -->
<router-outlet />

<ng-template scToastTemplate let-toast>
  @if (toast.variant === 'success') {
  <span scToastIcon><svg siCircleCheckIcon></svg></span>
  }
  <div class="grid gap-1">
    @if (toast.title) {
    <div scToastTitle>{{ toast.title }}</div>
    } @if (toast.description) {
    <div scToastDescription>{{ toast.description }}</div>
    }
  </div>
  @if (toast.action) {
  <button scToastAction>{{ toast.action.label }}</button>
  }
  <button scToastClose aria-label="Close"><svg siXIcon></svg></button>
</ng-template>
```

The library writes no text and no icon: they are yours, translated as you like. In development, showing a toast with no `scToastTemplate` warns.

### 2. Show toasts

```typescript
export class MyComponent {
  private readonly toaster = inject(ScToaster);

  save(): void {
    this.toaster.success({ description: 'Your changes have been saved.' });
  }

  upload(): void {
    this.toaster.show({
      title: 'File uploaded',
      description: 'photo.jpg has been uploaded.',
      action: { label: 'View', onClick: () => this.router.navigate(['/files']) },
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
- **Accessibility**: one polite live region announces each toast

## Accessibility

- The stack is one stable polite live region (`aria-live="polite"`): each new toast is announced as it appears, without interrupting.
- The close and action buttons are yours: name the icon-only close button (`aria-label`) — in development, an unnamed one warns.
- Hovering a toast pauses its timer; swiping it away dismisses it.

## Styling

Toasts use Tailwind CSS classes with shadcn/ui design tokens:

- Default variant: `border bg-background text-foreground`
- Destructive variant: `border-destructive bg-destructive text-destructive-foreground`

The toaster positions toasts:

- Mobile: Top of screen, stacking downward
- Desktop: Bottom-right, stacking upward
