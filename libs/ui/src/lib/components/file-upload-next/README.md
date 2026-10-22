# File Upload Next

The file upload, rebuilt: files picked or dropped — only chosen, never uploaded — as a `File[]` for Signal Forms; those that break a rule kept out, with the reason.

## Architecture

```
[scFileUploadNext] (value: File[] — a [formField]; multiple, accept, maxSize, maxFiles, disabled)
│  rejections() · browse() · add(files) · remove(file)
├── input[scFileUploadNextInput]        — the native picker: hidden, not a Tab stop
├── [scFileUploadNextDropzone]          — drop here, or click; data-dragging, data-invalid
│   └── button[scFileUploadNextTrigger] — opens the picker (the keyboard's way)
└── ul[scFileUploadNextList]
    └── li[scFileUploadNextItem] [file]
        ├── [scFileUploadNextItemPreview]     — an image's thumbnail, or your icon
        ├── [scFileUploadNextItemName]        — your {{ file.name }}
        ├── [scFileUploadNextItemSize]        — "1.5 MB", in the app's language
        └── button[scFileUploadNextItemRemove] — takes it out; name it
```

## Usage

```html
<div scFileUploadNext #upload="scFileUploadNext" multiple [formField]="form.documents">
  <input scFileUploadNextInput />
  <div scFileUploadNextDropzone>
    <p>Drop files here</p>
    <button scFileUploadNextTrigger size="sm">Browse files</button>
  </div>
  <ul scFileUploadNextList aria-label="Chosen files">
    @for (file of upload.value(); track file) {
    <li scFileUploadNextItem [file]="file">
      <span scFileUploadNextItemPreview><svg siFileIcon></svg></span>
      <span scFileUploadNextItemName>{{ file.name }}</span>
      <span scFileUploadNextItemSize></span>
      <button scFileUploadNextItemRemove>
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
