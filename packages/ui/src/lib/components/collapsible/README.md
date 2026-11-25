# Collapsible

A trigger that shows and hides a panel of content: the disclosure pattern, Base UI's Collapsible. shadcn's adds no classes (the same in every style): no style key.

## Usage

```html
<div scCollapsible [(open)]="open">
  <button scButton scCollapsibleTrigger variant="ghost" size="icon-sm"><svg siChevronsUpDownIcon></svg><span class="sr-only">Toggle details</span></button>
  <div scCollapsiblePanel>…</div>
</div>
```

### The trigger elsewhere

```html
<button scButton variant="outline" size="sm" [scCollapsibleTrigger]="filters">Filters</button>
…
<div scCollapsible #filters="scCollapsible">
  <div scCollapsiblePanel>…</div>
</div>
```

A button in a header, its panel further down: the trigger names its collapsible, as a `<label for>` names its input. The same `aria-expanded`, `aria-controls` and animation.

## Parts

| Part                   | Selector                       | What it does                                                                                                                                                                                                                                                                                                                                                 |
| ---------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ScCollapsible`        | `[scCollapsible]`              | `open` (two-way), `disabled`; `data-open` / `data-closed`                                                                                                                                                                                                                                                                                                    |
| `ScCollapsibleTrigger` | `button[scCollapsibleTrigger]` | `aria-expanded`, `aria-controls`, `data-panel-open`; toggles. Its collapsible: the one around it, or the one it names from anywhere — `[scCollapsibleTrigger]="filters"` (`#filters="scCollapsible"`). Behaviour only: its look is yours (`scButton`)                                                                                                        |
| `ScCollapsiblePanel`   | `div[scCollapsiblePanel]`      | Its content written inside. Opens and closes with shadcn's animation (tw-animate's `animate-collapsible-down` / `-up`, to and from `height: auto`: the app's `interpolate-size: allow-keywords`), not on the first render; closed, the `hidden` attribute once the animation ends; `hiddenUntilFound`: `hidden="until-found"`, a find-in-page match opens it |

Its content is always in the page, hidden when closed: for heavy content, wrap it in your own `@if (open())`. Closed uses the `hidden` attribute, not a class: Tailwind's base keeps it `display: none` over any display class you give the panel (`flex`, `grid`).

No Angular Aria: it has no disclosure pattern (the old Collapsible used its Accordion, a trigger wired to its panel by `[panel]`, its content in an `ng-template`).
