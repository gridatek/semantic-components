# Toast Components

A succinct message that is displayed temporarily. shadcn's Toast (Base UI's) in the look of the app's preset (the `toast` key): only its corners change between styles.

## Architecture

You show toasts from code (`ScToaster.show(config)`) and write how a toast looks once, in your app: an `<ng-template scToastTemplate let-toast>` whose root is a `scToast` (variant styles, its place in the stack, swipe to dismiss), with the parts inside. The toaster renders it for each toast, in a stack it creates.

```
ScToaster.show({ title, description, variant, action })
    └── ScToastStack (created by the toaster; one polite live region; a column per position)
          └── your scToastTemplate, for each toast
                └── ScToast → ScToastIcon, ScToastTitle, ScToastDescription, ScToastAction, ScToastClose
```

## Parts

| Part                 | Selector                       | Does                                                                                                                                                  |
| -------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScToastTemplate`    | `ng-template[scToastTemplate]` | How a toast looks — once, in your app; `let-toast` is the toast's data; `label` names the toasts' region                                              |
| `ScToastIcon`        | `[scToastIcon]`                | Your icon: red for an `error`; a spinner turns while `loading`                                                                                        |
| `ScToastTitle`       | `[scToastTitle]`               | The title                                                                                                                                             |
| `ScToastDescription` | `[scToastDescription]`         | The description, muted                                                                                                                                |
| `ScToastAction`      | `button[scToastAction]`        | Runs the toast's `action`, then dismisses it: the preset's button, `variant` / `size` (outline, sm). Write `toast.action.label`                       |
| `ScToastClose`       | `button[scToastClose]`         | Dismisses the toast: the preset's button, `variant` / `size` (ghost, icon-sm), at the end of the row, muted until hovered. Write its icon and name it |
| `ScToast`            | `div[scToast]`                 | The toast, your template's root: the preset's look, `data-variant`, its place in the stack, swipe to dismiss                                          |
| `ScToastStack`       | `div[scToastStack]`            | The stack — the toaster creates it in an overlay: don't place it yourself                                                                             |

## Service

### ScToaster

```typescript
@Service()
class ScToaster {
  // The toasts shown
  readonly toasts: Signal<ScToastData[]>;

  // Show a new toast, returns its id
  show(config: ScToastConfig): string;

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

The toaster's settings go in `provideSemanticComponents`, the libraries' settings, under `toaster`. All are optional:

```typescript
// app.config.ts
providers: [
  provideSemanticComponents({
    toaster: {
      position: 'bottom-end', // where toasts show when show() gives no position
      duration: 5000, // ms, when show() gives no duration; 0 keeps them
      visibleToasts: 3, // how many show, stacked
      maxToasts: 5, // how many are kept; the oldest goes past it
      layout: 'stacked', // or 'list': always spread out
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
    <div class="flex min-w-0 flex-1 flex-col gap-1">
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
    this.toaster.show({ variant: 'success', description: 'Your changes have been saved.' });
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
const id = this.toaster.show({ variant: 'loading', description: 'Uploading…' });
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

| Variant   | Looks                                    |
| --------- | ---------------------------------------- |
| `default` | The popover's colours                    |
| `success` | As `default`; your icon tells it         |
| `info`    | As `default`; your icon tells it         |
| `warning` | As `default`; your icon tells it         |
| `error`   | As `default`; `scToastIcon` red          |
| `loading` | As `default`; `scToastIcon` spins. Stays |

## The stack

Toasts at one position stack, the newest in front and up to `visibleToasts` showing. Hovering or focusing them spreads them out (with `layout: 'list'`, they always are), and pauses their timers — new ones there wait too — until the pointer and focus leave.

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

shadcn's Toast: `border bg-popover text-popover-foreground shadow-lg`, its corners the preset's (`toast.toast`: `rounded-2xl`, `rounded-md` in mira, none in lyra and sera); the stack's focus ring takes them too (`toast.list`). A row (`p-4 gap-3`): your icon, the text column (`flex min-w-0 flex-1 flex-col gap-1`, yours), the action, the close. The stack as shadcn's: `max-w-sm` (the screen's width on a phone), each toast behind showing 12px and 10% smaller, 12px apart when spread out.

Not shadcn's: the six positions (shadcn's bottom end only), the `hotkey` (Base UI's F6), and the enter and leave animations (Angular's `animate.enter` / `animate.leave` with tw-animate).
