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
import { AlphanumericOtpFieldNextDemoContainer } from './demos/alphanumeric-otp-field-next-demo-container';
import { ControlledOtpFieldNextDemoContainer } from './demos/controlled-otp-field-next-demo-container';
import { DigitsOnlyOtpFieldNextDemoContainer } from './demos/digits-only-otp-field-next-demo-container';
import { DisabledOtpFieldNextDemoContainer } from './demos/disabled-otp-field-next-demo-container';
import { FormOtpFieldNextDemoContainer } from './demos/form-otp-field-next-demo-container';
import { FourDigitsOtpFieldNextDemoContainer } from './demos/four-digits-otp-field-next-demo-container';
import { InvalidOtpFieldNextDemoContainer } from './demos/invalid-otp-field-next-demo-container';
import { MaskedOtpFieldNextDemoContainer } from './demos/masked-otp-field-next-demo-container';
import { NormalizationOtpFieldNextDemoContainer } from './demos/normalization-otp-field-next-demo-container';
import { OtpFieldNextUsageDemoContainer } from './demos/otp-field-next-usage-demo-container';
import { PlaceholderOtpFieldNextDemoContainer } from './demos/placeholder-otp-field-next-demo-container';
import { RtlOtpFieldNextDemoContainer } from './demos/rtl-otp-field-next-demo-container';
import { SeparatorOtpFieldNextDemoContainer } from './demos/separator-otp-field-next-demo-container';
import { ServerValidationOtpFieldNextDemoContainer } from './demos/server-validation-otp-field-next-demo-container';
import { VerificationOtpFieldNextDemoContainer } from './demos/verification-otp-field-next-demo-container';

@Component({
  selector: 'app-otp-field-next-page',
  imports: [
    Anatomy,
    OtpFieldNextUsageDemoContainer,
    DigitsOnlyOtpFieldNextDemoContainer,
    AlphanumericOtpFieldNextDemoContainer,
    FourDigitsOtpFieldNextDemoContainer,
    SeparatorOtpFieldNextDemoContainer,
    InvalidOtpFieldNextDemoContainer,
    DisabledOtpFieldNextDemoContainer,
    ControlledOtpFieldNextDemoContainer,
    FormOtpFieldNextDemoContainer,
    PlaceholderOtpFieldNextDemoContainer,
    NormalizationOtpFieldNextDemoContainer,
    MaskedOtpFieldNextDemoContainer,
    VerificationOtpFieldNextDemoContainer,
    ServerValidationOtpFieldNextDemoContainer,
    RtlOtpFieldNextDemoContainer,
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
        <h1 scHeading>OTP Field Next</h1>
        <p class="text-muted-foreground">
          A one-time code, one input per character, in the look of the
          app&apos;s preset.
        </p>
        <app-component-badges path="otp-field-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-otp-field-next-usage-demo-container />
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
        <app-digits-only-otp-field-next-demo-container />
        <app-alphanumeric-otp-field-next-demo-container />
        <app-four-digits-otp-field-next-demo-container />
        <app-separator-otp-field-next-demo-container />
        <app-invalid-otp-field-next-demo-container />
        <app-disabled-otp-field-next-demo-container />
        <app-controlled-otp-field-next-demo-container />
        <app-form-otp-field-next-demo-container />
        <app-placeholder-otp-field-next-demo-container />
        <app-normalization-otp-field-next-demo-container />
        <app-masked-otp-field-next-demo-container />
        <app-verification-otp-field-next-demo-container />
        <app-server-validation-otp-field-next-demo-container />
        <app-rtl-otp-field-next-demo-container />
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
          aria-label="OTP Field Next parts"
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
export default class OtpFieldNextPage {
  protected readonly anatomy = {
    imports:
      "import { ScOtpFieldNext, ScOtpFieldNextGroup, ScOtpFieldNextInput, ScOtpFieldNextSeparator } from '@semantic-components/ui';",
    markup: [
      '<div scField>',
      '  <label scLabel>…</label>',
      '  <div scOtpFieldNext [formField]="…">',
      '    <div scOtpFieldNextGroup>',
      '      <input scOtpFieldNextInput />',
      '      <input scOtpFieldNextInput aria-label="Character 2 of 6" />',
      '    </div>',
      '    <div scOtpFieldNextSeparator>…</div>',
      '    <div scOtpFieldNextGroup>…</div>',
      '  </div>',
      '  <p scFieldErrors></p>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScOtpFieldNext',
      selector: 'div[scOtpFieldNext]',
      description:
        "The code (a [formField] or [(value)]), as long as its inputs; paste and SMS autofill spread over them. validationType ('numeric', 'alpha', 'alphanumeric', 'none'), normalizeValue, mask, readOnly; disabled and required from the schema. complete(); data-complete, data-filled, data-focused. The row of chunks and separators; its label, description and errors go round it, in a scField (the first input takes its id).",
    },
    {
      name: 'ScOtpFieldNextGroup',
      selector: 'div[scOtpFieldNextGroup]',
      description:
        "One chunk of inputs, joined into one box (the preset's: separate boxes in some styles).",
    },
    {
      name: 'ScOtpFieldNextInput',
      selector: 'input[scOtpFieldNextInput]',
      description:
        'One character, on your input. The first takes the field\'s id and autocomplete="one-time-code"; name the others ("Character 2 of 6"). data-filled; aria-invalid once the field is left invalid.',
    },
    {
      name: 'ScOtpFieldNextSeparator',
      selector: '[scOtpFieldNextSeparator]',
      description:
        'Between chunks (role="separator"): write its content (an icon, a dash, a dot).',
    },
  ];
}
