# ScSheet Components

A set of Angular components for creating accessible side panels (drawers) with shadcn/ui styling.

## Architecture

The components follow a dependency injection (DI) pattern where child components inject the parent `ScSheetProvider` to access shared state. `ScSheetProvider` owns all overlay lifecycle logic (CDK overlay, backdrop, focus trap). The `ScSheetPortal` directive marks the lazy content template that gets portaled into the overlay.

```
ScSheetProvider (root wrapper - manages open state, side + overlay lifecycle)
├── ScSheetTrigger (button that opens sheet)
└── ng-template[scSheetPortal] (lazy content, portaled to CDK overlay)
    └── ScSheet (dialog panel with slide animations)
        ├── ScSheetClose (close button)
        ├── ScSheetHeader
        │   ├── ScSheetTitle
        │   └── ScSheetDescription
        ├── (user content)
        └── ScSheetFooter
```

## Components

| Component            | Selector                     | Description                                    |
| -------------------- | ---------------------------- | ---------------------------------------------- |
| `ScSheetProvider`    | `div[sc-sheet-provider]`     | Root wrapper, manages open state + overlay     |
| `ScSheetTrigger`     | `button[sc-sheet-trigger]`   | Button that opens the sheet                    |
| `ScSheetPortal`      | `ng-template[scSheetPortal]` | Directive marking lazy content for the overlay |
| `ScSheet`            | `div[sc-sheet]`              | Dialog panel with slide animations             |
| `ScSheetHeader`      | `div[sc-sheet-header]`       | Header section container                       |
| `ScSheetTitle`       | `h2[sc-sheet-title]`         | Sheet title (aria-labelledby)                  |
| `ScSheetDescription` | `p[sc-sheet-description]`    | Sheet description (aria-describedby)           |
| `ScSheetFooter`      | `div[sc-sheet-footer]`       | Footer section for actions                     |
| `ScSheetClose`       | `button[sc-sheet-close]`     | Button that closes the sheet                   |

## Usage

### Basic Sheet (Right Side)

```html
<div sc-sheet-provider>
  <button sc-sheet-trigger>Open Sheet</button>
  <ng-template scSheetPortal>
    <div sc-sheet>
      <button sc-sheet-close>
        <svg><!-- X icon --></svg>
        <span class="sr-only">Close</span>
      </button>
      <div sc-sheet-header>
        <h2 sc-sheet-title>Sheet Title</h2>
        <p sc-sheet-description>Sheet description goes here.</p>
      </div>
      <!-- Your content -->
      <div sc-sheet-footer>
        <button>Cancel</button>
        <button>Save</button>
      </div>
    </div>
  </ng-template>
</div>
```

### Different Sides

```html
<!-- Left side -->
<div sc-sheet-provider side="left">
  <button sc-sheet-trigger>Open Left</button>
  <ng-template scSheetPortal>
    <div sc-sheet>
      <!-- content -->
    </div>
  </ng-template>
</div>

<!-- Top side -->
<div sc-sheet-provider side="top">
  <button sc-sheet-trigger>Open Top</button>
  <ng-template scSheetPortal>
    <div sc-sheet>
      <!-- content -->
    </div>
  </ng-template>
</div>

<!-- Bottom side -->
<div sc-sheet-provider side="bottom">
  <button sc-sheet-trigger>Open Bottom</button>
  <ng-template scSheetPortal>
    <div sc-sheet>
      <!-- content -->
    </div>
  </ng-template>
</div>
```

### Controlled Sheet

```typescript
@Component({
  template: `
    <div sc-sheet-provider [(open)]="isOpen" side="right">
      <button sc-sheet-trigger>Open</button>
      <ng-template scSheetPortal>
        <div sc-sheet>
          <!-- content -->
        </div>
      </ng-template>
    </div>
  `,
})
export class MyComponent {
  isOpen = signal(false);

  openSheet() {
    this.isOpen.set(true);
  }

  closeSheet() {
    this.isOpen.set(false);
  }
}
```

### Navigation Sheet

```html
<div sc-sheet-provider side="left">
  <button sc-sheet-trigger>Menu</button>
  <ng-template scSheetPortal>
    <div sc-sheet>
      <button sc-sheet-close>X</button>
      <div sc-sheet-header>
        <h2 sc-sheet-title>Navigation</h2>
      </div>
      <nav class="flex flex-col gap-2">
        <a href="#">Home</a>
        <a href="#">Products</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>
    </div>
  </ng-template>
</div>
```

## Keyboard Navigation

| Key      | Action                |
| -------- | --------------------- |
| `Escape` | Close sheet           |
| `Tab`    | Navigate within sheet |

## Side Options

| Side     | Description                    |
| -------- | ------------------------------ |
| `right`  | Slides in from right (default) |
| `left`   | Slides in from left            |
| `top`    | Slides down from top           |
| `bottom` | Slides up from bottom          |

## How It Works

### State Management

`ScSheetProvider` uses a `model` signal for the `open` state and an `input` for the `side`:

```typescript
readonly side = input<SheetSide>('right');
readonly open = model<boolean>(false);
```

Child components inject `ScSheetProvider` to read or modify this state:

```typescript
// ScSheetTrigger
openSheet(): void {
  this.sheetProvider.open.set(true);
}

// ScSheetClose
closeSheet(): void {
  this.sheetProvider.open.set(false);
}
```

### Overlay Management

`ScSheetProvider` creates a CDK overlay and attaches/detaches the `scSheetPortal` template based on state:

```typescript
effect(() => {
  if (this.overlayOpen()) {
    this.attachSheet();
  } else {
    this.detachSheet();
  }
});
```

The `scSheetPortal` directive marks the `ng-template` whose content is lazily instantiated into the overlay only when the sheet opens.

### Slide Animations

`ScSheet` applies different transform classes based on the side and open state:

```typescript
const sideClosedClasses: Record<SheetSide, string> = {
  top: '-translate-y-full',
  right: 'translate-x-full',
  bottom: 'translate-y-full',
  left: '-translate-x-full',
};

const sideOpenClasses: Record<SheetSide, string> = {
  top: 'translate-y-0',
  right: 'translate-x-0',
  bottom: 'translate-y-0',
  left: 'translate-x-0',
};
```

## Accessibility

- `role="dialog"` on `ScSheet`
- `aria-modal="true"` for modal behavior
- `aria-labelledby` linked to `ScSheetTitle`
- `aria-describedby` linked to `ScSheetDescription`
- `aria-haspopup="dialog"` on the trigger
- `aria-expanded` reflects open state on trigger
- Focus trapped within the sheet via `cdkTrapFocus`
- Escape key closes the sheet (via CDK overlay keydown events)
- Click outside (backdrop) closes the sheet (via CDK overlay backdrop click)

## Customization

All components accept a `class` input for custom styling:

```html
<div sc-sheet class="w-[400px]">
  <!-- custom width -->
</div>

<div sc-sheet-footer class="flex-row-reverse">
  <!-- reversed button order -->
</div>
```
