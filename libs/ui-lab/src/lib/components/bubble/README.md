# Bubble

A single message in a conversation, aligned to either side and optionally
carrying reactions.

## Usage

```typescript
import { ScBubble, ScBubbleContent, ScBubbleGroup, ScBubbleReactions } from '@semantic-components/ui-lab';
```

```html
<div scBubbleGroup>
  <div scBubble variant="muted">
    <div scBubbleContent>Are we still on for tomorrow?</div>
  </div>
  <div scBubble align="end">
    <div scBubbleContent>Yes — 10am works.</div>
  </div>
</div>
```

## Components

All directives accept a `class` input for merging additional CSS classes via
the `cn` utility.

### ScBubble

| Property | Details                             |
| -------- | ----------------------------------- |
| Selector | `div[scBubble]`                     |
| Inputs   | `align`: `start` (default) \| `end` |
|          | `variant`: see below                |

`align="end"` pushes the bubble to the inline end, for the current user's own
messages. A bubble also follows `data-align` on a surrounding message.

Variants: `default`, `secondary`, `muted`, `tinted`, `outline`, `ghost`,
`destructive`. They style the content rather than the bubble itself, so the
alignment wrapper stays transparent. `ghost` drops the padding and background
entirely and allows full width.

### ScBubbleContent

| Property | Details                                                                 |
| -------- | ----------------------------------------------------------------------- |
| Selector | `div[scBubbleContent]`, `button[scBubbleContent]`, `a[scBubbleContent]` |

`button` and `a` are valid hosts, since a bubble is sometimes tappable. The
hover, focus-ring and transition rules only apply on those elements.

### ScBubbleReactions

| Property | Details                             |
| -------- | ----------------------------------- |
| Selector | `div[scBubbleReactions]`            |
| Inputs   | `side`: `top` \| `bottom` (default) |
|          | `align`: `start` (default) \| `end` |

Overlaps the bubble's edge. Leave room for it — the demo adds a bottom margin
to the bubble it hangs off.

### ScBubbleGroup

Stacks bubbles in a column.
