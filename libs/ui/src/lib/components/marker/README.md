# Marker

A note between messages — a status, a labeled divider, an action. In the look
of the app's preset (`marker` key: shadcn's in each of the eight styles).

## Usage

```typescript
import { ScMarker, ScMarkerContent, ScMarkerIcon } from '@semantic-components/ui';
```

```html
<div scMarker>
  <span scMarkerIcon><svg siInfoIcon></svg></span>
  <span scMarkerContent>Draft saved a moment ago</span>
</div>
```

## Components

All directives accept a `class` input for merging additional CSS classes via
the `cn` utility.

### ScMarker

| Property | Details                                         |
| -------- | ----------------------------------------------- |
| Selector | `div[scMarker], a[scMarker], button[scMarker]`  |
| Inputs   | `variant`: `default` \| `separator` \| `border` |

On a link or a button it does what it says, named by its content: a link is
underlined, both take the foreground colour on hover, a button gets
`type="button"`. Streaming or in progress ("Thinking…"): `role="status"`, so
it is announced as it appears. A labeled divider needs no role — not
`role="separator"`, which is named by `aria-label` and leaves its text unread.

| Variant     | Rendering                                                    |
| ----------- | ------------------------------------------------------------ |
| `default`   | Plain inline row.                                            |
| `separator` | Centres the content between two horizontal rules.            |
| `border`    | Adds a bottom border, for separating a section that follows. |

### ScMarkerIcon

| Property        | Details                                      |
| --------------- | -------------------------------------------- |
| Selector        | `span[scMarkerIcon]`                         |
| Default classes | `size-4 shrink-0` and normalises a child svg |

Marked `aria-hidden`, since the icon repeats what the content says.

### ScMarkerContent

| Property | Details                 |
| -------- | ----------------------- |
| Selector | `span[scMarkerContent]` |

Wraps long text rather than overflowing, and centres itself under the
`separator` variant.
