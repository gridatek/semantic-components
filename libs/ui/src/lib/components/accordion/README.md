# Accordion

A vertically stacked set of interactive headings that each reveal a section of content.

Built on `@angular/aria/accordion` directives with shadcn styling.

## Components

| Component            | Selector                          | Role                                                                                                    |
| -------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `ScAccordionGroup`   | `[scAccordionGroup]`              | Root container. Inputs: `multiExpandable`, `disabled`, `wrap`, `softDisabled`                           |
| `ScAccordionItem`    | `[scAccordionItem]`               | Structural wrapper for a trigger + panel pair                                                           |
| `ScAccordionTrigger` | `[scAccordionTrigger]`            | Button that toggles a panel. Inputs: `panelId`, `disabled`, `expanded`, `id`. Outputs: `expandedChange` |
| `ScAccordionPanel`   | `[scAccordionPanel]`              | Content container. Inputs: `panelId`, `id`                                                              |
| `ScAccordionContent` | `ng-template[scAccordionContent]` | Lazy content — only instantiated when the panel is expanded                                             |

## Usage

```html
<div scAccordionGroup>
  <div scAccordionItem>
    <button scAccordionTrigger panelId="item-1">Is it accessible?</button>
    <div scAccordionPanel panelId="item-1">
      <ng-template scAccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</ng-template>
    </div>
  </div>
</div>
```

### Allow multiple panels open

```html
<div scAccordionGroup multiExpandable>...</div>
```

### Expand a panel by default

```html
<button scAccordionTrigger panelId="item-1" [expanded]="true">...</button>
```
