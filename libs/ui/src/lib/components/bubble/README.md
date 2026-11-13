# Bubble

A message's surface in a conversation: at the start or the end, in a variant,
with reactions. A message's avatar, name and time belong to Message, around it.

## Usage

```typescript
import { ScBubble, ScBubbleContent, ScBubbleGroup, ScBubbleReactions } from '@semantic-components/ui';
```

```html
<div scBubbleGroup>
  <div scBubble variant="muted">
    <div scBubbleContent>Are we still on for tomorrow?</div>
  </div>
  <div scBubble alignment="end">
    <div scBubbleContent>Yes — 10am works.</div>
    <div scBubbleReactions role="img" aria-label="Reaction: thumbs up">
      <span>👍</span>
    </div>
  </div>
</div>
```

## Components

The look is the app's preset's (`bubble` key: the content and the reactions,
shadcn's in each of the eight styles); the variants and positions are the same
in every style. All directives accept a `class` input for merging additional
CSS classes via the `cn` utility.

### ScBubble

| Property | Details                                                                                                                     |
| -------- | --------------------------------------------------------------------------------------------------------------------------- |
| Selector | `div[scBubble]`                                                                                                             |
| Inputs   | `variant`: `default` \| `secondary` \| `muted` \| `tinted` \| `outline` \| `ghost` \| `destructive`                         |
|          | `alignment`: `start` (default) \| `end` (logical: `start` is the reading start, flipped right to left; no `left` / `right`) |

`align="end"` pushes the bubble to the inline end, for your own messages. A
bubble also follows `data-align` on a surrounding message. It is at most 80%
wide; `ghost` drops the frame and takes the full width (assistant text).

The variants colour the content, so the bubble itself stays a transparent
alignment wrapper.

### ScBubbleContent

| Property | Details                                                                 |
| -------- | ----------------------------------------------------------------------- |
| Selector | `div[scBubbleContent]`, `button[scBubbleContent]`, `a[scBubbleContent]` |

On a `button` (given `type="button"`) or an `a`, the whole bubble is clickable,
named by its text, with a hover colour and a focus ring.

### ScBubbleReactions

| Property | Details                                                                                                                     |
| -------- | --------------------------------------------------------------------------------------------------------------------------- |
| Selector | `div[scBubbleReactions]`                                                                                                    |
| Inputs   | `side`: `bottom` (default) \| `top`                                                                                         |
|          | `alignment`: `end` (default) \| `start` (logical: `start` is the reading start, flipped right to left; no `left` / `right`) |

Overlaps the bubble's edge: leave room between rows (the demos use `gap-12`).
A row of emoji is one image — `role="img"` and an `aria-label` ("Reactions:
thumbs up, fire, and 8 more"). Buttons in it (a `scButton`, a tooltip or popover
trigger): name each.

### ScBubbleGroup

| Property | Details              |
| -------- | -------------------- |
| Selector | `div[scBubbleGroup]` |

Consecutive bubbles from the same sender, closer together. `alignment` goes on each
bubble.
