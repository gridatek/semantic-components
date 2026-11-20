# QR Code

A QR code drawn as one SVG path, encoded with [`uqr`](https://github.com/unjs/uqr) (an optional peer of `@semantic-components/ui`, for this entry point) — and, from the same value, a file to download or print.

## Usage

```html
<svg scQrCode value="https://angular.dev" aria-label="QR code for angular.dev"></svg>
```

## The code

`svg[scQrCode]` (`exportAs: 'scQrCode'`):

| Input             | Type                       | Default  |                                                           |
| ----------------- | -------------------------- | -------- | --------------------------------------------------------- |
| `value`           | `string`                   | required | What it encodes: a URL, `mailto:`, `tel:`, `WIFI:`…       |
| `errorCorrection` | `'L' \| 'M' \| 'Q' \| 'H'` | `'M'`    | How much can be damaged and still read: 7, 15, 25, 30 %   |
| `margin`          | `number`                   | `4`      | The quiet zone round it, in modules (the spec asks for 4) |

`error()`: why the value can't be encoded (`'Data too long'`), or `null`. Then nothing is drawn; the code keeps its place, hidden.

## Colours

Dark on white in both themes (`bg-white text-black`): many scanners can't read a code inverted. Recolour with classes — the text colour for the dark modules, the background for the rest (`bg-blue-100 text-blue-800`) — keeping dark on light and strong contrast. Size it with `size-*` (`size-52` by default).

## Files

Functions on a value — no component needed (an email, a printed page):

- `qrCodeToSvg(value, options)`: an SVG document.
- `qrCodeToBlob(value, options)`: an image, PNG by default. In the browser only.

Options: `errorCorrection`, `margin`, `color` (`#000000`), `background` (`#ffffff`), `size` (1024 px, rounded down to whole pixels a module); for the blob, `type` and `quality`. Both throw when the value can't be encoded.

Saving a file is yours (see the Download demo): `URL.createObjectURL(blob)` on a link with `download`.

## Accessibility

- It is an image: name it (`aria-label`) for where it leads.
- Put the same link or text beside it, for whoever can't scan.
- A value too long to encode: say so from `error()`.
- It is never mirrored right to left.

## Not here

A logo in the middle; dot or corner shapes.
