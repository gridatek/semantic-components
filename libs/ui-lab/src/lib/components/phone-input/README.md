# Phone Input

An international phone number: a country picker and a number field that formats as you type. Parsing, formatting and validation come from [`libphonenumber-js`](https://gitlab.com/catamphetamine/libphonenumber-js) (a peer dependency).

The value is the full international number (`+33612345678`), or `''` while nothing is typed. It's what was typed, not necessarily a valid number — validate it with `phoneNumber()`.

## Usage

```html
<div scField>
  <label scLabel>Phone number</label>
  <div scPhoneInput [formField]="contactForm.phone" defaultCountry="US" #phone="scPhoneInput">
    <div scCombobox scPhoneInputCountry>
      <div scComboboxTrigger aria-label="Country">
        <span scComboboxValue>{{ phone.country() }} +{{ phone.callingCode() }}</span>
        <svg scComboboxIcon siChevronDownIcon></svg>
      </div>
      <ng-template scComboboxPortal>
        <div scComboboxPopup>
          <!-- search box, then the list -->
          <ng-template scComboboxListContainer>
            <div scComboboxList>
              @for (country of countries; track country.code) {
              <div scComboboxItem [value]="country.code" [label]="country.name">
                <span scComboboxItemLabel>{{ country.name }} +{{ country.callingCode }}</span>
              </div>
              }
            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>
    <input scPhoneInputNumber />
  </div>
  <div scFieldErrors></div>
</div>
```

```typescript
readonly countries = phoneCountries('en');
readonly model = signal({ phone: '' });
readonly contactForm = form(this.model, (s) => {
  required(s.phone);
  phoneNumber(s.phone);
});
```

The country picker is a regular `scCombobox` (see Combobox): the trigger content, the list and its filtering are yours. Flags too — put them in your template (flag emoji don't render on Windows, so prefer images).

## Parts

### ScPhoneInput — `div[scPhoneInput]` (`exportAs: 'scPhoneInput'`)

Holds the state and draws the group (border, focus ring, invalid state). A Signal Forms control: bind it with `[formField]`, or `[(value)]`.

| Input / model    | Type                              | Default | Description                   |
| ---------------- | --------------------------------- | ------- | ----------------------------- |
| `[(value)]`      | `string`                          | `''`    | The full international number |
| `[(country)]`    | `ScPhoneCountryCode \| undefined` | —       | The selected country (`'FR'`) |
| `defaultCountry` | `ScPhoneCountryCode`              | —       | The country to start with     |
| `disabled`       | `boolean`                         | `false` | Bound by `[formField]`        |
| `readonly`       | `boolean`                         | `false` | Bound by `[formField]`        |
| `class`          | `string`                          | `''`    | Additional CSS classes        |

Signals: `callingCode()` (`'33'`), `text()` (the formatted number as shown).

- Typing or pasting a number that starts with `+` switches the country (`+44…` → GB).
- Switching the country keeps the national digits typed so far.
- A value set from outside (initial value, form reset) is parsed: the country follows it and the number is shown in its national format.

### ScPhoneInputCountry — `div[scCombobox][scPhoneInputCountry]`

Makes the combobox the country picker: its value is the country code, kept in sync both ways. Disabled and read-only follow the phone input.

### ScPhoneInputNumber — `input[scPhoneInputNumber]`

The number (`type="tel"`, `autocomplete="tel"`). Formats as you type — in the country's national format, or international after a `+` — and keeps the caret in place. Backspace or Delete next to a space or bracket removes the digit beyond it. Labelled by the field's label.

### phoneCountries(locale?)

Every country with a numbering plan, as `ScPhoneCountry` (`{ code, name, callingCode }`), named in `locale` with `Intl.DisplayNames` and sorted by name.

### phoneNumber(path, { message? })

Signal Forms rule: a non-empty value must be a valid phone number (error kind `phoneNumber`). Add `required()` to refuse an empty one.

## Accessibility

- The phone input is a `role="group"`; the number field is labelled by the field's `scLabel`, the country trigger by its `aria-label`.
- `aria-invalid` on the number field once the control is touched and invalid; errors from `scFieldErrors` are linked through the field.
- The country picker is a combobox with a searchable listbox (see Combobox).
