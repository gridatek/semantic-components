# QR Code

Generate QR codes from text or URLs with customizable colors and optional logo support.

## Components

- `ScQrCode` - Basic QR code generator
- `ScQrCodeDownload` - QR code with download button

## Usage

```html
<sc-qr-code [value]="'https://example.com'" [size]="200" />
```

## API

### ScQrCode

| Input                  | Type                       | Default     | Description            |
| ---------------------- | -------------------------- | ----------- | ---------------------- |
| `value`                | `string`                   | _required_  | Text or URL to encode  |
| `size`                 | `number`                   | `200`       | Size in pixels         |
| `errorCorrectionLevel` | `'L' \| 'M' \| 'Q' \| 'H'` | `'M'`       | Error correction level |
| `foregroundColor`      | `string`                   | `'#000000'` | Module color           |
| `backgroundColor`      | `string`                   | `'#ffffff'` | Background color       |
| `quietZone`            | `number`                   | `2`         | Quiet zone modules     |
| `logo`                 | `string`                   | `''`        | Logo image URL         |
| `logoSize`             | `number`                   | `0.2`       | Logo size (0-1)        |
| `ariaLabel`            | `string`                   | `'QR Code'` | Accessibility label    |
| `class`                | `string`                   | -           | Additional CSS classes |

### ScQrCodeDownload

Extends `ScQrCode` with:

| Input           | Type      | Default      | Description          |
| --------------- | --------- | ------------ | -------------------- |
| `showDownload`  | `boolean` | `true`       | Show download button |
| `downloadLabel` | `string`  | `'Download'` | Button label         |
| `filename`      | `string`  | `'qrcode'`   | Download filename    |

### Error Correction Levels

| Level | Recovery | Use Case              |
| ----- | -------- | --------------------- |
| `L`   | ~7%      | Clean environments    |
| `M`   | ~15%     | General use (default) |
| `Q`   | ~25%     | Industrial use        |
| `H`   | ~30%     | With logo overlay     |

## Examples

### Basic QR Code

```html
<sc-qr-code [value]="'https://example.com'" />
```

### Custom Colors

```html
<sc-qr-code [value]="'Hello World'" [foregroundColor]="'#1d4ed8'" [backgroundColor]="'#dbeafe'" />
```

### With Logo

Use high error correction when adding a logo:

```html
<sc-qr-code [value]="'https://example.com'" [errorCorrectionLevel]="'H'" [logo]="'/assets/logo.svg'" [logoSize]="0.25" />
```

### Different Sizes

```html
<sc-qr-code [value]="'Small'" [size]="100" />
<sc-qr-code [value]="'Medium'" [size]="150" />
<sc-qr-code [value]="'Large'" [size]="200" />
```

### With Download

```html
<sc-qr-code-download [value]="'https://example.com'" [filename]="'my-qr-code'" [downloadLabel]="'Save QR Code'" />
```

### Common Use Cases

```html
<!-- Website URL -->
<sc-qr-code [value]="'https://example.com'" />

<!-- Phone number -->
<sc-qr-code [value]="'tel:+1234567890'" />

<!-- Email -->
<sc-qr-code [value]="'mailto:hello@example.com'" />

<!-- WiFi -->
<sc-qr-code [value]="'WIFI:T:WPA;S:NetworkName;P:password;;'" />

<!-- SMS -->
<sc-qr-code [value]="'sms:+1234567890?body=Hello'" />

<!-- vCard -->
<sc-qr-code [value]="'BEGIN:VCARD\nVERSION:3.0\nN:Doe;John\nEND:VCARD'" />
```

## Features

- Pure TypeScript QR code generation (no external dependencies)
- SVG-based rendering for sharp display at any size
- Customizable colors
- Logo overlay support
- Multiple error correction levels
- Adjustable quiet zone
- Download as PNG

## Accessibility

- ARIA role="img" with customizable label
- High contrast between modules and background
- Works with screen readers
