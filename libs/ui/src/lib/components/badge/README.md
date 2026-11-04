# Badge

A short label — a status, a count, a tag — in the look of the app's preset.

## Usage

```html
<span scBadge>Badge</span>
<span scBadge variant="secondary">Secondary</span>
<span scBadge variant="destructive">Destructive</span>
<span scBadge variant="outline">Outline</span>
```

## Anatomy

One directive, on a `span` or a `div`; on an `a` it is a link, with a hover (`<a scBadge routerLink="…">`).

- An icon takes `data-icon="inline-start"` or `"inline-end"`: less padding on that side. A spinner too (`<svg scSpinner data-icon="inline-start" aria-label="Loading">`).
- Your own colors: classes over the preset's (`class="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"`).

## API reference

### ScBadge — `div[scBadge], span[scBadge], a[scBadge]`

| Input     | Type                                                                          | Default     | Description                     |
| --------- | ----------------------------------------------------------------------------- | ----------- | ------------------------------- |
| `variant` | `'default'`, `'secondary'`, `'destructive'`, `'outline'`, `'ghost'`, `'link'` | `'default'` | Its look, from the preset.      |
| `class`   | `string`                                                                      | `''`        | Classes merged over the preset. |

## Styles

From the preset (`badge`, a cva like the button's: `injectPreset().badge({ variant })`): the radius (square in lyra, `rounded-full` in mira, `3xl` in luma, `2xl` in rhea, `4xl` elsewhere), a background on the outline in maia and mira, smaller text in mira — and in sera no pill at all: small uppercase text, each variant a color. The Tags Input's tags take the secondary badge's look; the Notification Center's count keeps its own filled pill in every preset (a counter, not a label).
