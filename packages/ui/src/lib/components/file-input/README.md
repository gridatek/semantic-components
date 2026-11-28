# File Input

Files picked, dropped or pasted — chosen, never uploaded — as a `File[]` for Signal Forms; those that break a rule kept out, with every reason. After ui-sdk's File Input; it replaced the File Upload (2026-11-22).

## Architecture

```
div[scFileInput] ([(value)] / [formField], multiple, accept, minSize, maxSize, maxFiles, validate,
│                 directory, capture, disabled)  — writes the native picker itself (hidden)
│  open() · add() · remove() · clear() · focus() · rejections() · lastChange()
├── button[scFileInputTrigger]       — opens the picker; in a field, the label opens it too
├── [scFileInputDropzone]            — drops (target: self | document) and pastes (pasteTarget)
├── ul[scFileInputList]              — one Tab stop: arrows, Home, End; Delete removes
│   └── li[scFileInputItem] [file]
│       ├── [scFileInputItemPreview] — an image's thumbnail, or your icon
│       ├── {{ file.name }}          — yours
│       ├── [scFileInputItemSize]    — "1.5 MB", in the app's language
│       └── button[scFileInputItemRemove] — out of the Tab order; name it
└── [scFileInputStatus]              — polite live region: your words from lastChange()
```

## Usage

```html
<div scFileInput #files="scFileInput" multiple [formField]="form.documents">
  <div scFileInputDropzone>
    <p>Drop or paste files here</p>
    <button scFileInputTrigger size="sm">Browse files</button>
  </div>
  <ul scFileInputList aria-label="Chosen files">
    @for (file of files.value(); track file) {
    <li scFileInputItem [file]="file">
      <span scFileInputItemPreview><svg siFileIcon></svg></span>
      {{ file.name }}
      <span scFileInputItemSize></span>
      <button scFileInputItemRemove>
        <svg siXIcon></svg>
        <span class="sr-only">Remove {{ file.name }}</span>
      </button>
    </li>
    }
  </ul>
</div>
```

A trigger alone is an upload button; the dropzone and the list are optional.

## Value and rules

- A `File[]`: two-way `[(value)]`, or a `[formField]`. With `multiple` (or `directory`), files are added; without, a new one replaces it.
- `accept` (a string or a list: `image/*`, `.pdf`, `text/csv`), `minSize`, `maxSize` (bytes, per file), `maxFiles` (in all), and `validate(file, { accepted })` — your reason (`'duplicate'`) or nothing; `accepted` are the files taken so far from the same pick.
- Files kept out are in `rejections()` — `{ file, reasons }`: `file-type`, `file-too-small`, `file-too-large`, `too-many-files`, or yours — until the next pick, drop or paste. The first files that fit are taken. The words are yours.
- `lastChange()`: `{ reason: 'picker' | 'drop' | 'paste' | 'remove-press' | 'imperative', added, removed, rejected }` — to announce.
- Chosen, not uploaded: upload them yourself and keep any progress in your own state, per `File`.
- In Signal Forms, `required()` doesn't count an empty list as empty: `minLength(path, 1)`. Touched when the picker closes, after a drop or a paste.

## Dropping and pasting

- `target="document"`: a drop anywhere on the page (a drop on another zone stays there) — style it as an overlay shown with `data-dragging`.
- While files are dragged over: `data-dragging`, and `data-drag-accept` or `data-drag-reject` (their types against `accept`, their count against what's left). Text, and drags that start in the page, are left alone.
- Pasted files are added: in the dropzone (`pasteTarget` `'self'`, by default), the whole page (`'document'`), an element of yours (a message's textarea), or nowhere (`null`). Pasted text is left to the field.
- Folders dropped are read through (up to 1,000 files, system files left out); `fileRelativePath(file)` gives a file's path in it. `directory` picks a folder.
- `capture`: the camera on a phone (`'environment'`, `'user'`).

## Accessibility

- The trigger is the way in; the dropzone is not a control and not a Tab stop. In a field, the first trigger takes the field's id: the label opens the picker and, with the trigger's text, names it.
- The native picker is hidden, out of the Tab order and the accessibility tree — and still named, by the first trigger (`aria-labelledby`; every trigger has an id: in a field the field's, else its own). A form control with no label is an error to WAVE, hidden or not; Zag's file upload (Ark UI, Chakra) names its hidden input the same way. React Aria's `FileTrigger` leaves it unnamed; MUI puts it inside a `<label>` styled as a button.
- The list is one Tab stop; its items are focusable and read as what they hold. Name the list and each remove button.
- `scFileInputStatus`: what was added, removed, kept out — your words.

## Look

The style's `fileInput` key, written from each style's own parts: `dropzone` as its Empty (corners, padding, the icon in its muted box), `item` as its outline Item at size sm, `preview` as the Item's image media, `size` as the Item's description. The trigger and the remove buttons are the style's buttons.

## Helpers

`formatFileSize(bytes, locale)` — "68 bytes", "2 kB", "1.5 MB"; `fileRelativePath(file)`.

## Not here

Uploading, native form submission (`name`; Signal Forms only), cropping (the Image Cropper).
