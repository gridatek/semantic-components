# Hover Card Components

For sighted users to preview content available behind a link.

## Architecture

```
ScHoverCardProvider (Root)
    ├── open: signal<boolean>
    ├── side: input ('top' | 'right' | 'bottom' | 'left')
    ├── align: input ('start' | 'center' | 'end')
    ├── openDelay: input (default: 700ms)
    └── closeDelay: input (default: 300ms)
         │
         ├── ScHoverCardTrigger
         │     ├── Injects ScHoverCardProvider
         │     ├── Uses CdkOverlayOrigin
         │     └── Handles hover/focus with delay
         │
         └── ScHoverCardPortal
               ├── Injects ScHoverCardProvider
               ├── Uses cdkConnectedOverlay
               └── Positions based on side/align
                    │
                    └── ScHoverCard
                          ├── Injects ScHoverCardProvider
                          ├── Content panel with styling
                          └── Handles hover to keep card open
```

## Components

| Component             | Selector                      | Description                                     |
| --------------------- | ----------------------------- | ----------------------------------------------- |
| `ScHoverCardProvider` | `div[sc-hover-card-provider]` | Root wrapper with state and configuration       |
| `ScHoverCardTrigger`  | `[sc-hover-card-trigger]`     | Element that triggers hover card on hover/focus |
| `ScHoverCardPortal`   | `div[sc-hover-card-portal]`   | CDK overlay positioning layer                   |
| `ScHoverCard`         | `div[sc-hover-card]`          | The card content displayed on hover             |

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
<div sc-hover-card-provider>
  <a sc-hover-card-trigger href="/profile">@username</a>
  <div sc-hover-card-portal>
    <div sc-hover-card>
      <div class="flex gap-4">
        <img src="avatar.jpg" class="size-12 rounded-full" />
        <div>
          <h4 class="font-semibold">@username</h4>
          <p class="text-sm text-muted-foreground">Software developer at Example Corp.</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

### With Custom Position

```html
<div sc-hover-card-provider side="right" align="start">
  <button sc-hover-card-trigger>Hover me</button>
  <div sc-hover-card-portal>
    <div sc-hover-card>Content appears to the right, aligned to the top</div>
  </div>
</div>
```

### With Custom Delays

```html
<div sc-hover-card-provider [openDelay]="500" [closeDelay]="200">
  <span sc-hover-card-trigger>Quick hover</span>
  <div sc-hover-card-portal>
    <div sc-hover-card>Shows faster, hides faster</div>
  </div>
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
