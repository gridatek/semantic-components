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
| `ScSheetProvider`    | `div[scSheetProvider]`     | Root wrapper, manages open state + overlay     |
| `ScSheetTrigger`     | `button[scSheetTrigger]`   | Button that opens the sheet                    |
| `ScSheetPortal`      | `ng-template[scSheetPortal]` | Directive marking lazy content for the overlay |
| `ScSheet`            | `div[scSheet]`              | Dialog panel with slide animations             |
| `ScSheetHeader`      | `div[scSheetHeader]`       | Header section container                       |
| `ScSheetTitle`       | `h2[scSheetTitle]`         | Sheet title (aria-labelledby)                  |
| `ScSheetDescription` | `p[scSheetDescription]`    | Sheet description (aria-describedby)           |
| `ScSheetFooter`      | `div[scSheetFooter]`       | Footer section for actions                     |
| `ScSheetClose`       | `button[scSheetClose]`     | Button that closes the sheet                   |

## Usage

### Basic Sheet (Right Side)

```html
<div scSheetProvider>
  <button scSheetTrigger>Open Sheet</button>
  <ng-template scSheetPortal>
    <div scSheet>
      <button scSheetClose>
        <svg><!-- X icon --></svg>
        <span class="sr-only">Close</span>
      </button>
      <div scSheetHeader>
        <h2 scSheetTitle>Sheet Title</h2>
        <p scSheetDescription>Sheet description goes here.</p>
      </div>
      <!-- Your content -->
      <div scSheetFooter>
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
<div scSheetProvider side="left">
  <button scSheetTrigger>Open Left</button>
  <ng-template scSheetPortal>
    <div scSheet>
      <!-- content -->
    </div>
  </ng-template>
</div>

<!-- Top side -->
<div scSheetProvider side="top">
  <button scSheetTrigger>Open Top</button>
  <ng-template scSheetPortal>
    <div scSheet>
      <!-- content -->
    </div>
  </ng-template>
</div>

<!-- Bottom side -->
<div scSheetProvider side="bottom">
  <button scSheetTrigger>Open Bottom</button>
  <ng-template scSheetPortal>
    <div scSheet>
      <!-- content -->
    </div>
  </ng-template>
</div>
```

### Controlled Sheet

```typescript
@Component({
  template: `
    <div scSheetProvider [(open)]="isOpen" side="right">
      <button scSheetTrigger>Open</button>
      <ng-template scSheetPortal>
        <div scSheet>
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
<div scSheetProvider side="left">
  <button scSheetTrigger>Menu</button>
  <ng-template scSheetPortal>
    <div scSheet>
      <button scSheetClose>X</button>
      <div scSheetHeader>
        <h2 scSheetTitle>Navigation</h2>
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
<div scSheet class="w-[400px]">
  <!-- custom width -->
</div>

<div scSheetFooter class="flex-row-reverse">
  <!-- reversed button order -->
</div>
```
