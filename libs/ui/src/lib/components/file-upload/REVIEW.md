# File Upload Review

## ~~1. Memory leak in `ScFileUploadItemPreview`~~ ✅ RESOLVED

Replaced `computed()` with an `effect()` that revokes the previous URL before creating a new one. `DestroyRef.onDestroy()` revokes the final URL on component destruction.

---

## ~~2. Inline SVG in `ScFileUploadItemDelete` — use semantic-icons~~ ✅ RESOLVED

Consumer now provides their own icon via content projection.

---

## ~~3. `ScFileUploadDropzone` queries DOM for the file input~~ ✅ RESOLVED

Dropzone is now a directive. `ScFileUploadInput` is a separate directive placed by the consumer — no DOM queries needed.

---

## ~~4. Same DOM query issue in `ScFileUploadTrigger`~~ ✅ RESOLVED

Trigger is now a `<label>` directive. Consumer places `<input scFileUploadInput>` inside — native label-input association handles click-to-browse.

---

## ~~5. `ScFileUploadItem` is a component but has no internal template logic~~ ✅ RESOLVED

Converted to a `Directive` — no template needed, just host bindings.

---

## ~~6. Duplicated `file` input across child components~~ ✅ RESOLVED

Children now inject `SC_FILE_UPLOAD_ITEM` from the parent `ScFileUploadItem` instead of requiring their own `[file]` input.

---

## ~~7. `ScFileUploadItemDelete` takes `fileId` instead of injecting from parent~~ ✅ RESOLVED

Delete button now injects `SC_FILE_UPLOAD_ITEM` to get the file ID from the parent.

---

## 8. No `FormValueControl` support

The component uses `model<FileUploadFile[]>` for files but doesn't implement `FormValueControl`. For consistency with other form components (slider, select), it should support signal forms.

**File:** `file-upload.ts`

---

## 9. `ScFileUpload` methods are public API surface but not type-safe

Methods like `updateFileProgress` and `updateFileStatus` accept raw `string` IDs. If a consumer passes an invalid ID, nothing happens silently. Consider returning a boolean or throwing, or at minimum documenting this behavior.

**File:** `file-upload.ts:96-110`

---

## ~~10. No `aria-label` on the hidden file input~~ ✅ RESOLVED

`ScFileUploadInput` is now a consumer-placed directive — consumers add `aria-label` or `aria-describedby` directly on the native `<input>`.

---

## ~~11. Dropzone click handler doesn't prevent double-trigger~~ ✅ RESOLVED

Dropzone no longer has a click handler or `openFilePicker` method. The `<input scFileUploadInput>` overlay handles click-to-browse natively.

---

## ~~12. `generateId` uses `Math.random()` — not guaranteed unique~~ ✅ RESOLVED

Replaced `Math.random().toString(36)` with `crypto.randomUUID()` for guaranteed uniqueness.

---

## Summary Table

| #   | Issue                                | Severity | Effort | Status   |
| --- | ------------------------------------ | -------- | ------ | -------- |
| 1   | Memory leak in preview URL           | High     | Low    | Resolved |
| 2   | Inline SVG instead of semantic-icons | Low      | Low    | Resolved |
| 3   | DOM query in dropzone                | Medium   | Low    | Resolved |
| 4   | DOM query in trigger                 | Medium   | Low    | Resolved |
| 5   | Item should be directive             | Low      | Low    | Resolved |
| 6   | Duplicated file input in children    | Medium   | Medium | Resolved |
| 7   | Delete takes fileId, should inject   | Medium   | Low    | Resolved |
| 8   | No FormValueControl support          | Medium   | Medium | Open     |
| 9   | Silent failure on invalid IDs        | Low      | Low    | Open     |
| 10  | Missing aria-label on file inputs    | High     | Low    | Resolved |
| 11  | Dropzone click double-trigger        | Medium   | Low    | Resolved |
| 12  | Non-unique ID generation             | Low      | Low    | Resolved |
