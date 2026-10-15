# Toast Components

A succinct message that is displayed temporarily to provide feedback.

## Architecture

You show toasts from code (`ScToaster.show(config)`) and write how a toast looks once, in your app: an `<ng-template scToastTemplate let-toast>` whose root is a `scToast` (variant styles, its place in the stack, swipe to dismiss), with the parts inside. The toaster renders it for each toast, in a stack it creates.

```
ScToaster.show({ title, description, variant, action })
    └── ScToastStack (created by the toaster; one polite live region; a column per position)
          └── your scToastTemplate, for each toast
                └── ScToast → ScToastIcon, ScToastTitle, ScToastDescription, ScToastAction, ScToastClose
```

## Parts

| Part                 | Selector                       | Does                                                                                                     |
| -------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `ScToastTemplate`    | `ng-template[scToastTemplate]` | How a toast looks — once, in your app; `let-toast` is the toast's data; `label` names the toasts' region |
| `ScToastIcon`        | `[scToastIcon]`                | Your icon (a spinner turns while `loading`)                                                              |
| `ScToastTitle`       | `[scToastTitle]`               | The title                                                                                                |
| `ScToastDescription` | `[scToastDescription]`         | The description                                                                                          |
| `ScToastAction`      | `button[scToastAction]`        | Runs the toast's `action`, then dismisses it: write `toast.action.label`                                 |
| `ScToastClose`       | `button[scToastClose]`         | Dismisses the toast: write its icon and name it                                                          |
| `ScToast`            | `div[scToast]`                 | The toast, your template's root: variant styles, its place in the stack, swipe to dismiss                |
| `ScToastStack`       | `sc-toast-stack`               | The stack — the toaster creates it in an overlay: don't place it yourself                                |

## Service

### ScToaster

```typescript
@Service()
class ScToaster {
  // The toasts shown
  readonly toasts: Signal<ScToastData[]>;

  // Show a new toast, returns its id
  show(config: ScToastConfig): string;
  // The same, with their variant
  success(config): string;
  info(config): string;
  warning(config): string;
  error(config): string;
  loading(config): string; // stays until updated or dismissed

  // Change a toast in place; its timer starts again
  update(id: string, config: ScToastConfig): void;

  // A loading toast while the promise runs, then a success or an error one. Returns the promise
  promise<T>(promise: Promise<T>, config: ScToastPromiseConfig<T>): Promise<T>;

  dismiss(id: string): void;
  dismissAll(): void;
}
```

### ScToastConfig

```typescript
interface ScToastConfig {
  // Where it shows; the toaster's `position` when left out
  position?: ScToastPosition;
  title?: string;
  description?: string;
  variant?: ScToastVariant;
  action?: {
    label: string;
    onClick: () => void;
  };
  // The toaster's `duration` when left out (a loading toast: 0). 0 for no auto-dismiss
  duration?: number;
}
```

## Config

The toaster's settings go in `provideScConfig`, the libraries' settings, under `toaster`. All are optional:

```typescript
// app.config.ts
providers: [
  provideScConfig({
    toaster: {
      position: 'bottom-end', // where toasts show when show() gives no position
      duration: 5000, // ms, when show() gives no duration; 0 keeps them
      visibleToasts: 3, // how many show, stacked
      maxToasts: 5, // how many are kept; the oldest goes past it
      expand: false, // always spread out, not stacked
      hotkey: ['altKey', 'KeyT'], // moves focus to the toasts (none by default)
    },
  }),
];
```

## Usage

### 1. Write how a toast looks (once, in your app)

```html
<!-- app.html -->
<router-outlet />

<ng-template scToastTemplate let-toast label="Notifications, Alt+T">
  <div scToast>
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
    <button scToastClose><svg siXIcon></svg><span class="sr-only">Close</span></button>
  </div>
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

### 3. Update a toast, or follow a promise

```typescript
const id = this.toaster.loading({ description: 'Uploading…' });
// later
this.toaster.update(id, { variant: 'success', description: 'Uploaded.' });

// or, the same in one call
this.toaster.promise(this.api.save(), {
  loading: { description: 'Saving…' },
  success: (result) => ({ description: `${result.name} saved.` }),
  error: { description: 'Could not save.' },
});
```

An update replaces the fields it gives and keeps the others; the timer starts again. A new variant without a `duration` takes that variant's own (a loading toast stays; the others take the toaster's `duration`).

## Variants

| Variant       | Looks                                     |
| ------------- | ----------------------------------------- |
| `default`     | The popover's colours                     |
| `success`     | As `default` — your icon tells them apart |
| `info`        | As `default`                              |
| `warning`     | As `default`                              |
| `error`       | Destructive text                          |
| `destructive` | Destructive text                          |
| `loading`     | As `default`; `scToastIcon` spins. Stays  |

## The stack

Toasts at one position stack, the newest in front and up to `visibleToasts` showing. Hovering or focusing them spreads them out (with `expand`, they always are), and pauses their timers — new ones there wait too — until the pointer and focus leave.

## Positions

`top-start`, `top-center`, `top-end`, `bottom-start`, `bottom-center`, `bottom-end` — start and end follow the text's direction (start is on the right in Arabic or Hebrew). Each toast shows at its own position, in a stack with the others there: showing one somewhere else leaves the rest where they are.

```ts
this.toaster.show({ position: 'top-center', description: 'Copied.' });
```

## Accessibility

- The stack is one stable polite live region (`aria-live="polite"`): each new toast is announced as it appears, without interrupting.
- **Timing:** a toast's timer pauses while its stack is hovered or focused, so it can be read and its action reached; `duration: 0` keeps it until dismissed.
- **Keyboard:** the toaster's `hotkey` (`KeyboardEvent` codes and modifiers, e.g. `['altKey', 'KeyT']`) moves focus to the toasts, and Escape moves it back. Write the keys in `label` — the region's name — so they can be found.
- The close and action buttons are yours: name the icon-only close button (`<span class="sr-only">Close</span>`) — in development, an unnamed one warns.
- Swiping a toast away dismisses it.

## Styling

Toasts follow shadcn's Sonner: `bg-popover text-popover-foreground`, a border and `rounded-2xl`. `error` and `destructive` add `text-destructive`.
