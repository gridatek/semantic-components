# Signature Pad

Ink that follows the pen, a signature drawn or typed, its value plain data to store and draw again, and exports trimmed to the ink.

## Architecture

```
scSignaturePad (value — two-way, a [formField]; penColor, penWidth — two-way; disabled, readonly)
├── div[scSignaturePadSurface] — where you sign: SVG ink; name it
│   └── [scSignaturePadLine]    — your "Sign here" line and text
├── input[scSignaturePadText]   — the way without a pointer: a typed name is the signature
└── buttons: Undo, Redo, Clear; [scSignaturePadColor], [scSignaturePadWidth] (pressed while chosen)
```

## Usage

```html
<div scSignaturePad #pad="scSignaturePad" [formField]="form.signature">
  <div scSignaturePadSurface aria-label="Signature">
    <div scSignaturePadLine>× Sign here</div>
  </div>
  <button scSignaturePadUndo><svg siUndo2Icon></svg><span class="sr-only">Undo</span></button>
  <button scSignaturePadRedo><svg siRedo2Icon></svg><span class="sr-only">Redo</span></button>
  <button scSignaturePadClear size="sm">Clear</button>
</div>
```

## Value

`ScSignature | null` — plain JSON, to store and give back (the pad draws it again):

- drawn: `{ width, height, strokes: [{ points: [x, y, pressure][], color, width }] }` — `width` × `height` is the surface it was drawn on; given back, it fits any surface.
- typed: `{ text, font }` — the input's `font-family`.

A `[formField]`: put `required()` in the schema; `disabled`, `readonly`, `invalid` and `touched` come from it. In a `scField`, its errors describe the surface.

## Ink

Each stroke is a filled outline, wide as the pen is pressed — a pen's pressure, or, for a mouse or a finger, its speed (faster, thinner) — and smoothed. A tap is a dot. `penColor` (`currentColor` by default — the text's colour; black when exported) and `penWidth` (3) are two-way.

## Export

- `toSvg(padding?)` — an SVG document, trimmed to the ink.
- `toBlob(type?, { scale, padding }?)` — an image, PNG by default (transparent; others on white), trimmed, at `scale` (2).

A typed signature is exported in its font.

## Keyboard

The surface, focused: Ctrl+Z undo, Ctrl+Shift+Z or Ctrl+Y redo, Delete or Backspace clear. Drawing needs a pointer: `scSignaturePadText` is the way to sign with a keyboard — offer it.

## Accessibility

- Name the surface (`aria-label`, or `aria-labelledby`); it is an image of the signature.
- Offer the typed way (`scSignaturePadText`), labelled.
- Say when it is signed if it matters (a polite live region from `pad.empty()`).
- Colours and widths are `aria-pressed`; name them ("Blue", "Thick").

## Not here

An eraser, zoom, a background image, an uploaded image as the signature; legal e-signatures (a signature here is a picture, with no proof of who drew it).
