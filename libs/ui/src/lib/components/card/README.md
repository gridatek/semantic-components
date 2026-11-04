# Card

A box of related content: a header with its title, description and action, the content, a footer. In the look of the app's preset.

## Usage

```html
<div scCard class="w-full max-w-sm">
  <div scCardHeader>
    <h3 scCardTitle>Login to your account</h3>
    <p scCardDescription>Enter your email below to login to your account</p>
    <div scCardAction>
      <button scButton variant="link">Sign Up</button>
    </div>
  </div>
  <div scCardContent>…</div>
  <div scCardFooter class="flex-col gap-2">
    <button scButton class="w-full">Login</button>
  </div>
</div>
```

## Anatomy

shadcn's parts, each a directive on your element:

```html
<div scCard>
  <div scCardHeader>
    <h3 scCardTitle></h3>
    <p scCardDescription></p>
    <div scCardAction></div>
  </div>
  <div scCardContent></div>
  <div scCardFooter></div>
</div>
```

- The title is the heading you choose, at the level that fits your page.
- One variable, `--card-spacing`, sets the gap between the sections and the inset of every part: from the preset, smaller with `size="sm"`, yours with a class (`[--card-spacing:--spacing(6)]`). Edge to edge: `-mx-(--card-spacing)`, and `-mb-(--card-spacing)` on the content above a footer.
- An image as the first child sits at the top, no padding above it, in the card's corners.
- The action goes to the end of the header, beside the title and the description.
- The footer's look is the preset's: a muted band with a line above in nova, a line in lyra, none in the others (`border-t` adds one, with its spacing).

## API reference

Each part takes `class`, merged over the preset.

| Part                | Selector              | Description                                                |
| ------------------- | --------------------- | ---------------------------------------------------------- |
| `ScCard`            | `div[scCard]`         | The card. Input `size`: `'default'` or `'sm'`.             |
| `ScCardHeader`      | `div[scCardHeader]`   | The title and description, the action beside them.         |
| `ScCardTitle`       | `[scCardTitle]`       | The title, on a heading of yours.                          |
| `ScCardDescription` | `[scCardDescription]` | Muted text under the title.                                |
| `ScCardAction`      | `div[scCardAction]`   | A button or badge at the end of the header.                |
| `ScCardContent`     | `div[scCardContent]`  | The content, inset by `--card-spacing`.                    |
| `ScCardFooter`      | `div[scCardFooter]`   | Actions at the bottom, in a row; its look from the preset. |

## Styles

The card's radius, ring and shadow are the preset's `frame` — the same as `scFrame`'s — which `ScCard` adds: to change the card's frame, change `frame`. From the preset (`card`): every part but the action — the card's text size and `--card-spacing` (4 in nova, lyra and mira; 5 in rhea; 6 in vega, maia and luma; 8 in sera), the header's gap, the title (smaller in lyra and mira, uppercase in sera), the description, the content (a column in vega) and the footer.
