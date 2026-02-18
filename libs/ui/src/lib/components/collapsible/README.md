# Collapsible Components

An interactive component which expands/collapses a panel. Built on top of `@angular/aria/accordion` for robust accessibility support.

## Architecture

```
ScCollapsible (Root - uses AccordionGroup)
    ├── disabled: boolean
    │
    ├── ScCollapsibleTrigger (uses AccordionTrigger)
    │     ├── panelId: string (links to panel)
    │     ├── expanded: boolean
    │     └── disabled: boolean
    │
    └── ScCollapsiblePanel (uses AccordionPanel)
          ├── panelId: string (links to trigger)
          │
          └── ng-template[scCollapsibleContent] (lazy content directive)
                └── sc-collapsible-body (animation wrapper)
                      └── [your content here]
```

## Components

| Component              | Selector                            | Description                                        |
| ---------------------- | ----------------------------------- | -------------------------------------------------- |
| `ScCollapsible`        | `[scCollapsible]`                   | Root wrapper using `AccordionGroup`                |
| `ScCollapsibleTrigger` | `[scCollapsibleTrigger]`            | Button to toggle panel using `AccordionTrigger`    |
| `ScCollapsiblePanel`   | `[scCollapsiblePanel]`              | Panel wrapper using `AccordionPanel`               |
| `ScCollapsibleContent` | `ng-template[scCollapsibleContent]` | Lazy content directive using `AccordionContent`    |
| `ScCollapsibleBody`    | `sc-collapsible-body`               | Animation wrapper with expand/collapse transitions |

## Inputs

### ScCollapsible

| Input      | Type      | Default | Description             |
| ---------- | --------- | ------- | ----------------------- |
| `disabled` | `boolean` | `false` | Disable the collapsible |

### ScCollapsibleTrigger

| Input      | Type      | Default      | Description                              |
| ---------- | --------- | ------------ | ---------------------------------------- |
| `panelId`  | `string`  | **required** | Links trigger to its corresponding panel |
| `expanded` | `boolean` | `false`      | Whether the panel is expanded            |
| `disabled` | `boolean` | `false`      | Whether the trigger is disabled          |

### ScCollapsiblePanel

| Input     | Type     | Default      | Description                              |
| --------- | -------- | ------------ | ---------------------------------------- |
| `panelId` | `string` | **required** | Links panel to its corresponding trigger |

## Usage

### Basic Collapsible

Use `panelId` to link the trigger to its corresponding panel. Wrap content in `ng-template[scCollapsibleContent]` with `sc-collapsible-body` for smooth animations.

```html
<div scCollapsible class="w-[350px] space-y-2">
  <div class="flex items-center justify-between">
    <h4 class="text-sm font-semibold">Can I use this?</h4>
    <button scCollapsibleTrigger panelId="faq-1">
      <svg><!-- chevron icon --></svg>
    </button>
  </div>
  <div scCollapsiblePanel panelId="faq-1">
    <ng-template scCollapsibleContent>
      <sc-collapsible-body>
        <p>Yes. It's free and open source.</p>
      </sc-collapsible-body>
    </ng-template>
  </div>
</div>
```

### Initially Open

```html
<div scCollapsible>
  <button scCollapsibleTrigger panelId="open-demo" [expanded]="true">Toggle</button>
  <div scCollapsiblePanel panelId="open-demo">
    <ng-template scCollapsibleContent>
      <sc-collapsible-body>This content is visible by default.</sc-collapsible-body>
    </ng-template>
  </div>
</div>
```

### Disabled

```html
<div scCollapsible [disabled]="true">
  <button scCollapsibleTrigger panelId="disabled-demo">Toggle (disabled)</button>
  <div scCollapsiblePanel panelId="disabled-demo">
    <ng-template scCollapsibleContent>
      <sc-collapsible-body>This cannot be toggled.</sc-collapsible-body>
    </ng-template>
  </div>
</div>
```

### Two-Way Binding

Bind to the `expanded` state of the trigger.

```typescript
@Component({
  template: `
    <div scCollapsible>
      <button scCollapsibleTrigger panelId="controlled" [(expanded)]="isOpen">Toggle</button>
      <div scCollapsiblePanel panelId="controlled">
        <ng-template scCollapsibleContent>
          <sc-collapsible-body>Content</sc-collapsible-body>
        </ng-template>
      </div>
    </div>
    <button (click)="isOpen.set(!isOpen())">External Toggle</button>
  `,
})
export class MyComponent {
  isOpen = signal(false);
}
```

### With Chevron Animation

```html
<div scCollapsible>
  <button scCollapsibleTrigger panelId="chevron-demo" #trigger="scCollapsibleTrigger" class="flex items-center gap-2">
    <span>Toggle</span>
    <svg class="size-4 transition-transform duration-200" [class.rotate-180]="trigger.expanded()">
      <path d="m6 9 6 6 6-6" />
    </svg>
  </button>
  <div scCollapsiblePanel panelId="chevron-demo">
    <ng-template scCollapsibleContent>
      <sc-collapsible-body>Content here</sc-collapsible-body>
    </ng-template>
  </div>
</div>
```

## Animations

The collapsible uses Angular's animation system through the `ScCollapsibleBody` component:

- **Opening**: When a panel expands, Angular applies the `animate-collapsible-down` class via `animate.enter` on the body element
- **Closing**: When a panel collapses, Angular applies the `animate-collapsible-up` class via `animate.leave` on the body element
- **Height Calculation**: The component automatically sets the `--radix-collapsible-content-height` CSS variable to the actual content height, ensuring smooth animations
- **Timing**: Angular handles all animation timing and cleanup automatically

The animations are defined in the `tw-animate-css` package and create a smooth slide-down/slide-up effect. The `overflow-hidden` class on the body wrapper ensures content is properly clipped during the transition.

## Data Attributes

| Attribute    | Values           | Description   |
| ------------ | ---------------- | ------------- |
| `data-state` | `open`, `closed` | Current state |

You can use these for CSS styling:

```css
[data-state='open'] {
  /* styles when open */
}

[data-state='closed'] {
  /* styles when closed */
}
```

## Accessibility

Built on `@angular/aria/accordion`, providing:

- Trigger button has `aria-expanded` indicating open state
- Trigger button has `aria-controls` pointing to its panel
- Panel has `role="region"` and `aria-labelledby` pointing to its trigger
- `data-state` attribute on trigger and panel (`open` / `closed`)
- Disabled state is properly communicated via `disabled` attribute

## Customization

All components accept a `class` input for custom styling:

```html
<div scCollapsible class="border rounded-lg p-4">
  <!-- styled container -->
</div>

<div scCollapsiblePanel panelId="styled">
  <ng-template scCollapsibleContent>
    <sc-collapsible-body class="px-4">
      <!-- content with custom padding -->
    </sc-collapsible-body>
  </ng-template>
</div>
```
