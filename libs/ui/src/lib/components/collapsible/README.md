# Collapsible

A trigger that shows and hides a panel of content: the disclosure pattern, Base UI's Collapsible. shadcn's adds no classes (the same in every style): no preset key.

## Usage

```html
<div scCollapsible [(open)]="open">
  <button scButton scCollapsibleTrigger variant="ghost" size="icon-sm"><svg siChevronsUpDownIcon></svg><span class="sr-only">Toggle details</span></button>
  <div scCollapsiblePanel>…</div>
</div>
```

## Parts

| Part                   | Selector                       | What it does                                                                                                                                                |
| ---------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScCollapsible`        | `[scCollapsible]`              | `open` (two-way), `disabled`; `data-open` / `data-closed`                                                                                                   |
| `ScCollapsibleTrigger` | `button[scCollapsibleTrigger]` | `aria-expanded`, `aria-controls`, `data-panel-open`; toggles. Behaviour only: its look is yours (`scButton`)                                                |
| `ScCollapsiblePanel`   | `div[scCollapsiblePanel]`      | Its content written inside. Closed: the `hidden` attribute, its height animating; `hiddenUntilFound`: `hidden="until-found"`, a find-in-page match opens it |

Its content is always in the page, hidden when closed: for heavy content, wrap it in your own `@if (open())`. Closed uses the `hidden` attribute, not a class: Tailwind's base keeps it `display: none` over any display class you give the panel (`flex`, `grid`).

No Angular Aria: it has no disclosure pattern (the old Collapsible used its Accordion, a trigger wired to its panel by `[panel]`, its content in an `ng-template`).
