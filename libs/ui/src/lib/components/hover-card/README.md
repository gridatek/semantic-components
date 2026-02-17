# Hover Card

For sighted users to preview content available behind a link.

## Architecture

```
ScHoverCardProvider (Root)
    ├── open: signal<boolean>
    ├── side: input ('top' | 'right' | 'bottom' | 'left')
    ├── align: input ('start' | 'center' | 'end')
    ├── openDelay: input (default: 700ms)
    ├── closeDelay: input (default: 300ms)
    ├── CDK overlay positioning (via cdkConnectedOverlay)
    │
    ├── ScHoverCardTrigger
    │     ├── Injects ScHoverCardProvider
    │     ├── Uses CdkOverlayOrigin
    │     └── Handles hover/focus with delay
    │
    └── ScHoverCardPortal (ng-template directive)
          ├── Captures TemplateRef
          └── Rendered by provider via ngTemplateOutlet
               │
               └── ScHoverCard
                     ├── Injects ScHoverCardProvider
                     ├── Content panel with styling
                     └── Handles hover to keep card open
```

## Components

| Component             | Selector                         | Description                                     |
| --------------------- | -------------------------------- | ----------------------------------------------- |
| `ScHoverCardProvider` | `div[scHoverCardProvider]`    | Root wrapper with state, configuration, overlay |
| `ScHoverCardTrigger`  | `[scHoverCardTrigger]`        | Element that triggers hover card on hover/focus |
| `ScHoverCardPortal`   | `ng-template[scHoverCardPortal]` | Template directive for portal content           |
| `ScHoverCard`         | `div[scHoverCard]`             | The card content displayed on hover             |

## Inputs

### ScHoverCardProvider

| Input        | Type                                     | Default    | Description                 |
| ------------ | ---------------------------------------- | ---------- | --------------------------- |
| `side`       | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | Which side to show the card |
| `align`      | `'start' \| 'center' \| 'end'`           | `'center'` | Alignment along the side    |
| `openDelay`  | `number`                                 | `700`      | Delay before showing (ms)   |
| `closeDelay` | `number`                                 | `300`      | Delay before hiding (ms)    |

## Usage

```html
<div scHoverCardProvider>
  <a scHoverCardTrigger href="/profile">@username</a>
  <ng-template scHoverCardPortal>
    <div scHoverCard>
      <div class="flex gap-4">
        <img src="avatar.jpg" class="size-12 rounded-full" />
        <div>
          <h4 class="font-semibold">@username</h4>
          <p class="text-sm text-muted-foreground">Software developer at Example Corp.</p>
        </div>
      </div>
    </div>
  </ng-template>
</div>
```

### With Custom Position

```html
<div scHoverCardProvider side="right" align="start">
  <button scHoverCardTrigger>Hover me</button>
  <ng-template scHoverCardPortal>
    <div scHoverCard>Content appears to the right, aligned to the top</div>
  </ng-template>
</div>
```

### With Custom Delays

```html
<div scHoverCardProvider [openDelay]="500" [closeDelay]="200">
  <span scHoverCardTrigger>Quick hover</span>
  <ng-template scHoverCardPortal>
    <div scHoverCard>Shows faster, hides faster</div>
  </ng-template>
</div>
```

## Position Combinations

The component supports 12 position combinations:

| Side     | Align Options            |
| -------- | ------------------------ |
| `top`    | `start`, `center`, `end` |
| `bottom` | `start`, `center`, `end` |
| `left`   | `start`, `center`, `end` |
| `right`  | `start`, `center`, `end` |

## Animation

The hover card uses `data-open` and `data-closed` boolean attributes for animations, and `data-side` for directional slide-in:

| Attribute     | When                           | Animation                         |
| ------------- | ------------------------------ | --------------------------------- |
| `data-open`   | Card is visible                | fade-in, zoom-in, slide-in (side) |
| `data-closed` | Card is closing                | fade-out, zoom-out                |
| `data-side`   | Always (top/right/bottom/left) | Controls slide-in direction       |

The overlay stays open during the close animation and is removed after `animationend` fires.

## Differences from Tooltip

| Feature     | Hover Card                   | Tooltip          |
| ----------- | ---------------------------- | ---------------- |
| Content     | Rich content (cards, images) | Simple text      |
| Styling     | Card with border/shadow      | Solid background |
| Open delay  | 700ms (longer)               | 200ms (shorter)  |
| Close delay | 300ms (has delay)            | 0ms (instant)    |
| Width       | 256px default                | Auto             |

## Accessibility

- Content remains visible when hovering over the card itself
- Supports focus trigger for keyboard users
- Uses connected overlay for proper positioning
- Close delay allows mouse movement to the card
