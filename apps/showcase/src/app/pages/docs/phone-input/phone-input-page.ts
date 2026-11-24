import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import {
  type ApiInput,
  ApiTable,
} from '../../../components/api-table/api-table';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { DocCode } from '../../../components/doc-code/doc-code';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { PackageManagerInstall } from '../../../components/package-manager-install/package-manager-install';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { DisabledPhoneInputDemoContainer } from './demos/disabled-phone-input-demo-container';
import { ExamplePhoneInputDemoContainer } from './demos/example-phone-input-demo-container';
import { FormPhoneInputDemoContainer } from './demos/form-phone-input-demo-container';
import { OnlyPhoneInputDemoContainer } from './demos/only-phone-input-demo-container';
import { PhoneInputUsageDemoContainer } from './demos/phone-input-usage-demo-container';
import { PreferredPhoneInputDemoContainer } from './demos/preferred-phone-input-demo-container';
import { RtlPhoneInputDemoContainer } from './demos/rtl-phone-input-demo-container';

@Component({
  selector: 'app-phone-input-page',
  imports: [
    ScTypeset,
    Anatomy,
    DocCode,
    EntryInstall,
    PackageManagerInstall,
    ApiTable,
    PartsTable,
    TocHeading,
    ComponentBadges,
    PhoneInputUsageDemoContainer,
    PreferredPhoneInputDemoContainer,
    OnlyPhoneInputDemoContainer,
    ExamplePhoneInputDemoContainer,
    FormPhoneInputDemoContainer,
    DisabledPhoneInputDemoContainer,
    RtlPhoneInputDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Phone Input</h1>
        <p class="text-muted-foreground">
          An international phone number: a country, searched by name, code or
          dial code, and the number, formatted as you type — its value the whole
          number in E.164. On libphonenumber-js.
        </p>
        <app-component-badges path="phone-input" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Installation</h2>
        <app-entry-install
          entry="phone-input"
          library="libphonenumber-js"
          href="https://gitlab.com/catamphetamine/libphonenumber-js"
          names="ScPhoneInput, ScPhoneInputCountry, ScPhoneInputFlag, ScPhoneInputNumber, phoneNumber"
        />
        <h3 scTypeset>Flags</h3>
        <p>
          The flags are country-flag-icons&apos; SVGs, served with your app — no
          CDN. Install it, copy them into your assets, and say where they are
          with <code scTypeset>withPhoneInput()</code>; only the flags shown are
          loaded. Without it, the phone input works with no flags.
        </p>
        <app-package-manager-install packages="country-flag-icons" />
        <app-doc-code [code]="asset" language="json" />
        <app-doc-code [code]="setup" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-phone-input-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          The group, the picker — your
          <code scTypeset>scCombobox</code>, its list from
          <code scTypeset>results()</code> — and the number.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Country and number</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The value is the whole number, E.164 (<code scTypeset
              >+33612345678</code
            >), empty when there is none. The dial code shows in the picker,
            apart from the number: it can&apos;t be deleted. A number typed or
            pasted with <code scTypeset>+</code> chooses its country.
          </li>
          <li>
            The list: every country with a numbering plan, named in the
            app&apos;s language (<code scTypeset>LOCALE_ID</code>) —
            <code scTypeset>countries</code> to keep only some,
            <code scTypeset>preferred</code> to put some first. Typed in its
            search: a name (accents ignored), its initials, the code (<code
              scTypeset
              >fr</code
            >) or the dial code (<code scTypeset>+33</code>).
          </li>
          <li>
            The flags are your app&apos;s: country-flag-icons&apos; SVGs copied
            by your build&apos;s assets, and their address given once —
            <code scTypeset
              >withPhoneInput(&#123; flagUrl: '/flags/&#123;XX&#125;.svg'
              &#125;)</code
            >. None set, no flag.
          </li>
          <li>
            Validation: <code scTypeset>phoneNumber()</code> checks the length
            fits the country (numbering plans change: a stricter check can
            refuse real numbers); <code scTypeset>strict</code>, the digits too.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The number is named by its field&apos;s label; name the picker
            (&quot;Country&quot;) — its button reads that and the dial code.
          </li>
          <li>
            The number reads left to right in any language (<code scTypeset
              >dir="ltr"</code
            >): its groups stay in order.
          </li>
          <li>
            The list is the Combobox&apos;s: arrows, typing to search, Enter to
            choose, Escape to close.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-preferred-phone-input-demo-container />
        <app-only-phone-input-demo-container />
        <app-example-phone-input-demo-container />
        <app-form-phone-input-demo-container />
        <app-disabled-phone-input-demo-container />
        <app-rtl-phone-input-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          From <code scTypeset>@semantic-components/ui/phone-input</code>. Each
          part takes <code scTypeset>class</code>, merged over its own (cn: a
          later class wins).
        </p>
        <app-parts-table label="Phone Input parts" [parts]="parts" />
        <app-api-table label="ScPhoneInput inputs" [inputs]="inputs" />
        <app-api-table
          label="ScPhoneInputCountry inputs"
          [inputs]="countryInputs"
        />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class PhoneInputPage {
  private readonly asset = [
    '// angular.json (or project.json): the flags, in the assets',
    '{',
    '  "glob": "*.svg",',
    '  "input": "node_modules/country-flag-icons/3x2",',
    '  "output": "flags"',
    '}',
  ].join('\n');

  private readonly setup = [
    "import { withPhoneInput } from '@semantic-components/ui/phone-input';",
    '',
    'provideSemanticComponents(',
    '  { preset: { style } },',
    "  withPhoneInput({ flagUrl: '/flags/{XX}.svg' }),",
    ');',
  ].join('\n');

  private readonly anatomy = {
    imports:
      "import { ScPhoneInput, ScPhoneInputCountry, ScPhoneInputFlag, ScPhoneInputNumber } from '@semantic-components/ui/phone-input';",
    markup: [
      '<div scPhoneInput #phone="scPhoneInput" [formField]="form.phone">',
      '  <div scCombobox scPhoneInputCountry #country="scPhoneInputCountry">',
      '    <button scComboboxTrigger variant="ghost">',
      '      <img scPhoneInputFlag alt="" /> +{{ phone.callingCode() }} …',
      '    </button>',
      '    … @for (item of country.results(); track item.code) { <div scComboboxItem [value]="item.code">…</div> }',
      '  </div>',
      '  <input scPhoneInputNumber />',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScPhoneInput',
      selector: 'div[scPhoneInput]',
      description:
        'The group: the value (E.164), the country. exportAs: callingCode(), text(), focus().',
    },
    {
      name: 'ScPhoneInputCountry',
      selector: 'div[scCombobox][scPhoneInputCountry]',
      description:
        'On your combobox: the country both ways. exportAs: results(), all().',
    },
    {
      name: 'ScPhoneInputNumber',
      selector: 'input[scPhoneInputNumber]',
      description:
        'The number, formatted as you type; examples for a placeholder.',
    },
    {
      name: 'ScPhoneInputFlag',
      selector: 'img[scPhoneInputFlag]',
      description: 'A flag, from withPhoneInput({ flagUrl }).',
    },
  ];

  private readonly inputs: ApiInput[] = [
    {
      name: 'value',
      type: 'string',
      default: "''",
      description: 'Two-way, or [formField]: E.164.',
    },
    {
      name: 'country',
      type: 'ScPhoneCountryCode | undefined',
      default: 'undefined',
      description: 'Two-way: the country chosen.',
    },
    {
      name: 'defaultCountry',
      type: 'ScPhoneCountryCode',
      default: '—',
      description: 'The country to start with.',
    },
    {
      name: 'disabled, readonly, required, invalid, touched',
      type: 'boolean',
      default: 'false',
      description: 'Bound by [formField].',
    },
  ];

  private readonly countryInputs: ApiInput[] = [
    {
      name: 'countries',
      type: 'ScPhoneCountryCode[] | null',
      default: 'null',
      description: 'Only these; all, by default.',
    },
    {
      name: 'preferred',
      type: 'ScPhoneCountryCode[]',
      default: '[]',
      description: 'These first, in this order.',
    },
  ];
}
