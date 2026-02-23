# File Upload Review

## 1. Memory leak in `ScFileUploadItemPreview`

`URL.createObjectURL()` is called in a `computed()` but `URL.revokeObjectURL()` is never called. Every time the computed re-evaluates (or the component is destroyed), the object URL leaks. Use `DestroyRef` or an `effect` with cleanup to revoke the URL.

**File:** `file-upload-item-preview.ts:38-42`

---

## 2. Inline SVG in `ScFileUploadItemDelete` — use semantic-icons

The X icon is hardcoded as inline SVG. Should use `SiXIcon` from `@semantic-icons/lucide-icons` for consistency with the rest of the codebase.

**File:** `file-upload-item-delete.ts:14-27`

---

## 3. `ScFileUploadDropzone` queries DOM for the file input

Uses `querySelector('input[type="file"]')` instead of Angular's `viewChild`. This is fragile and bypasses Angular's template querying.

```typescript
// Current
const input = this.elementRef.nativeElement.querySelector('input[type="file"]');

// Better
private readonly fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');
```

**File:** `file-upload-dropzone.ts:46-50`

---

## 4. Same DOM query issue in `ScFileUploadTrigger`

Same `querySelector` problem as the dropzone.

**File:** `file-upload-trigger.ts:39-43`

---

## 5. `ScFileUploadItem` is a component but has no internal template logic

It's just `<ng-content />` with host bindings. Should be a `Directive` instead to reduce overhead.

**File:** `file-upload-item.ts`

---

## 6. Duplicated `file` input across child components

`ScFileUploadItemPreview`, `ScFileUploadItemSize`, `ScFileUploadItemProgress` all require `[file]="file"` to be passed individually. The parent `ScFileUploadItem` already has the `file` — children could inject it instead of requiring their own input.

```typescript
// In ScFileUploadItem, provide self:
providers: [{ provide: SC_FILE_UPLOAD_ITEM, useExisting: ScFileUploadItem }]

// In children:
private readonly item = inject(SC_FILE_UPLOAD_ITEM);
protected readonly file = computed(() => this.item.file());
```

This simplifies the consumer template from:

```html
<div scFileUploadItem [file]="file">
  <div scFileUploadItemPreview [file]="file"></div>
  <div scFileUploadItemSize [file]="file"></div>
</div>
```

To:

```html
<div scFileUploadItem [file]="file">
  <div scFileUploadItemPreview></div>
  <div scFileUploadItemSize></div>
</div>
```

**Files:** `file-upload-item-preview.ts`, `file-upload-item-size.ts`, `file-upload-item-progress.ts`

---

## 7. `ScFileUploadItemDelete` takes `fileId` instead of injecting from parent

Same issue as #6. The delete button requires `[fileId]="file.id"` but could get the file ID from the parent `ScFileUploadItem` via injection.

**File:** `file-upload-item-delete.ts`

---

## 8. No `FormValueControl` support

The component uses `model<FileUploadFile[]>` for files but doesn't implement `FormValueControl`. For consistency with other form components (slider, select), it should support signal forms.

**File:** `file-upload.ts`

---

## 9. `ScFileUpload` methods are public API surface but not type-safe

Methods like `updateFileProgress` and `updateFileStatus` accept raw `string` IDs. If a consumer passes an invalid ID, nothing happens silently. Consider returning a boolean or throwing, or at minimum documenting this behavior.

**File:** `file-upload.ts:96-110`

---

## 10. No `aria-label` on the hidden file input

The hidden file inputs in both `ScFileUploadDropzone` and `ScFileUploadTrigger` lack an `aria-label` or `aria-labelledby`. Screen readers may not properly announce the purpose of the input.

**Files:** `file-upload-dropzone.ts:17-23`, `file-upload-trigger.ts:16-22`

---

## 11. Dropzone click handler doesn't prevent double-trigger

Clicking content inside the dropzone (e.g., a nested button or link) will bubble up and also trigger the file picker. The `openFilePicker` should check if the event target is the dropzone itself or if there's a trigger button present.

**File:** `file-upload-dropzone.ts:44-49`

---

## 12. `generateId` uses `Math.random()` — not guaranteed unique

`Math.random().toString(36).substring(2, 11)` can produce duplicates. Use `crypto.randomUUID()` for guaranteed uniqueness, or at minimum a counter-based approach.

**File:** `file-upload.ts:44-46`

---

## Summary Table

| #   | Issue                                | Severity | Effort |
| --- | ------------------------------------ | -------- | ------ |
| 1   | Memory leak in preview URL           | High     | Low    |
| 2   | Inline SVG instead of semantic-icons | Low      | Low    |
| 3   | DOM query in dropzone                | Medium   | Low    |
| 4   | DOM query in trigger                 | Medium   | Low    |
| 5   | Item should be directive             | Low      | Low    |
| 6   | Duplicated file input in children    | Medium   | Medium |
| 7   | Delete takes fileId, should inject   | Medium   | Low    |
| 8   | No FormValueControl support          | Medium   | Medium |
| 9   | Silent failure on invalid IDs        | Low      | Low    |
| 10  | Missing aria-label on file inputs    | High     | Low    |
| 11  | Dropzone click double-trigger        | Medium   | Low    |
| 12  | Non-unique ID generation             | Low      | Low    |
