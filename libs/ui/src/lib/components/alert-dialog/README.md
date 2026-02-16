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
| `ScAlertDialogProvider`    | `div[scAlertDialogProvider]`    | Root wrapper, manages open state + overlay     |
| `ScAlertDialogTrigger`     | `button[scAlertDialogTrigger]`  | Button that opens the dialog                   |
| `ScAlertDialogPortal`      | `ng-template[scAlertDialogPortal]` | Directive marking lazy content for the overlay |
| `ScAlertDialog`            | `div[scAlertDialog]`             | Dialog panel with animations                   |
| `ScAlertDialogHeader`      | `div[scAlertDialogHeader]`      | Header section container                       |
| `ScAlertDialogTitle`       | `h2[scAlertDialogTitle]`        | Dialog title (aria-labelledby)                 |
| `ScAlertDialogDescription` | `p[scAlertDialogDescription]`   | Dialog description (aria-describedby)          |
| `ScAlertDialogFooter`      | `div[scAlertDialogFooter]`      | Footer section for actions                     |
| `ScAlertDialogCancel`      | `button[scAlertDialogCancel]`   | Cancel button (closes dialog)                  |
| `ScAlertDialogAction`      | `button[scAlertDialogAction]`   | Confirm/action button                          |

## Usage

### Basic Alert Dialog

```html
<div scAlertDialogProvider>
  <button scAlertDialogTrigger>Delete Account</button>
  <ng-template scAlertDialogPortal>
    <div scAlertDialog>
      <div scAlertDialogHeader>
        <h2 scAlertDialogTitle>Are you absolutely sure?</h2>
        <p scAlertDialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</p>
      </div>
      <div scAlertDialogFooter>
        <button scAlertDialogCancel>Cancel</button>
        <button scAlertDialogAction>Continue</button>
      </div>
    </div>
  </ng-template>
</div>
```

### Destructive Action

```html
<div scAlertDialogProvider>
  <button scAlertDialogTrigger>Delete</button>
  <ng-template scAlertDialogPortal>
    <div scAlertDialog>
      <div scAlertDialogHeader>
        <h2 scAlertDialogTitle>Delete item?</h2>
        <p scAlertDialogDescription>This action cannot be undone.</p>
      </div>
      <div scAlertDialogFooter>
        <button scAlertDialogCancel>Cancel</button>
        <button scAlertDialogAction class="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</button>
      </div>
    </div>
  </ng-template>
</div>
```

### Controlled

```typescript
@Component({
  template: `
    <div scAlertDialogProvider [(open)]="isOpen">
      <button scAlertDialogTrigger>Open</button>
      <ng-template scAlertDialogPortal>
        <div scAlertDialog>
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
    <div scAlertDialogProvider>
      <button scAlertDialogTrigger>Delete</button>
      <ng-template scAlertDialogPortal>
        <div scAlertDialog>
          <div scAlertDialogHeader>
            <h2 scAlertDialogTitle>Confirm deletion</h2>
            <p scAlertDialogDescription>Are you sure?</p>
          </div>
          <div scAlertDialogFooter>
            <button scAlertDialogCancel>Cancel</button>
            <button scAlertDialogAction (click)="onDelete()">Delete</button>
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
<div scAlertDialog class="max-w-md">
  <!-- narrower dialog -->
</div>

<button scAlertDialogAction class="bg-destructive">Delete</button>
```
