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
import { DisabledNativeSelectNextDemoContainer } from './demos/disabled-native-select-next-demo-container';
import { GroupsNativeSelectNextDemoContainer } from './demos/groups-native-select-next-demo-container';
import { InvalidNativeSelectNextDemoContainer } from './demos/invalid-native-select-next-demo-container';
import { NativeSelectNextUsageDemoContainer } from './demos/native-select-next-usage-demo-container';
import { RtlNativeSelectNextDemoContainer } from './demos/rtl-native-select-next-demo-container';
import { SizesNativeSelectNextDemoContainer } from './demos/sizes-native-select-next-demo-container';

@Component({
  selector: 'app-native-select-next-page',
  imports: [
    Anatomy,
    NativeSelectNextUsageDemoContainer,
    GroupsNativeSelectNextDemoContainer,
    DisabledNativeSelectNextDemoContainer,
    InvalidNativeSelectNextDemoContainer,
    SizesNativeSelectNextDemoContainer,
    RtlNativeSelectNextDemoContainer,
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
        <h1 scHeading>Native Select Next</h1>
        <p class="text-muted-foreground">
          The browser&apos;s own select, in the look of the app&apos;s preset.
        </p>
        <app-component-badges path="native-select-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-native-select-next-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          A real select and its options, in a container beside your chevron. Its
          label, description and errors go round it, in a field.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            A real select: its keyboard, its list and the phone&apos;s picker
            are the browser&apos;s, and read as a combo box.
          </li>
          <li>
            Its name from the field&apos;s label (it takes the field&apos;s id);
            a description and errors are read with it. Without a field, give it
            an aria-label.
          </li>
          <li>The chevron is hidden from screen readers.</li>
          <li>Invalid once left (aria-invalid), with Signal Forms.</li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Native Select or Select</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            Native Select: the browser&apos;s behaviour, light and fast, and the
            phone&apos;s own picker.
          </li>
          <li>
            Select: its list styled as the app, animated, with richer items
            (icons, descriptions) and more ways to interact.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-groups-native-select-next-demo-container />
        <app-disabled-native-select-next-demo-container />
        <app-invalid-native-select-next-demo-container />
        <app-sizes-native-select-next-demo-container />
        <app-rtl-native-select-next-demo-container />
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
          aria-label="Native Select parts"
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
export default class NativeSelectNextPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScNativeSelectNext, ScNativeSelectNextContainer, ScNativeSelectNextIcon,',
      '  ScNativeSelectNextOption, ScNativeSelectNextOptGroup,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scField>',
      '  <label scLabel>…</label>',
      '  <div scNativeSelectNextContainer>',
      '    <select scNativeSelectNext [formField]="…">',
      '      <option scNativeSelectNextOption value="…">…</option>',
      '      <optgroup scNativeSelectNextOptGroup label="…">',
      '        <option scNativeSelectNextOption value="…">…</option>',
      '      </optgroup>',
      '    </select>',
      '    <svg siChevronDownIcon scNativeSelectNextIcon></svg>',
      '  </div>',
      '  <p scFieldErrors></p>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScNativeSelectNext',
      selector: 'select[scNativeSelectNext]',
      description:
        "The browser's select, in the preset's look. size ('default', 'sm'); its id and description from a scField; [formField] on it (disabled and required from the schema); aria-invalid once touched.",
    },
    {
      name: 'ScNativeSelectNextContainer',
      selector: 'div[scNativeSelectNextContainer]',
      description:
        "Around the select and your chevron: as wide as its content (w-full to fill a field), dimmed while the select is disabled; its select's size, for the chevron.",
    },
    {
      name: 'ScNativeSelectNextIcon',
      selector: 'svg[scNativeSelectNextIcon]',
      description:
        'Your chevron (siChevronDownIcon), after the select: at its end, by the preset; hidden from screen readers.',
    },
    {
      name: 'ScNativeSelectNextOption, ScNativeSelectNextOptGroup',
      selector: 'option[…], optgroup[…]',
      description:
        "An option, and a group of them under its label: the system's colours, so the browser's list reads in dark mode too.",
    },
  ];
}
