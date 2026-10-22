# Org Chart Next

The org chart, rebuilt: your people as nested lists, laid out as a chart and joined by lines — a tree for the keyboard and screen readers, collapsible and selectable.

## Architecture

```
ul[scOrgChartNext] (direction: 'down' | 'across'; [(value)] — the selected)
│  role="tree" — @angular/aria's Tree
└── li[scOrgChartNextItem] (value; [(expanded)] — open by default; label)
    │  role="treeitem", named by its card
    ├── div[scOrgChartNextCard]                  — what is seen; not focusable
    │   └── svg[scOrgChartNextExpandIcon]        — your chevron, turned while open
    └── ul[scOrgChartNextGroup]                  — the reports (role="group"), joined by lines
        └── li[scOrgChartNextItem] …
```

## Usage

```html
<ul scOrgChartNext aria-label="Leadership">
  <li scOrgChartNextItem value="ada">
    <div scOrgChartNextCard>
      <div class="grid">
        <span class="font-medium">Ada Lovelace</span>
        <span class="text-muted-foreground text-xs">Chief Executive</span>
      </div>
    </div>
    <ul scOrgChartNextGroup>
      <li scOrgChartNextItem value="grace">
        <div scOrgChartNextCard>…</div>
      </li>
    </ul>
  </li>
</ul>
```

## From data

Write a person in a template, and — for each report — the template again. Pass the outlet's injector, so each report finds its group:

```html
<ul scOrgChartNext aria-label="Leadership">
  <ng-container *ngTemplateOutlet="node; context: { $implicit: team }; injector: 'outlet'" />
</ul>

<ng-template #node let-person>
  <li scOrgChartNextItem [value]="person.id">
    <div scOrgChartNextCard>{{ person.name }}</div>
    @if (person.children?.length) {
    <ul scOrgChartNextGroup>
      @for (report of person.children; track report.id) {
      <ng-container *ngTemplateOutlet="node; context: { $implicit: report }; injector: 'outlet'" />
      }
    </ul>
    }
  </li>
</ng-template>
```

## Layout

- `direction="down"`: reports below; `across`: at the inline end — the left in a right-to-left page.
- A chart larger than its box scrolls; a smaller one is centred.
- The lines are CSS (`bg-border`), drawn by the groups and their items.

## Keyboard

One Tab stop. ↑ ↓ between the people shown, in reading order; → opens, or goes to the first report; ← closes, or goes to the manager; Home, End; typing a name jumps to it; Enter, Space select. A click selects and opens or closes.

## Accessibility

- Name the chart (`aria-label`).
- Each person is named by their card (`aria-labelledby`), not by their reports' text; type-ahead uses the card's text too, or `label`.
- The card is not a button: the `li` takes focus. Hide decorative avatars (`aria-hidden`), and name counts ("2<span class="sr-only"> reports</span>").

## Not here

Pan and zoom (it scrolls), export as an image, drag to reorganise, dotted-line reports (a tree has one manager), d3's compact layout.
