# QR Code

A QR code drawn as SVG, encoded with [`uqr`](https://github.com/unjs/uqr) (a peer dependency), and a button to download it as PNG or SVG.

## Usage

```html
<svg scQrCode value="https://angular.dev" aria-label="QR code for angular.dev"></svg>
```

```html
<svg scQrCode #qr="scQrCode" [value]="url()" aria-label="QR code for the event page"></svg>
<button scButton scQrCodeDownload [for]="qr" filename="event">PNG</button>
<button scButton scQrCodeDownload [for]="qr" filename="event" format="svg">SVG</button>
```

## Parts

### ScQrCode — `svg[scQrCode]` (`exportAs: 'scQrCode'`)

| Input        | Type                       | Default   | Description                                                     |
| ------------ | -------------------------- | --------- | --------------------------------------------------------------- |
| `value`      | `string`                   | required  | The text to encode (a URL, `mailto:`, `WIFI:`…)                 |
| `ecc`        | `'L' \| 'M' \| 'Q' \| 'H'` | `'M'`     | Error correction: 7 / 15 / 25 / 30 % of the code can be damaged |
| `quietZone`  | `number`                   | `4`       | Light margin around the code, in modules (the spec asks for 4)  |
| `minVersion` | `number`                   | `1`       | Smallest QR version (1–40): keeps the size stable while typing  |
| `boostEcc`   | `boolean`                  | `false`   | Use a higher error correction when it fits                      |
| `mask`       | `number`                   | automatic | Mask pattern (0–7)                                              |
| `aria-label` | attribute                  | none      | Its name — say what the code leads to (the library writes none) |
| `class`      | `string`                   | `''`      | Additional CSS classes                                          |

Signals: `valid()` (there's a code to show), `error()` (why the value can't be encoded, e.g. `'Data too long'`, or `null`), `modules()` (the module matrix, quiet zone included), `path()` (the dark modules as one SVG path).

- **Rendering:** one `<path>`, whatever the size.
- **Colors:** dark modules use the text color, the quiet zone the background: dark on white by default, in both themes (many scanners can't read inverted codes). Recolor with classes, keeping strong contrast: `class="bg-blue-100 text-blue-700"`. Size it with `size-*` (default `size-52`).
- **Too long:** a value that doesn't fit renders nothing and sets `error()` — it doesn't throw.

### ScQrCodeDownload — `button[scQrCodeDownload]`

Downloads the code, drawn from its modules — sharp at any size, in the colors shown on screen (white behind it when it has no background). Disabled while there's no code.

| Input      | Type             | Default    | Description                                              |
| ---------- | ---------------- | ---------- | -------------------------------------------------------- |
| `for`      | `ScQrCode`       | required   | The code to download (`#qr="scQrCode"`)                  |
| `filename` | `string`         | `'qrcode'` | File name, without extension                             |
| `format`   | `'png' \| 'svg'` | `'png'`    | File format                                              |
| `size`     | `number`         | `1024`     | Width in pixels, rounded down to whole pixels per module |
| `class`    | `string`         | `''`       | Additional CSS classes                                   |

## Accessibility

- The code is `role="img"` with an accessible name (the one you give it: `aria-label`). Name what it opens, and put the same link or text next to it for people who can't scan.
- Keep dark modules on a light background with strong contrast.
