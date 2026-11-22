import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScKbd,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
  ScTypeset,
} from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import {
  type ApiInput,
  ApiTable,
} from '../../../components/api-table/api-table';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AllFeaturesColorPickerNextDemoContainer } from './demos/all-features-color-picker-next-demo-container';
import { ColorPickerNextUsageDemoContainer } from './demos/color-picker-next-usage-demo-container';
import { CommitColorPickerNextDemoContainer } from './demos/commit-color-picker-next-demo-container';
import { DisabledColorPickerNextDemoContainer } from './demos/disabled-color-picker-next-demo-container';
import { FormColorPickerNextDemoContainer } from './demos/form-color-picker-next-demo-container';
import { OklchColorPickerNextDemoContainer } from './demos/oklch-color-picker-next-demo-container';
import { PopoverColorPickerNextDemoContainer } from './demos/popover-color-picker-next-demo-container';
import { PresetsColorPickerNextDemoContainer } from './demos/presets-color-picker-next-demo-container';
import { ReadOnlyColorPickerNextDemoContainer } from './demos/read-only-color-picker-next-demo-container';
import { RtlColorPickerNextDemoContainer } from './demos/rtl-color-picker-next-demo-container';
import { SpacesColorPickerNextDemoContainer } from './demos/spaces-color-picker-next-demo-container';

@Component({
  selector: 'app-color-picker-next-page',
  imports: [
    ScKbd,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    ScTypeset,
    Anatomy,
    ApiTable,
    PartsTable,
    TocHeading,
    ComponentBadges,
    ColorPickerNextUsageDemoContainer,
    AllFeaturesColorPickerNextDemoContainer,
    SpacesColorPickerNextDemoContainer,
    OklchColorPickerNextDemoContainer,
    PresetsColorPickerNextDemoContainer,
    PopoverColorPickerNextDemoContainer,
    DisabledColorPickerNextDemoContainer,
    ReadOnlyColorPickerNextDemoContainer,
    CommitColorPickerNextDemoContainer,
    FormColorPickerNextDemoContainer,
    RtlColorPickerNextDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Color Picker Next</h1>
        <p class="text-muted-foreground">
          A colour, picked on an area, sliders, fields, presets or the screen —
          in HSV, HSL, sRGB or OKLCH, held to a gamut. Its value is a CSS
          colour; a form field.
        </p>
        <app-component-badges path="color-picker-next" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-color-picker-next-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          Every part is optional and edits the same colour: an area for two
          channels, a slider for one, a field for the text, an input for a
          channel&apos;s number, presets, the screen&apos;s colour.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Spaces, formats, gamut</h2>
        <p>
          <code scTypeset>space</code> decides the channels:
          <code scTypeset>hsv</code> (hue, saturation, brightness — the
          default), <code scTypeset>hsl</code>,
          <code scTypeset>srgb</code> (red, green, blue),
          <code scTypeset>oklch</code> (lightness, chroma, hue); alpha in each.
          The area takes any two (<code scTypeset>x</code>,
          <code scTypeset>y</code>), a slider any one — painted with CSS, or on
          a canvas. The value is written as the space writes it (hex, hsl(),
          rgb(), oklch()) or as <code scTypeset>format</code> says; any CSS
          colour goes in. The hue is kept through greys and black. OKLCH can
          leave sRGB: <code scTypeset>gamut</code> holds it to sRGB (the
          default), Display P3, or nothing — dragged past it, the value is the
          nearest colour it holds, the parts
          <code scTypeset>data-out-of-gamut</code>; let go, the thumb moves
          there.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Keyboard</h2>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Color Picker Next keys"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Key</th>
                <th scTableHeaderCell>Does (on the area, a slider)</th>
              </tr>
            </thead>
            <tbody scTableBody>
              <tr scTableRow>
                <td scTableCell>
                  <kbd scKbd>←</kbd> <kbd scKbd>→</kbd> <kbd scKbd>↑</kbd>
                  <kbd scKbd>↓</kbd>
                </td>
                <td scTableCell>
                  One step (the area: across and up); with
                  <kbd scKbd>Shift</kbd>, ten
                </td>
              </tr>
              <tr scTableRow>
                <td scTableCell>
                  <kbd scKbd>Page Up</kbd> / <kbd scKbd>Page Down</kbd>
                </td>
                <td scTableCell>A tenth of the range</td>
              </tr>
              <tr scTableRow>
                <td scTableCell>
                  <kbd scKbd>Home</kbd> / <kbd scKbd>End</kbd>
                </td>
                <td scTableCell>Its ends</td>
              </tr>
              <tr scTableRow>
                <td scTableCell>
                  <kbd scKbd>Enter</kbd> / <kbd scKbd>Escape</kbd>
                </td>
                <td scTableCell>
                  In the field: takes the text / puts the value back
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            A group (name it); the area a slider reading its two values
            (&quot;76 %, 96 %&quot;), a slider its value (&quot;120°&quot;) —
            name each, and give your words in
            <code scTypeset>aria-valuetext</code>.
          </li>
          <li>
            The presets: a radio group, each named by you (&quot;Rose&quot;).
            The swatch is decorative: say the colour in text where it matters.
          </li>
          <li>
            The eyedropper is disabled where the browser can&apos;t pick from
            the screen (<code scTypeset>data-unsupported</code>).
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-all-features-color-picker-next-demo-container />
        <app-spaces-color-picker-next-demo-container />
        <app-oklch-color-picker-next-demo-container />
        <app-presets-color-picker-next-demo-container />
        <app-popover-color-picker-next-demo-container />
        <app-disabled-color-picker-next-demo-container />
        <app-read-only-color-picker-next-demo-container />
        <app-commit-color-picker-next-demo-container />
        <app-form-color-picker-next-demo-container />
        <app-rtl-color-picker-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes <code scTypeset>class</code>, merged over its own (cn:
          a later class wins). The corners are the style&apos;s (<code scTypeset
            >colorPicker</code
          >); the eyedropper is its button.
        </p>
        <app-parts-table label="Color Picker Next parts" [parts]="parts" />
        <app-api-table label="ScColorPickerNext inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ColorPickerNextPage {
  private readonly anatomy = {
    imports:
      "import { ScColorPickerNext, ScColorPickerNextArea, ScColorPickerNextChannelInput, ScColorPickerNextEyeDropper, ScColorPickerNextInput, ScColorPickerNextSlider, ScColorPickerNextSwatch, ScColorPickerNextSwatchItem, ScColorPickerNextSwatches } from '@semantic-components/ui';",
    markup: [
      '<div scColorPickerNext aria-label="Brand color" [formField]="form.color">',
      '  <div scColorPickerNextArea aria-label="Color"></div>',
      '  <input scColorPickerNextSlider="hue" aria-label="Hue" />',
      '  <input scColorPickerNextSlider="alpha" aria-label="Opacity" />',
      '  <span scColorPickerNextSwatch></span>',
      '  <input scColorPickerNextInput aria-label="Hex" />',
      '  <input scColorPickerNextChannelInput="red" aria-label="Red" />',
      '  <div scColorPickerNextSwatches aria-label="Presets">',
      '    <button scColorPickerNextSwatchItem="#e11d48"><span class="sr-only">Rose</span></button>',
      '  </div>',
      '  <button scColorPickerNextEyeDropper>…</button>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScColorPickerNext',
      selector: '[scColorPickerNext]',
      description:
        'The colour: value, space, format, gamut; (valueCommit). exportAs: channel(), set(), setColor(), css(), pickFromScreen().',
    },
    {
      name: 'ScColorPickerNextArea',
      selector: 'div[scColorPickerNextArea]',
      description: 'Two channels (x, y): a slider; CSS or a canvas.',
    },
    {
      name: 'ScColorPickerNextSlider',
      selector: 'input[scColorPickerNextSlider]',
      description: 'One channel on a native range; orientation.',
    },
    {
      name: 'ScColorPickerNextInput',
      selector: 'input[scColorPickerNextInput]',
      description: 'The colour as text: any CSS colour, on Enter or when left.',
    },
    {
      name: 'ScColorPickerNextChannelInput',
      selector: 'input[scColorPickerNextChannelInput]',
      description: 'One channel as a number, in its units.',
    },
    {
      name: 'ScColorPickerNextSwatch',
      selector: '[scColorPickerNextSwatch]',
      description: 'The colour, shown; decorative.',
    },
    {
      name: 'ScColorPickerNextSwatches / SwatchItem',
      selector:
        '[scColorPickerNextSwatches], button[scColorPickerNextSwatchItem]',
      description: 'Presets: a radio group of colours.',
    },
    {
      name: 'ScColorPickerNextEyeDropper',
      selector: 'button[scColorPickerNextEyeDropper]',
      description: 'A colour from the screen; data-unsupported elsewhere.',
    },
  ];

  private readonly inputs: ApiInput[] = [
    {
      name: 'value',
      type: 'string',
      default: "''",
      description: 'Two-way, or [formField]: a CSS colour; empty is none.',
    },
    {
      name: 'space',
      type: "'hsv' | 'hsl' | 'srgb' | 'oklch'",
      default: "'hsv'",
      description: 'The channels the parts edit.',
    },
    {
      name: 'format',
      type: "'hex' | 'rgb' | 'hsl' | 'oklch' | null",
      default: 'the space’s',
      description: 'How the value is written.',
    },
    {
      name: 'gamut',
      type: "'srgb' | 'p3' | false",
      default: "'srgb'",
      description: 'The colours it holds.',
    },
    {
      name: 'disabled, readonly, invalid, touched',
      type: 'boolean',
      default: 'false',
      description: 'Bound by [formField].',
    },
  ];
}
