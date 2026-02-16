# ScDialog Components

A set of Angular components for creating accessible modal dialogs with shadcn/ui styling.

## Architecture

The components follow a dependency injection (DI) pattern where child components inject the parent `ScDialogProvider` to access shared state. `ScDialogProvider` owns all overlay lifecycle logic (CDK overlay, backdrop, focus trap). The `ScDialogPortal` directive marks the lazy content template that gets portaled into the overlay.

```
ScDialogProvider (root wrapper - manages open state + overlay lifecycle)
├── ScDialogTrigger (button that opens dialog)
└── ng-template[scDialogPortal] (lazy content, portaled to CDK overlay)
    └── ScDialog (dialog container)
        ├── ScDialogClose (close button)
        ├── ScDialogHeader
        │   ├── ScDialogTitle
        │   └── ScDialogDescription
        ├── (user content)
        └── ScDialogFooter
```

## Components

| Component             | Selector                      | Description                                       |
| --------------------- | ----------------------------- | ------------------------------------------------- |
| `ScDialogProvider`    | `div[sc-dialog-provider]`     | Root wrapper, manages open state + overlay        |
| `ScDialogTrigger`     | `button[sc-dialog-trigger]`   | Button that opens the dialog                      |
| `ScDialogPortal`      | `ng-template[scDialogPortal]` | Directive marking lazy content for the overlay    |
| `ScDialog`            | `div[sc-dialog]`              | Dialog panel with animations                      |
| `ScDialogHeader`      | `div[sc-dialog-header]`       | Header section container                          |
| `ScDialogTitle`       | `h2[sc-dialog-title]`         | Dialog title (aria-labelledby)                    |
| `ScDialogDescription` | `p[sc-dialog-description]`    | Dialog description (aria-describedby)             |
| `ScDialogFooter`      | `div[sc-dialog-footer]`       | Footer section for actions                        |
| `ScDialogClose`       | `button[sc-dialog-close]`     | Close button (sets `type="button"` automatically) |

## Usage

### Basic Dialog

```html
<div sc-dialog-provider [(open)]="isOpen">
  <button sc-dialog-trigger>Open Dialog</button>
  <ng-template scDialogPortal>
    <div sc-dialog>
      <button sc-dialog-close>
        <svg><!-- X icon --></svg>
        <span class="sr-only">Close</span>
      </button>
      <div sc-dialog-header>
        <h2 sc-dialog-title>Dialog Title</h2>
        <p sc-dialog-description>Dialog description goes here.</p>
      </div>
      <!-- Your content -->
      <div sc-dialog-footer>
        <button>Cancel</button>
        <button>Save</button>
      </div>
    </div>
  </ng-template>
</div>
```

### Controlled Dialog

You can control the dialog state programmatically using the `open` model:

```typescript
@Component({
  template: `
    <div sc-dialog-provider [(open)]="isOpen">
      <button sc-dialog-trigger>Open</button>
      <ng-template scDialogPortal>
        <div sc-dialog>
          <!-- content -->
        </div>
      </ng-template>
    </div>
  `,
})
export class MyComponent {
  isOpen = signal(false);

  openDialog() {
    this.isOpen.set(true);
  }

  closeDialog() {
    this.isOpen.set(false);
  }
}
```

### Form Dialog

```html
<div sc-dialog-provider [(open)]="isOpen">
  <button sc-dialog-trigger>Edit Profile</button>
  <ng-template scDialogPortal>
    <form>
      <div sc-dialog>
        <button sc-dialog-close>
          <svg><!-- X icon --></svg>
        </button>
        <div sc-dialog-header>
          <h2 sc-dialog-title>Edit profile</h2>
          <p sc-dialog-description>Make changes to your profile here.</p>
        </div>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="name" class="text-right">Name</label>
            <input id="name" class="col-span-3" />
          </div>
        </div>
        <div sc-dialog-footer>
          <button type="submit">Save changes</button>
        </div>
      </div>
    </form>
  </ng-template>
</div>
```

## Keyboard Navigation

| Key      | Action                 |
| -------- | ---------------------- |
| `Escape` | Close dialog           |
| `Tab`    | Navigate within dialog |

## How It Works

### State Management

`ScDialogProvider` uses a `model` signal for the `open` state:

```typescript
readonly open = model<boolean>(false);
```

Child components inject `ScDialogProvider` to read or modify this state:

```typescript
// ScDialogTrigger
openDialog(): void {
  this.dialogProvider.open.set(true);
}

// ScDialogClose
closeDialog(): void {
  this.dialogProvider.open.set(false);
}
```

### Overlay Management

`ScDialogProvider` creates a CDK overlay and attaches/detaches the `scDialogPortal` template based on state:

```typescript
effect(() => {
  if (this.overlayOpen()) {
    this.attachDialog();
  } else {
    this.detachDialog();
  }
});
```

The `scDialogPortal` directive marks the `ng-template` whose content is lazily instantiated into the overlay only when the dialog opens.

### Animations

`ScDialog` uses a three-state animation model:

| State    | Data Attribute | Description                                              |
| -------- | -------------- | -------------------------------------------------------- |
| `idle`   | `data-idle`    | Hidden (`opacity-0`), resting state                      |
| `open`   | `data-open`    | Entry animation (`fade-in`, `zoom-in`)                   |
| `closed` | `data-closed`  | Exit animation (`fade-out`, `zoom-out`) → back to `idle` |

The flow is: `idle` → `open` → `closed` → `idle`

On `animationend`, the `closed` state resets to `idle`, which triggers overlay cleanup via `onDialogAnimationComplete()`.

## Accessibility

- `role="dialog"` on the content
- `aria-modal="true"` for modal behavior
- `aria-labelledby` linked to `ScDialogTitle`
- `aria-describedby` linked to `ScDialogDescription`
- `aria-haspopup="dialog"` on the trigger
- `aria-expanded` reflects open state on trigger
- Focus trapped within the dialog
- Escape key closes the dialog
- Click outside (backdrop) closes the dialog

## Customization

All components accept a `class` input for custom styling:

```html
<div sc-dialog class="max-w-2xl">
  <!-- wider dialog -->
</div>

<div sc-dialog-footer class="flex-row-reverse">
  <!-- reversed button order -->
</div>
```
