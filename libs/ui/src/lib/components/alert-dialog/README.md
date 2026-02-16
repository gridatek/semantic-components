# ScAlertDialog Components

A set of Angular components for creating accessible alert dialogs with shadcn/ui styling.

## Architecture

The components follow a dependency injection (DI) pattern where child components inject the parent `ScAlertDialogProvider` to access shared state. `ScAlertDialogProvider` owns all overlay lifecycle logic (CDK overlay, backdrop, focus trap). The `ScAlertDialogPortal` directive marks the lazy content template that gets portaled into the overlay.

```
ScAlertDialogProvider (root wrapper - manages open state + overlay lifecycle)
├── ScAlertDialogTrigger (button that opens dialog)
└── ng-template[scAlertDialogPortal] (lazy content, portaled to CDK overlay)
    └── ScAlertDialog (dialog panel with animations)
        ├── ScAlertDialogHeader
        │   ├── ScAlertDialogTitle
        │   └── ScAlertDialogDescription
        └── ScAlertDialogFooter
            ├── ScAlertDialogCancel
            └── ScAlertDialogAction
```

## Components

| Component                  | Selector                           | Description                                    |
| -------------------------- | ---------------------------------- | ---------------------------------------------- |
| `ScAlertDialogProvider`    | `div[sc-alert-dialog-provider]`    | Root wrapper, manages open state + overlay     |
| `ScAlertDialogTrigger`     | `button[sc-alert-dialog-trigger]`  | Button that opens the dialog                   |
| `ScAlertDialogPortal`      | `ng-template[scAlertDialogPortal]` | Directive marking lazy content for the overlay |
| `ScAlertDialog`            | `div[sc-alert-dialog]`             | Dialog panel with animations                   |
| `ScAlertDialogHeader`      | `div[sc-alert-dialog-header]`      | Header section container                       |
| `ScAlertDialogTitle`       | `h2[sc-alert-dialog-title]`        | Dialog title (aria-labelledby)                 |
| `ScAlertDialogDescription` | `p[sc-alert-dialog-description]`   | Dialog description (aria-describedby)          |
| `ScAlertDialogFooter`      | `div[sc-alert-dialog-footer]`      | Footer section for actions                     |
| `ScAlertDialogCancel`      | `button[sc-alert-dialog-cancel]`   | Cancel button (closes dialog)                  |
| `ScAlertDialogAction`      | `button[sc-alert-dialog-action]`   | Confirm/action button                          |

## Usage

### Basic Alert Dialog

```html
<div sc-alert-dialog-provider>
  <button sc-alert-dialog-trigger>Delete Account</button>
  <ng-template scAlertDialogPortal>
    <div sc-alert-dialog>
      <div sc-alert-dialog-header>
        <h2 sc-alert-dialog-title>Are you absolutely sure?</h2>
        <p sc-alert-dialog-description>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</p>
      </div>
      <div sc-alert-dialog-footer>
        <button sc-alert-dialog-cancel>Cancel</button>
        <button sc-alert-dialog-action>Continue</button>
      </div>
    </div>
  </ng-template>
</div>
```

### Destructive Action

```html
<div sc-alert-dialog-provider>
  <button sc-alert-dialog-trigger>Delete</button>
  <ng-template scAlertDialogPortal>
    <div sc-alert-dialog>
      <div sc-alert-dialog-header>
        <h2 sc-alert-dialog-title>Delete item?</h2>
        <p sc-alert-dialog-description>This action cannot be undone.</p>
      </div>
      <div sc-alert-dialog-footer>
        <button sc-alert-dialog-cancel>Cancel</button>
        <button sc-alert-dialog-action class="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</button>
      </div>
    </div>
  </ng-template>
</div>
```

### Controlled

```typescript
@Component({
  template: `
    <div sc-alert-dialog-provider [(open)]="isOpen">
      <button sc-alert-dialog-trigger>Open</button>
      <ng-template scAlertDialogPortal>
        <div sc-alert-dialog>
          <!-- content -->
        </div>
      </ng-template>
    </div>
  `,
})
export class MyComponent {
  isOpen = signal(false);
}
```

### Custom Action Handler

```typescript
@Component({
  template: `
    <div sc-alert-dialog-provider>
      <button sc-alert-dialog-trigger>Delete</button>
      <ng-template scAlertDialogPortal>
        <div sc-alert-dialog>
          <div sc-alert-dialog-header>
            <h2 sc-alert-dialog-title>Confirm deletion</h2>
            <p sc-alert-dialog-description>Are you sure?</p>
          </div>
          <div sc-alert-dialog-footer>
            <button sc-alert-dialog-cancel>Cancel</button>
            <button sc-alert-dialog-action (click)="onDelete()">Delete</button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
export class MyComponent {
  onDelete(): void {
    // Handle deletion - dialog closes automatically
    console.log('Item deleted');
  }
}
```

## Differences from Dialog

| Feature       | Dialog          | AlertDialog     |
| ------------- | --------------- | --------------- |
| Purpose       | General content | Confirmations   |
| Escape key    | Closes dialog   | Does NOT close  |
| Click outside | Closes dialog   | Does NOT close  |
| Role          | `dialog`        | `alertdialog`   |
| Buttons       | Any             | Cancel + Action |

## How It Works

### State Management

`ScAlertDialogProvider` uses a `model` signal for the `open` state:

```typescript
readonly open = model<boolean>(false);
```

Child components inject `ScAlertDialogProvider` to read or modify this state:

```typescript
// ScAlertDialogTrigger
openDialog(): void {
  this.alertDialogProvider.open.set(true);
}

// ScAlertDialogCancel
closeDialog(): void {
  this.alertDialogProvider.open.set(false);
}
```

### Overlay Management

`ScAlertDialogProvider` creates a CDK overlay and attaches/detaches the `scAlertDialogPortal` template based on state:

```typescript
effect(() => {
  if (this.overlayOpen()) {
    this.attachDialog();
  } else {
    this.detachDialog();
  }
});
```

The `scAlertDialogPortal` directive marks the `ng-template` whose content is lazily instantiated into the overlay only when the dialog opens.

### Animations

`ScAlertDialog` uses a three-state animation model:

| State    | Data Attribute | Description                                              |
| -------- | -------------- | -------------------------------------------------------- |
| `idle`   | `data-idle`    | Hidden (`opacity-0`), resting state                      |
| `open`   | `data-open`    | Entry animation (`fade-in`, `zoom-in`)                   |
| `closed` | `data-closed`  | Exit animation (`fade-out`, `zoom-out`) → back to `idle` |

The flow is: `idle` → `open` → `closed` → `idle`

On `animationend`, the `closed` state resets to `idle`, which triggers overlay cleanup via `onDialogAnimationComplete()`.

## Accessibility

- `role="alertdialog"` on `ScAlertDialog`
- `aria-modal="true"` for modal behavior
- `aria-labelledby` linked to `ScAlertDialogTitle`
- `aria-describedby` linked to `ScAlertDialogDescription`
- `aria-haspopup="alertdialog"` on the trigger
- `aria-expanded` reflects open state on trigger
- Escape key does NOT close (user must choose an action)
- Click outside does NOT close (user must choose an action)
- Focus trapped within the dialog

## Customization

All components accept a `class` input for custom styling:

```html
<div sc-alert-dialog class="max-w-md">
  <!-- narrower dialog -->
</div>

<button sc-alert-dialog-action class="bg-destructive">Delete</button>
```
