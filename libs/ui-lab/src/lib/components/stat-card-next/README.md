# Stat Card Next

The stat card, rebuilt: one figure on a description list — its label, its value written by `Intl.NumberFormat`, and how it changed, coloured by whether that is good news.

## Architecture

```
dl[scStatCardNext] (locale — the app's)
├── dt[scStatCardNextLabel]          — what the figure is
│   └── svg[scStatCardNextIcon]      — your icon, at the label's end
├── dd[scStatCardNextValue]          — value + format (Intl.NumberFormatOptions); or your text
├── dd[scStatCardNextChange]         — value (signed) + format; good: 'up' | 'down'
└── dd[scStatCardNextDescription]    — "from last month"
```

## Usage

```html
<dl scStatCardNext>
  <dt scStatCardNextLabel>Revenue <svg siDollarSignIcon scStatCardNextIcon></svg></dt>
  <dd scStatCardNextValue [value]="45231.89" [format]="{ style: 'currency', currency: 'USD' }"></dd>
  <dd scStatCardNextChange [value]="0.201" [format]="{ style: 'percent', maximumFractionDigits: 1 }">
    <svg siTrendingUpIcon></svg>
  </dd>
  <dd scStatCardNextDescription>from last month</dd>
</dl>
```

## Numbers

- The value and the change are written by `Intl.NumberFormat` in the card's `locale` (`LOCALE_ID` by default), with your `format`: currency, percent, a unit, compact notation…
- Without a `value`, the value part shows your text ("All systems normal").
- The change always shows its sign (`+20.1%`, `−4.3%`, `0`).

## Good news

- `good` on the change is the way that is good news: `up` (the default — revenue, users) or `down` (costs, errors, wait times).
- `data-trend`: `up`, `down` or `none`; `data-good`: `true`, `false`, or absent when unchanged.
- Good is the theme's `success` colour, bad its `destructive` one, unchanged muted.

## Accessibility

- A description list: the label (`dt`) names the value and the change (`dd`s).
- The sign is read ("plus 20.1 percent"). Colour alone says good or bad: say it too, in a `sr-only` span in the change, if it matters.
- Your icon goes first in the change, your other text after the number.

## Not here

Sparklines and charts (put yours in the card), numbers animated as they change, loading skeletons (`scSkeleton`), variants and sizes (`class`).
