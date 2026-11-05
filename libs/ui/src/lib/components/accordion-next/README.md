# Accordion Next

Items whose panels open and close under their heading. In the look of the app's preset (shadcn's Accordion), Base UI's parts and state, on `@angular/aria`. The rewrite of Accordion, beside it until it is validated.

## Usage

```html
<div scAccordionNext [(value)]="open">
  <div scAccordionNextItem value="shipping">
    <h3 scAccordionNextHeader>
      <button scAccordionNextTrigger [panel]="shipping">
        What are your shipping options?
        <svg siChevronDownIcon scAccordionNextTriggerIcon></svg>
      </button>
    </h3>
    <div scAccordionNextPanel #shipping>
      <ng-template scAccordionNextContent>We offer standard, express and overnight shipping.</ng-template>
    </div>
  </div>
</div>
```

Each trigger is given its panel: name the panel (`#shipping`) and pass it (`[panel]="shipping"`). Angular Aria's trigger requires it; the panel part is Aria's panel itself, extended, so it is accepted as one.

## Limitation: panel content

Angular Aria renders a panel only through its template: a panel's content goes in an `ng-template scAccordionNextContent`. It is created when the panel first opens, then kept, so the panel animates as it closes. Until then the browser's find-in-page doesn't see it (Base UI's `hiddenUntilFound` can't be offered).

## Keyboard

Tab moves between the triggers; Enter or Space opens or closes. ArrowDown and ArrowUp move between the triggers too, Home and End to the first and last (Angular Aria's). A disabled item is reached, not opened.

## API reference

| Part                                             | Selector                                                        | Inputs                                                                                                        |
| ------------------------------------------------ | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `ScAccordionNext`                                | `[scAccordionNext]`                                             | `value` (`[(value)]`, the open items' values), `multiple` (default one at a time), `disabled`, `class`        |
| `ScAccordionNextItem`                            | `[scAccordionNextItem]`                                         | `value` (made up if left out), `disabled`, `class` — `data-open` while open                                   |
| `ScAccordionNextHeader`                          | `h2`–`h6[scAccordionNextHeader]`                                | `class` — the heading around the trigger; its level is yours                                                  |
| `ScAccordionNextTrigger`                         | `button[scAccordionNextTrigger]`                                | `panel` (required), `class`                                                                                   |
| `ScAccordionNextTriggerIcon`                     | `svg[scAccordionNextTriggerIcon]`                               | `class` — your chevron, at the end, turned while open                                                         |
| `ScAccordionNextPanel`, `ScAccordionNextContent` | `[scAccordionNextPanel]`, `ng-template[scAccordionNextContent]` | `class` — role `region`, named by its trigger; its height animates (needs `interpolate-size: allow-keywords`) |

Every part's classes are the preset's (`injectPreset().accordion`: `root`, `item`, `trigger`, `icon`, `panel`, `content`): shadcn's Accordion, in each style. The trigger shows its focus in every style (luma's has no focus style).
