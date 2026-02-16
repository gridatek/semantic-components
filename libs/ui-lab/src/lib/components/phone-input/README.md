# Phone Input

Phone number input with country code selector and formatting options.

## Components

- `ScPhoneInput` - Full phone input with searchable country dropdown
- `ScPhoneInputSimple` - Simple phone input with automatic formatting

## Usage

### With Country Selector

```html
<sc-phone-input [(value)]="phone" [(countryCode)]="country" defaultCountry="US" (countryChange)="onCountryChange($event)" />
```

### Simple Input (US Format)

```html
<sc-phone-input-simple [(value)]="phone" format="us" placeholder="(555) 555-5555" />
```

### Simple Input (International Format)

```html
<sc-phone-input-simple [(value)]="phone" format="international" placeholder="+1 555 555 5555" />
```

## API

### ScPhoneInput

| Input            | Type        | Default          | Description            |
| ---------------- | ----------- | ---------------- | ---------------------- |
| `class`          | `string`    | `''`             | Additional CSS classes |
| `placeholder`    | `string`    | `'Phone number'` | Placeholder text       |
| `disabled`       | `boolean`   | `false`          | Disable the input      |
| `defaultCountry` | `string`    | `'US'`           | Default country code   |
| `countries`      | `Country[]` | `COUNTRIES`      | Custom country list    |

| Output          | Type      | Description                          |
| --------------- | --------- | ------------------------------------ |
| `value`         | `string`  | Two-way binding for full number      |
| `countryCode`   | `string`  | Two-way binding for country code     |
| `valueChange`   | `string`  | Emits full number with dial code     |
| `countryChange` | `Country` | Emits when country selection changes |

| Method             | Returns                | Description                    |
| ------------------ | ---------------------- | ------------------------------ |
| `focus()`          | `void`                 | Focus the phone input          |
| `getFullNumber()`  | `string`               | Get full number with dial code |
| `getPhoneNumber()` | `string`               | Get phone number only          |
| `getCountry()`     | `Country \| undefined` | Get selected country           |

### ScPhoneInputSimple

| Input         | Type                                | Default            | Description            |
| ------------- | ----------------------------------- | ------------------ | ---------------------- |
| `class`       | `string`                            | `''`               | Additional CSS classes |
| `placeholder` | `string`                            | `'(555) 555-5555'` | Placeholder text       |
| `disabled`    | `boolean`                           | `false`            | Disable the input      |
| `showIcon`    | `boolean`                           | `true`             | Show phone icon        |
| `format`      | `'us' \| 'international' \| 'none'` | `'us'`             | Number format          |

| Output  | Type     | Description                     |
| ------- | -------- | ------------------------------- |
| `value` | `string` | Two-way binding for phone value |

| Method          | Returns  | Description                 |
| --------------- | -------- | --------------------------- |
| `focus()`       | `void`   | Focus the input             |
| `getRawValue()` | `string` | Get digits only (no format) |

## Country Interface

```typescript
interface Country {
  code: string; // ISO 3166-1 alpha-2 (e.g., 'US')
  name: string; // Full country name
  dialCode: string; // Dial code with + (e.g., '+1')
  flag: string; // Flag emoji
}
```

## Format Options

| Format          | Example Output    | Description                |
| --------------- | ----------------- | -------------------------- |
| `us`            | `(555) 555-5555`  | US phone number format     |
| `international` | `+1 555 555 5555` | International format       |
| `none`          | `5555555555`      | Digits only, no formatting |

## Utility Functions

```typescript
import { COUNTRIES, getCountryByCode, getCountryByDialCode } from './countries';

// Get all countries
const allCountries = COUNTRIES;

// Find country by ISO code
const usa = getCountryByCode('US');

// Find country by dial code
const uk = getCountryByDialCode('+44');
```

## Examples

### Contact Form

```html
<form class="space-y-4">
  <div>
    <label>Name</label>
    <input type="text" />
  </div>
  <div>
    <label>Phone</label>
    <sc-phone-input defaultCountry="US" />
  </div>
  <button type="submit">Submit</button>
</form>
```

### With Validation

```typescript
@Component({
  template: `
    <sc-phone-input #phone [(value)]="phoneNumber" />
    @if (phoneNumber() && phoneNumber().length < 10) {
      <p class="text-destructive text-sm">Please enter a valid phone number</p>
    }
  `,
})
export class PhoneForm {
  phoneNumber = signal('');
}
```

### Custom Country List

```typescript
const europeanCountries: Country[] = [
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
];

// In template
<sc-phone-input [countries]="europeanCountries" defaultCountry="GB" />
```

## Accessibility

- Country selector button has `aria-expanded` and `aria-haspopup`
- Country options have `role="option"` and `aria-selected`
- Search input in dropdown for easy filtering
- Keyboard navigation support (Enter to select, Escape to close)
- Phone icon is decorative (no aria-label needed)

## Included Countries

The default `COUNTRIES` array includes 50+ countries covering:

- North America (US, CA, MX)
- Europe (UK, DE, FR, IT, ES, etc.)
- Asia Pacific (JP, KR, CN, AU, SG, etc.)
- Middle East (AE, SA, IL)
- South America (BR, AR, CL, etc.)
- Africa (ZA, NG, KE, EG)
