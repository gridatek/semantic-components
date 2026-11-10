import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScHeading,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
} from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AlphanumericOtpFieldDemoContainer } from './demos/alphanumeric-otp-field-demo-container';
import { ControlledOtpFieldDemoContainer } from './demos/controlled-otp-field-demo-container';
import { DigitsOnlyOtpFieldDemoContainer } from './demos/digits-only-otp-field-demo-container';
import { DisabledOtpFieldDemoContainer } from './demos/disabled-otp-field-demo-container';
import { FormOtpFieldDemoContainer } from './demos/form-otp-field-demo-container';
import { FourDigitsOtpFieldDemoContainer } from './demos/four-digits-otp-field-demo-container';
import { InvalidOtpFieldDemoContainer } from './demos/invalid-otp-field-demo-container';
import { MaskedOtpFieldDemoContainer } from './demos/masked-otp-field-demo-container';
import { NormalizationOtpFieldDemoContainer } from './demos/normalization-otp-field-demo-container';
import { OtpFieldUsageDemoContainer } from './demos/otp-field-usage-demo-container';
import { PlaceholderOtpFieldDemoContainer } from './demos/placeholder-otp-field-demo-container';
import { RtlOtpFieldDemoContainer } from './demos/rtl-otp-field-demo-container';
import { SeparatorOtpFieldDemoContainer } from './demos/separator-otp-field-demo-container';
import { ServerValidationOtpFieldDemoContainer } from './demos/server-validation-otp-field-demo-container';
import { VerificationOtpFieldDemoContainer } from './demos/verification-otp-field-demo-container';

@Component({
  selector: 'app-otp-field-page',
  imports: [
    Anatomy,
    OtpFieldUsageDemoContainer,
    DigitsOnlyOtpFieldDemoContainer,
    AlphanumericOtpFieldDemoContainer,
    FourDigitsOtpFieldDemoContainer,
    SeparatorOtpFieldDemoContainer,
    InvalidOtpFieldDemoContainer,
    DisabledOtpFieldDemoContainer,
    ControlledOtpFieldDemoContainer,
    FormOtpFieldDemoContainer,
    PlaceholderOtpFieldDemoContainer,
    NormalizationOtpFieldDemoContainer,
    MaskedOtpFieldDemoContainer,
    VerificationOtpFieldDemoContainer,
    ServerValidationOtpFieldDemoContainer,
    RtlOtpFieldDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>OTP Field</h1>
        <p class="text-muted-foreground">
          A one-time code, one input per character, in the look of the
          app&apos;s preset.
        </p>
        <app-component-badges path="otp-field" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-otp-field-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Base UI&apos;s OTP Field: one real input per character, in chunks
          (groups, each a joined box) with separators between them, in a row
          that holds the code — a [formField] or [(value)] — as long as its
          inputs. Its label, description and errors go round it, in a field.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            Real inputs: typing moves on, Backspace back; Left and Right move
            (mirrored right to left), Home and End to the ends; focus goes to
            the first empty input, so the code is entered in order.
          </li>
          <li>
            The label names the first input (it takes the field&apos;s id); name
            the others (&quot;Character 2 of 6&quot;). A description is read
            with them.
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
        <h2 scHeading appToc>Examples</h2>
        <app-digits-only-otp-field-demo-container />
        <app-alphanumeric-otp-field-demo-container />
        <app-four-digits-otp-field-demo-container />
        <app-separator-otp-field-demo-container />
        <app-invalid-otp-field-demo-container />
        <app-disabled-otp-field-demo-container />
        <app-controlled-otp-field-demo-container />
        <app-form-otp-field-demo-container />
        <app-placeholder-otp-field-demo-container />
        <app-normalization-otp-field-demo-container />
        <app-masked-otp-field-demo-container />
        <app-verification-otp-field-demo-container />
        <app-server-validation-otp-field-demo-container />
        <app-rtl-otp-field-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          Each part takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">class</code>,
          merged over the preset (cn: a later class wins).
        </p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="OTP Field parts"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Part</th>
                <th scTableHeaderCell>Selector</th>
                <th scTableHeaderCell>Description</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (part of parts; track part.name) {
                <tr scTableRow>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ part.name }}</code>
                  </td>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ part.selector }}</code>
                  </td>
                  <td
                    scTableCell
                    class="text-muted-foreground whitespace-normal"
                  >
                    {{ part.description }}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class OtpFieldPage {
  protected readonly anatomy = {
    imports:
      "import { ScOtpField, ScOtpFieldGroup, ScOtpFieldInput, ScOtpFieldSeparator } from '@semantic-components/ui';",
    markup: [
      '<div scField>',
      '  <label scLabel>…</label>',
      '  <div scOtpField [formField]="…">',
      '    <div scOtpFieldGroup>',
      '      <input scOtpFieldInput />',
      '      <input scOtpFieldInput aria-label="Character 2 of 6" />',
      '    </div>',
      '    <div scOtpFieldSeparator>…</div>',
      '    <div scOtpFieldGroup>…</div>',
      '  </div>',
      '  <p scFieldErrors></p>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScOtpField',
      selector: 'div[scOtpField]',
      description:
        "The code (a [formField] or [(value)]), as long as its inputs; paste and SMS autofill spread over them. validationType ('numeric', 'alpha', 'alphanumeric', 'none'), normalizeValue, mask, readOnly; disabled and required from the schema. complete(); data-complete, data-filled, data-focused. The row of chunks and separators; its label, description and errors go round it, in a scField (the first input takes its id).",
    },
    {
      name: 'ScOtpFieldGroup',
      selector: 'div[scOtpFieldGroup]',
      description:
        "One chunk of inputs, joined into one box (the preset's: separate boxes in some styles).",
    },
    {
      name: 'ScOtpFieldInput',
      selector: 'input[scOtpFieldInput]',
      description:
        'One character, on your input. The first takes the field\'s id and autocomplete="one-time-code"; name the others ("Character 2 of 6"). data-filled; aria-invalid once the field is left invalid.',
    },
    {
      name: 'ScOtpFieldSeparator',
      selector: '[scOtpFieldSeparator]',
      description:
        'Between chunks (role="separator"): write its content (an icon, a dash, a dot).',
    },
  ];
}
