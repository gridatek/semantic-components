# Alert

A callout for something to notice — a success, a warning, an error — with an icon, a title, a description and an action. In the look of the app's preset.

## Usage

```html
<div scAlert>
  <svg siCircleCheckIcon></svg>
  <div scAlertTitle>Payment successful</div>
  <div scAlertDescription>Your payment of $29.99 has been processed.</div>
</div>
```

## Anatomy

shadcn's parts, each a directive on your element; the icon is yours, the first child: it sits beside the title and the description.

```html
<div scAlert>
  <svg></svg>
  <div scAlertTitle></div>
  <div scAlertDescription></div>
  <div scAlertAction></div>
</div>
```

## Announcing

An alert has no role of its own (shadcn's always has `role="alert"`). One on the page when it loads is read in its place, like the rest of the page. Announce one only when it appears after something the user did:

- `role="status"` — polite: read when the screen reader is free. For most: saved, sent, updated.
- `role="alert"` — urgent: interrupts what is being read. Only for what needs action now: a failed payment, a lost connection.
- Put the role on an element that is on the page from the start and show the alert inside it — a region added together with its content is often not announced:

```html
<div role="status">
  @if (saved()) {
  <div scAlert>…</div>
  }
</div>
```

- Don't give a role to an alert that is there from the start: it would be announced on every visit, or not at all.

## API reference

Each part takes `class`, merged over the preset.

| Part                 | Selector               | Description                                                          |
| -------------------- | ---------------------- | -------------------------------------------------------------------- |
| `ScAlert`            | `div[scAlert]`         | The alert; no role. Input `variant`: `'default'` or `'destructive'`. |
| `ScAlertTitle`       | `[scAlertTitle]`       | The title, beside the icon.                                          |
| `ScAlertDescription` | `[scAlertDescription]` | Muted text under the title; its links underlined.                    |
| `ScAlertAction`      | `[scAlertAction]`      | A button in the end corner; the text keeps clear of it.              |

## Styles

From the preset (`alert`): the alert's cva (its radius, padding, text size and icon gap), the title, the description and the action's place. More padding in vega, maia, luma, rhea and sera; square and `text-xs` in lyra; tighter in mira; in sera a bar on the start side (the foreground's color, or the destructive one) and a semibold title.
