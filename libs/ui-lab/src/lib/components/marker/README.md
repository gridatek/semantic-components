# Marker

Labels a point in a list or feed — a date divider, an unread boundary, or a
short inline note.

## Usage

```typescript
import { ScMarker, ScMarkerContent, ScMarkerIcon } from '@semantic-components/ui-lab';
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
| Selector | `div[scMarker], a[scMarker]`                    |
| Inputs   | `variant`: `default` \| `separator` \| `border` |

`a` is a valid host so a marker can link back to whatever it marks; the
underline styling only applies in that case.

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
