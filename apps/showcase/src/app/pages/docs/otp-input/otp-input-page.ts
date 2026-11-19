import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AlphanumericOtpInputDemoContainer } from './demos/alphanumeric-otp-input-demo-container';
import { ControlledOtpInputDemoContainer } from './demos/controlled-otp-input-demo-container';
import { DigitsOnlyOtpInputDemoContainer } from './demos/digits-only-otp-input-demo-container';
import { DisabledOtpInputDemoContainer } from './demos/disabled-otp-input-demo-container';
import { FormOtpInputDemoContainer } from './demos/form-otp-input-demo-container';
import { FourDigitsOtpInputDemoContainer } from './demos/four-digits-otp-input-demo-container';
import { InvalidOtpInputDemoContainer } from './demos/invalid-otp-input-demo-container';
import { MaskedOtpInputDemoContainer } from './demos/masked-otp-input-demo-container';
import { NormalizationOtpInputDemoContainer } from './demos/normalization-otp-input-demo-container';
import { OtpInputUsageDemoContainer } from './demos/otp-input-usage-demo-container';
import { PlaceholderOtpInputDemoContainer } from './demos/placeholder-otp-input-demo-container';
import { RtlOtpInputDemoContainer } from './demos/rtl-otp-input-demo-container';
import { SeparatorOtpInputDemoContainer } from './demos/separator-otp-input-demo-container';
import { ServerValidationOtpInputDemoContainer } from './demos/server-validation-otp-input-demo-container';
import { VerificationOtpInputDemoContainer } from './demos/verification-otp-input-demo-container';

@Component({
  selector: 'app-otp-input-page',
  imports: [
    ScKbd,
    PartsTable,
    Anatomy,
    OtpInputUsageDemoContainer,
    DigitsOnlyOtpInputDemoContainer,
    AlphanumericOtpInputDemoContainer,
    FourDigitsOtpInputDemoContainer,
    SeparatorOtpInputDemoContainer,
    InvalidOtpInputDemoContainer,
    DisabledOtpInputDemoContainer,
    ControlledOtpInputDemoContainer,
    FormOtpInputDemoContainer,
    PlaceholderOtpInputDemoContainer,
    NormalizationOtpInputDemoContainer,
    MaskedOtpInputDemoContainer,
    VerificationOtpInputDemoContainer,
    ServerValidationOtpInputDemoContainer,
    RtlOtpInputDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scTypeset>OTP Input</h1>
        <p class="text-muted-foreground">
          A one-time code, one input per character, in the look of the
          app&apos;s style.
        </p>
        <app-component-badges path="otp-input" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-otp-input-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Base UI&apos;s OTP Field: one real input per character, in chunks
          (groups, each a joined box) with separators between them, in a row
          that holds the code — a [formField] or [(value)] — as long as its
          inputs. Its label, description and errors go round it, in a field.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            Real inputs: typing moves on, <kbd scKbd>Backspace</kbd> back;
            <kbd scKbd>←</kbd> and <kbd scKbd>→</kbd> move (mirrored right to
            left), <kbd scKbd>Home</kbd> and <kbd scKbd>End</kbd> to the ends;
            focus goes to the first empty input, so the code is entered in
            order.
          </li>
          <li>
            The inputs are a group named by the field&apos;s label; each input
            is named by its place, in your words, written once on the root
            (slotLabel=&quot;Character {{ '{' }}index{{ '}' }} of
            {{ '{' }}length{{ '}' }}&quot;) — an input&apos;s own aria-label wins.
            Clicking the label goes to the first. A description is read with
            them.
          </li>
          <li>
            The first input offers the code from an SMS
            (autocomplete=&quot;one-time-code&quot;); a pasted code fills them
            all.
          </li>
          <li>Invalid once left (aria-invalid on its inputs).</li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-digits-only-otp-input-demo-container />
        <app-alphanumeric-otp-input-demo-container />
        <app-four-digits-otp-input-demo-container />
        <app-separator-otp-input-demo-container />
        <app-invalid-otp-input-demo-container />
        <app-disabled-otp-input-demo-container />
        <app-controlled-otp-input-demo-container />
        <app-form-otp-input-demo-container />
        <app-placeholder-otp-input-demo-container />
        <app-normalization-otp-input-demo-container />
        <app-masked-otp-input-demo-container />
        <app-verification-otp-input-demo-container />
        <app-server-validation-otp-input-demo-container />
        <app-rtl-otp-input-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p class="text-muted-foreground">
          Each part takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">class</code>,
          merged over the style (cn: a later class wins).
        </p>
        <app-parts-table label="OTP Input parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class OtpInputPage {
  private readonly anatomy = {
    imports:
      "import { ScOtpInput, ScOtpInputGroup, ScOtpInputSlot, ScSeparator } from '@semantic-components/ui';",
    markup: [
      '<div scField>',
      '  <label scLabel>…</label>',
      '  <div scOtpInput [formField]="…" slotLabel="Character {index} of {length}">',
      '    <div scOtpInputGroup>',
      '      <input scOtpInputSlot />',
      '      <input scOtpInputSlot />',
      '    </div>',
      "    <div scSeparator></div>  <!-- the library's: a dash here -->",
      '    <div scOtpInputGroup>…</div>',
      '  </div>',
      '  <p scFieldErrors></p>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScOtpInput',
      selector: 'div[scOtpInput]',
      description:
        "The code (a [formField] or [(value)]), as long as its inputs; paste and SMS autofill spread over them. validationType ('numeric', 'alpha', 'alphanumeric', 'none'), normalizeValue, mask, readOnly; disabled and required from the schema. complete(); data-complete, data-filled, data-focused. The row of chunks and separators; its label, description and errors go round it, in a scField (the first input takes its id). A group, named by the field’s label; slotLabel: each input’s name, written once ({index}, {length}).",
    },
    {
      name: 'ScOtpInputGroup',
      selector: 'div[scOtpInputGroup]',
      description:
        "One chunk of inputs, joined into one box (the style's: separate boxes in some styles).",
    },
    {
      name: 'ScOtpInputSlot',
      selector: 'input[scOtpInputSlot]',
      description:
        'One character, on your input, named from the root\'s slotLabel ({index}, {length}) — its own aria-label wins. The first takes the field\'s id (the label goes to it) and autocomplete="one-time-code". data-filled; aria-invalid once the field is left invalid.',
    },
  ];
}
