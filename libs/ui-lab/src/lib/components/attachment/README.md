# Attachment

Shows a file alongside its upload state, on its own or in a scrollable row.

## Usage

```typescript
import { ScAttachment, ScAttachmentActions, ScAttachmentContent, ScAttachmentDescription, ScAttachmentMedia, ScAttachmentTitle } from '@semantic-components/ui-lab';
```

```html
<div scAttachment>
  <div scAttachmentMedia><svg siFileTextIcon></svg></div>
  <div scAttachmentContent>
    <div scAttachmentTitle>quarterly-report.pdf</div>
    <div scAttachmentDescription>2.4 MB</div>
  </div>
</div>
```

## Components

All directives accept a `class` input for merging additional CSS classes via
the `cn` utility.

### ScAttachment

| Property | Details                        |
| -------- | ------------------------------ |
| Selector | `div[scAttachment]`            |
| Inputs   | `state`, `size`, `orientation` |

`state` is one of `idle`, `uploading`, `processing`, `error` or `done`
(default). It is published as `data-state`, and the parts style themselves
from it — `error` tints the media and description, `idle` draws a dashed
border.

`size` is `default`, `sm` or `xs`; `orientation` is `horizontal` (default) or
`vertical`. Both are published as data attributes so the parts can respond.

### ScAttachmentMedia

| Property | Details                                |
| -------- | -------------------------------------- |
| Selector | `div[scAttachmentMedia]`               |
| Inputs   | `variant`: `icon` (default) \| `image` |

`image` dims the media until the attachment reaches `idle` or `done`, and
sizes a child `img` to fill the square.

### ScAttachmentContent, ScAttachmentTitle, ScAttachmentDescription

Text column. The title and description both truncate rather than wrap.

### ScAttachmentActions

Sits above the trigger. Under `orientation="vertical"` it moves to the top
inline-end corner of the card.

### ScAttachmentTrigger

| Property | Details                                               |
| -------- | ----------------------------------------------------- |
| Selector | `a[scAttachmentTrigger], button[scAttachmentTrigger]` |

Stretches over the whole attachment so the entire card is the click target,
while the actions stay clickable above it.

### ScAttachmentGroup

A horizontally scrolling, snapping row of attachments.

## Differences from upstream

Three utilities upstream uses are not defined in this workspace, so they are
omitted rather than shipped as dead classes:

- `shimmer` on the title during `uploading` and `processing`
- `scroll-fade-x` and `scrollbar-none` on the group
