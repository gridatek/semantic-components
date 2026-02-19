# OPT Field Review

## 1. Internal components are publicly exported

`ScOptFieldSlotInput`, `ScOptFieldSlotCaret`, and `ScOptFieldSlotChar` are only used internally by `ScOptFieldSlot`. They should not be exported from `index.ts` — consumers never need to import them.

**File:** `index.ts`

---

## 2. `ScOptFieldSlot.optField` is public but should be private

`optField` is declared `readonly` (public) but is only used internally by the slot. It's leaked to consumers.

**File:** `opt-field-slot.ts:45`

---

## 3. `setIndex` and `focus` are public API on `ScOptFieldSlot`

These methods are only called by the parent `ScOptField` via `contentChildren`. They shouldn't be part of the public API surface. Consider using an injection token or a shared interface to keep these internal.

**File:** `opt-field-slot.ts:67-72`

---

## 4. `ScOptFieldSlotInput` exposes `classInput` pattern but is internal

Since it's only used inside `ScOptFieldSlot`'s template, the `classInput` pattern is unnecessary overhead. The class can be hardcoded.

**File:** `opt-field-slot-input.ts:33`

---

## 5. Same `classInput` issue on `ScOptFieldSlotCaret` and `ScOptFieldSlotChar`

Both are internal-only. No consumer passes a `class` to them.

**Files:** `opt-field-slot-caret.ts:25`, `opt-field-slot-char.ts:12`

---

## 6. No `FormValueControl` support

`ScOptField` uses `model<string>` for `value` but doesn't implement `FormValueControl<string>`. For consistency with other form components (select, slider), it should support signal forms.

**File:** `opt-field.ts`

---

## 7. `inputmode` is hardcoded to `numeric`

The slot input always uses `inputmode="numeric"`, but OTP fields can accept alphanumeric codes. This should be configurable via an input on `ScOptField` (e.g., `inputMode: 'numeric' | 'text'`), propagated to the slots.

**File:** `opt-field-slot-input.ts:17`

---

## 8. `setChar` logic is fragile with string manipulation

`setChar` splits the value string, pads with empty strings, then joins — but empty strings in the middle of the array produce incorrect results (e.g., `['1', '', '3'].join('')` = `'13'`, losing the position of `'3'`). For a 6-slot field, entering char at index 0, then index 2, would produce `'13'` instead of `'1 3'`.

Consider using a fixed-length array of characters internally instead of a single string.

**File:** `opt-field.ts:66-81`

---

## 9. No `aria-label` support on individual slot inputs

The hidden inputs lack `aria-label` or `aria-labelledby`. Screen readers can't identify which digit position they're editing. Consider adding `aria-label` like `"Digit 1 of 6"` automatically.

**File:** `opt-field-slot-input.ts:14-24`

---

## 10. `onPaste` type-checks with `instanceof ClipboardEvent`

This is fine but the method also needs to handle the case where `clipboardData` is `null` (already partially handled with `|| ''`). More importantly, after paste, only numeric characters should be kept if `inputmode` is `numeric`.

**File:** `opt-field.ts:91-103`

---

## 11. `ScOptFieldSlot` imports and renders internal components — could be simplified

`ScOptFieldSlotCaret` and `ScOptFieldSlotChar` are very thin. The caret is just a blinking `div` and the char is just a `span` with `textContent`. These could be inlined directly into `ScOptFieldSlot`'s template, eliminating two files.

**Files:** `opt-field-slot-caret.ts`, `opt-field-slot-char.ts`

---

## 12. `effect` for setting slot indices runs on every change

The effect in `ScOptField`'s constructor re-sets all slot indices whenever `slots()` changes. Since slots are static (determined by template), this effect runs unnecessarily after the initial setup. Consider using `afterRenderEffect` or checking if indices actually changed.

**File:** `opt-field.ts:58-62`

---

## Summary Table

| #   | Issue                                   | Severity | Effort |
| --- | --------------------------------------- | -------- | ------ |
| 1   | Internal components publicly exported   | Medium   | Low    |
| 2   | `optField` leaked as public             | Low      | Low    |
| 3   | `setIndex`/`focus` public on slot       | Low      | Low    |
| 4   | Unnecessary classInput on slot-input    | Low      | Low    |
| 5   | Unnecessary classInput on caret/char    | Low      | Low    |
| 6   | No FormValueControl support             | Medium   | Medium |
| 7   | Hardcoded `inputmode="numeric"`         | Medium   | Low    |
| 8   | `setChar` string logic is fragile       | High     | Medium |
| 9   | Missing aria-label on slot inputs       | High     | Low    |
| 10  | Paste doesn't filter by inputmode       | Medium   | Low    |
| 11  | Caret/char could be inlined             | Low      | Low    |
| 12  | Effect for slot indices runs repeatedly | Low      | Low    |
