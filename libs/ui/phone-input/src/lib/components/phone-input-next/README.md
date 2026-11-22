# Phone Input Next

An international phone number: a country, searched by name, code or dial code, and the number, formatted as you type — its value the whole number in E.164. On libphonenumber-js. After react-phone-number-input, intl-tel-input and react-international-phone; being built to replace the current Phone Input of this entry.

## Architecture

```
div[scPhoneInputNext] (value — E.164 · country — two-way · defaultCountry · disabled, readonly)   — role group
├── div[scCombobox][scPhoneInputNextCountry] (countries · preferred) — your combobox: the country both ways; results()
│   ├── button[scComboboxTrigger] — img[scPhoneInputNextFlag], the dial code (phone.callingCode())
│   └── … your popup: search input, @for (item of country.results()) scComboboxItem
└── input[scPhoneInputNextNumber] (examples) — the number, formatted as you type
```

## Usage

```ts
// app.config.ts — the flags, served with your app (no CDN):
provideSemanticComponents({}, withPhoneInput({ flagUrl: '/flags/{XX}.svg' }));
```

```json
// project.json / angular.json — assets: country-flag-icons' SVGs at /flags
{ "glob": "*.svg", "input": "node_modules/country-flag-icons/3x2", "output": "flags" }
```

```html
<div scField>
  <label scLabel>Phone number</label>
  <div scPhoneInputNext #phone="scPhoneInputNext" defaultCountry="US" [formField]="form.phone">
    <div scCombobox scPhoneInputNextCountry #country="scPhoneInputNextCountry">
      <button scComboboxTrigger variant="ghost">
        <span class="sr-only">Country</span>
        <span scComboboxValue><img scPhoneInputNextFlag alt="" /> <span dir="ltr">+{{ phone.callingCode() }}</span></span>
        <svg siChevronDownIcon></svg>
      </button>
      <ng-template scComboboxPortal>…search input… @for (item of country.results(); track item.code) {…}</ng-template>
    </div>
    <input scPhoneInputNextNumber />
  </div>
</div>
```

## Country and number

- **Value:** the whole number, E.164 (`+33612345678`); empty when there is none. A Signal Forms control.
- **Dial code:** in the picker, apart from the number — it can't be deleted (intl-tel-input's `separateDialCode`). A number typed or pasted with `+` chooses its country.
- **Typing:** the country's format as you type; a separator typed first shows at once if the format has one there; Backspace over formatting removes the digit beyond it; the caret stays put. Without the trunk prefix (`6 12 34 56 78`), digits are grouped as the international format does.
- **The list:** every country with a numbering plan, named in the app's language (`LOCALE_ID`, `Intl.DisplayNames`). `countries` keeps only some; `preferred` puts some first, then the rest by name. `results()` matches the picker's search against the name (accents ignored), its initials (`uk`), the code (`fr`) and the dial code (`+33`, `33`).
- **Flags:** your app's (`withPhoneInput({ flagUrl })`, `{XX}`/`{xx}` the code); none set, none shown. Their corners are the style's `frameXs`.
- **Placeholder:** with `[examples]` (libphonenumber-js' `libphonenumber-js/mobile/examples`, imported by you — kept out of the bundle otherwise) an example number of the country, as it would be written; else your `placeholder`.
- **Validation:** `phoneNumberNext(path, { strict?, message? })` — by default the length fits the country (`isPossiblePhoneNumber`, react-phone-number-input's advice: numbering plans change); `strict`, the digits too (`isValidPhoneNumber`). Empty passes: add `required`.

## Accessibility

- The number is named by its field's label; the picker by your text ("Country"), its button reading that and the dial code.
- The number reads left to right in any language (`dir="ltr"`, aligned to the start of a right-to-left row) — its groups stay in order. Wrap the dial code you show in `dir="ltr"` too.
- The list is the Combobox's: arrows, type to search, Enter, Escape.

## Not here

Guessing the country from the IP (intl-tel-input's lookup: your code, into `defaultCountry`), number types (mobile, fixed line), extensions, native form posts.
