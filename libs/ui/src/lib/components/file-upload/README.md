# File Upload

Files picked or dropped — only chosen, never uploaded — as a `File[]` for Signal Forms; those that break a rule kept out, with the reason.

## Architecture

```
[scFileUpload] (value: File[] — a [formField]; multiple, accept, maxSize, maxFiles, disabled)
│  rejections() · browse() · add(files) · remove(file)
├── input[scFileUploadInput]        — the native picker: hidden, not a Tab stop
├── [scFileUploadDropzone]          — drop here, or click; data-dragging, data-invalid
│   └── button[scFileUploadTrigger] — opens the picker (the keyboard's way)
└── ul[scFileUploadList]
    └── li[scFileUploadItem] [file]
        ├── [scFileUploadItemPreview]     — an image's thumbnail, or your icon
        ├── [scFileUploadItemName]        — your {{ file.name }}
        ├── [scFileUploadItemSize]        — "1.5 MB", in the app's language
        └── button[scFileUploadItemRemove] — takes it out; name it
```

## Usage

```html
<div scFileUpload #upload="scFileUpload" multiple [formField]="form.documents">
  <input scFileUploadInput />
  <div scFileUploadDropzone>
    <p>Drop files here</p>
    <button scFileUploadTrigger size="sm">Browse files</button>
  </div>
  <ul scFileUploadList aria-label="Chosen files">
    @for (file of upload.value(); track file) {
    <li scFileUploadItem [file]="file">
      <span scFileUploadItemPreview><svg siFileIcon></svg></span>
      <span scFileUploadItemName>{{ file.name }}</span>
      <span scFileUploadItemSize></span>
      <button scFileUploadItemRemove>
        <svg siXIcon></svg>
        <span class="sr-only">Remove {{ file.name }}</span>
      </button>
    </li>
    }
  </ul>
</div>
```

## Value

- A `File[]`: two-way `[(value)]`, or a `[formField]`.
- With `multiple`, picks and drops add; without, a new file replaces the one there.
- Chosen, not uploaded: upload them yourself (`HttpClient`, tus…), and keep any progress in your own state, per `File`.

## Rules

- `accept` (as `<input accept>`: `image/*`, `.pdf`, `text/csv`), `maxSize` (bytes), `maxFiles` (in all, with `multiple`).
- Files that break one are kept out; `rejections()` lists them — `{ file, reason: 'type' | 'size' | 'count' }` — until the next pick or drop. The messages are yours.

## Signal Forms

- Rules on the files (at least one, a total size) go in the schema: `minLength(path, 1)` — `required` does not count an empty list as empty — and `validate()`.
- Touched when the picker closes, or after a drop; once touched and invalid, `data-invalid` on the dropzone and `aria-invalid` on the trigger.

## Accessibility

- The trigger is the way in by keyboard; the dropzone's click is a mouse shortcut, and dropping a pointer one.
- Name the list, and each remove button ("Remove report.pdf"); say rejections in a live region.
- Thumbnails are decorative (`alt=""`): the name is beside them.

## Not here

Uploading, pasting, folders, keeping a missed drop from opening the file in the page, cropping (the image cropper).
