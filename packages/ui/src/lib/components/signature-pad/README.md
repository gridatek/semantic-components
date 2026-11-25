# Signature Pad

Sign with a pen, a mouse or a finger. One part, as signature_pad: the pad. Your buttons call it, your controls set its pen.

## Usage

```html
<div scSignaturePad #pad="scSignaturePad" [formField]="form.signature" aria-label="Signature"></div>

<button scButton variant="outline" (click)="pad.undo()" [disabled]="!pad.canUndo()">Undo</button>
<button scButton variant="outline" (click)="pad.clear()" [disabled]="pad.empty()">Clear</button>
```

Anything inside the pad (a line, "Sign here" in your words) shows under the ink.

## The pad

`div[scSignaturePad]`, in the style's textarea look (`h-40` by default; yours by class).

| Input                  | Type                  | Default          |                                    |
| ---------------------- | --------------------- | ---------------- | ---------------------------------- |
| `value`                | `ScSignature \| null` | `null`           | Two-way, or a `[formField]`        |
| `penColor`             | `string`              | `'currentColor'` | The next strokes' colour           |
| `penWidth`             | `number`              | `3`              | Their width, at an even pressure   |
| `disabled`, `readonly` | `boolean`             | `false`          | From the field, or set: no drawing |

Through `#pad="scSignaturePad"`: `empty()`, `canUndo()`, `undo()` (the last stroke), `clear()`.

## The value

`{ width, height, strokes: [{ points: [x, y, pressure][], color, width }] }`, or `null` before any stroke. Plain JSON: store it, give it back, and the pad draws it again fitted to its size. The pressure is a pen's, or a mouse's and a finger's speed (faster, thinner). A tap is a dot.

## Export

Functions on the value, so a stored signature exports without a pad, trimmed to its ink:

- `signatureToSvg(value, { padding })`: an SVG document (`''` without ink).
- `signatureToBlob(value, { type, quality, scale, padding })`: an image, PNG by default (transparent; others on white), at `scale` 2. In the browser only.

`currentColor` ink is exported black.

## Accessibility

- The pad is an image of the signature: name it (`aria-label`, `aria-labelledby`). In a `scField`, its errors and description are read with it; once touched and invalid, it is `aria-invalid`.
- Focused: Ctrl + Z takes the last stroke back, Delete or Backspace clears it.
- Drawing needs a pointer: offer a way to sign with a keyboard, such as a typed name as a second field, with the schema asking for one or the other (the "Type instead" demo).

## Not here

Redo, an eraser, a background image, a typed signature in the value (a separate field of yours); legal e-signatures (a signature here is a picture, with no proof of who drew it).
