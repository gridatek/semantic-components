# Accordion

Items whose panels open and close under their heading. In the look of the app's preset (shadcn's Accordion), Base UI's parts and state, on `@angular/aria`.

## Usage

```html
<div scAccordion [(value)]="open">
  <div scAccordionItem value="shipping">
    <h3 scAccordionHeader>
      <button scAccordionTrigger>
        What are your shipping options?
        <svg siChevronDownIcon scAccordionTriggerIcon></svg>
      </button>
    </h3>
    <div scAccordionPanel>
      <ng-template scAccordionContent>We offer standard, express and overnight shipping.</ng-template>
    </div>
  </div>
</div>
```

The item connects its trigger and its panel: nothing to wire. (Angular Aria's trigger declares its panel a required input, which every template would have to bind; the trigger and panel parts extend Aria's own, so the item sets it.)

## Limitation: panel content

Angular Aria renders a panel only through its template: a panel's content goes in an `ng-template scAccordionContent`. It is created when the panel first opens, then kept, so the panel animates as it closes. Until then the browser's find-in-page doesn't see it (Base UI's `hiddenUntilFound` can't be offered).

## Keyboard

Tab moves between the triggers; Enter or Space opens or closes. ArrowDown and ArrowUp move between the triggers too, Home and End to the first and last (Angular Aria's). A disabled item is reached, not opened.

## API reference

| Part                                     | Selector                                                | Inputs                                                                                                        |
| ---------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `ScAccordion`                            | `[scAccordion]`                                         | `value` (`[(value)]`, the open items' values), `multiple` (default one at a time), `disabled`, `class`        |
| `ScAccordionItem`                        | `[scAccordionItem]`                                     | `value` (made up if left out), `disabled`, `class` — `data-open` while open                                   |
| `ScAccordionHeader`                      | `h2`–`h6[scAccordionHeader]`                            | `class` — the heading around the trigger; its level is yours                                                  |
| `ScAccordionTrigger`                     | `button[scAccordionTrigger]`                            | `class` — opens and closes its item's panel                                                                   |
| `ScAccordionTriggerIcon`                 | `svg[scAccordionTriggerIcon]`                           | `class` — your chevron, at the end, turned while open                                                         |
| `ScAccordionPanel`, `ScAccordionContent` | `[scAccordionPanel]`, `ng-template[scAccordionContent]` | `class` — role `region`, named by its trigger; its height animates (needs `interpolate-size: allow-keywords`) |

Every part's classes are the preset's (`injectPreset().accordion`: `root`, `item`, `trigger`, `icon`, `panel`, `content`): shadcn's Accordion, in each style. The trigger shows its focus in every style (luma's has no focus style).
