# Message

A row in a conversation: an avatar beside a column of bubbles, with an
optional header and footer. In the look of the app's preset (`message` key:
shadcn's in each of the eight styles).

Pairs with [Bubble](../bubble/README.md) — a bubble reads the message's
alignment and pushes itself to the matching side.

## Usage

```typescript
import { ScMessage, ScMessageAvatar, ScMessageContent, ScMessageGroup, ScMessageHeader } from '@semantic-components/ui';
```

```html
<div scMessageGroup>
  <div scMessage>
    <div scMessageAvatar>
      <span scAvatar><span scAvatarFallback>AR</span></span>
    </div>
    <div scMessageContent>
      <div scMessageHeader>Ada</div>
      <div scBubble variant="muted">
        <div scBubbleContent>The build is green again.</div>
      </div>
    </div>
  </div>
</div>
```

## Components

All directives accept a `class` input for merging additional CSS classes via
the `cn` utility.

### ScMessage

| Property | Details                                                                                                                     |
| -------- | --------------------------------------------------------------------------------------------------------------------------- |
| Selector | `div[scMessage]`                                                                                                            |
| Inputs   | `alignment`: `start` (default) \| `end` (logical: `start` is the reading start, flipped right to left; no `left` / `right`) |

`align="end"` reverses the row so the avatar sits on the inline end. It is
published as `data-align`, which `ScBubble` and `ScMessageContent` both read —
the bubbles in an end-aligned message align themselves without being told
individually.

### ScMessageAvatar

Sits at the bottom of the row. Lifts itself when the message has a footer, so
it stays level with the last bubble rather than the timestamp.

### ScMessageContent

The column of bubbles.

### ScMessageHeader and ScMessageFooter

Small muted lines above and below the bubbles — a sender name, a timestamp, a
delivery state. Both drop their horizontal padding when the message contains a
`ghost` bubble, so the text lines up with the unpadded content. On your own
messages (`align="end"`) the footer — a status, your actions — sits at the end.

Actions are your `scButton`s in the footer, each named in sr-only text. A message
in progress: a Marker with `role="status"`.

### ScMessageGroup

Stacks messages in a column.
