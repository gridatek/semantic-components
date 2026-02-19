# ScSelect Review

## 1. Internal components can be simplified to directives

`ScSelectInput` is a component with an empty template (`template: ''`). Since it only applies host bindings and a host directive, it should be a `Directive` instead.

**File:** `select-input.ts`

---

## 2. Internal `classInput` pattern is unnecessary

`ScSelectIcon`, `ScSelectInput`, and `ScSelectItemIndicator` are now internal — consumers never pass a `class` to them. The `classInput` + `cn()` pattern exists solely for consumer class merging, which no longer applies. Their classes can be hardcoded strings.

**Files:** `select-icon.ts`, `select-input.ts`, `select-item-indicator.ts`

---

## 3. `ScSelectValue` may be unnecessary

`ScSelectValue` is a component that wraps `<ng-content />` and adds `pointer-events-none`. This single class could be applied directly by the consumer or folded into `ScSelectTrigger`'s template styling via `*:data-[slot=select-value]` (which already exists in the trigger's class string). Consider removing the component entirely and having consumers use a plain `<span data-slot="select-value">` or making the trigger render the value display internally.

**File:** `select-value.ts`

---

## 4. `displayValue` in `ScSelect` is unused internally

`ScSelect.displayValue` is a public computed signal, but neither the component itself nor any internal child reads it. It duplicates logic that the demo already has. Either:

- Remove it if it's not part of the public API contract
- Or keep it and have the demo use `select().displayValue()` instead of reimplementing it

**File:** `select.ts:68-71`

---

## 5. `ScSelectList.listbox` is public but should be private

`ScSelectList.listbox` is `readonly` (public) because `ScSelect` reads it via `this.content()?.listbox.values()`. This leaks the internal `Listbox` instance. Consider exposing just the `values()` signal instead:

```typescript
// select-list.ts
readonly values = computed(() => this.listbox.values());
```

Then in `ScSelect`: `this.content()?.values() ?? []`

**File:** `select-list.ts:28`, `select.ts:67`

---

## 6. Circular dependency workaround is fragile

`select-trigger.ts` uses a trailing `import { ScSelect } from './select'` after the class to work around circular imports. This is technically valid but fragile and non-obvious. Alternatives:

- Use an `InjectionToken` provided by `ScSelect` for the `placeholder` signal
- Move `placeholder` reading into an `effect` in `ScSelect` that sets a signal on the trigger via `contentChild`

**File:** `select-trigger.ts:53-54`

---

## 7. One-way sync only (listbox → model)

The `value` model syncs from listbox selection to the model, but not the other direction. If a consumer sets `value` programmatically (e.g., via signal forms), the listbox selection won't update. For full `FormValueControl` support, bidirectional sync is needed.

**File:** `select.ts:81-85`

---

## 8. `disabled` input is missing

There's no `disabled` input on `ScSelect`. For forms usage, consumers expect to be able to disable the select. The slider component has `disabled` — the select should too. It should propagate to the trigger and combobox.

**File:** `select.ts`

---

## 9. `ScSelectList` injects `Combobox` but only reads `expanded()`

The entire `Combobox` instance is injected just to read `expanded()` for the open/close animation. Consider whether this coupling is necessary or if the expanded state could be passed down differently.

**File:** `select-list.ts:31`

---

## 10. `required` on `ScSelect` is missing

For forms, a `required` input (propagated to the combobox/input) would enable native validation and proper ARIA (`aria-required`).

**File:** `select.ts`

---

## Summary Table

| #   | Issue                               | Severity | Effort |
| --- | ----------------------------------- | -------- | ------ |
| 1   | Input component should be directive | Low      | Low    |
| 2   | Remove classInput from internals    | Low      | Low    |
| 3   | ScSelectValue may be unnecessary    | Medium   | Medium |
| 4   | Unused displayValue in ScSelect     | Low      | Low    |
| 5   | Listbox leaked from ScSelectList    | Medium   | Low    |
| 6   | Circular dependency workaround      | Medium   | Medium |
| 7   | One-way sync only                   | High     | Medium |
| 8   | Missing disabled input              | High     | Medium |
| 9   | Combobox coupling in ScSelectList   | Low      | Low    |
| 10  | Missing required input              | Medium   | Low    |
