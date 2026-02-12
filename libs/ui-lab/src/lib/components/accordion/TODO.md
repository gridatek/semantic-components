# Accordion TODO

## Add `value` prop to ScAccordionItem

Currently, the accordion uses `panelId` on both `ScAccordionTrigger` and `ScAccordionPanel` to link them together. This requires duplicating the ID in both places.

### Goal

Add a `value` input to `ScAccordionItem` that automatically propagates to its children (`ScAccordionTrigger` and `ScAccordionPanel`) using Angular's `signalSetFn`.

### Implementation

1. **ScAccordionItem**
   - Add `value` input signal
   - Use `signalSetFn` to provide the value to children

2. **ScAccordionTrigger**
   - Remove `panelId` input (or make it optional)
   - Inject the `value` from parent `ScAccordionItem` via `signalSetFn`
   - Use the injected value as `panelId`

3. **ScAccordionPanel**
   - Remove `panelId` input (or make it optional)
   - Inject the `value` from parent `ScAccordionItem` via `signalSetFn`
   - Use the injected value as `panelId`

### Benefits

- **Single source of truth**: Value defined once on the item
- **Less repetition**: No need to specify `panelId` on both trigger and panel
- **Better DX**: Cleaner API for users

### Before

```html
<div sc-accordion-item>
  <button sc-accordion-trigger panelId="item-1">Trigger</button>
  <div sc-accordion-panel panelId="item-1">
    <div sc-accordion-content>Content</div>
  </div>
</div>
```

### After

```html
<div sc-accordion-item value="item-1">
  <button sc-accordion-trigger>Trigger</button>
  <div sc-accordion-panel>
    <div sc-accordion-content>Content</div>
  </div>
</div>
```

### References

- Angular `signalSetFn` documentation
- Similar pattern used in other component libraries (Radix, shadcn, etc.)
