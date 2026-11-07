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
import { FullWidthInputButtonDemoContainer } from './demos/full-width-input-button-demo-container';
import { IconInputButtonDemoContainer } from './demos/icon-input-button-demo-container';
import { InputButtonUsageDemoContainer } from './demos/input-button-usage-demo-container';
import { RtlInputButtonDemoContainer } from './demos/rtl-input-button-demo-container';

@Component({
  selector: 'app-input-button-page',
  imports: [
    Anatomy,
    InputButtonUsageDemoContainer,
    FullWidthInputButtonDemoContainer,
    IconInputButtonDemoContainer,
    RtlInputButtonDemoContainer,
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
        <h1 scHeading>Input Button</h1>
        <p class="text-muted-foreground">
          A button that looks like a text field, to open a search or a command
          palette. In the look of the app&apos;s preset&apos;s input.
        </p>
        <app-component-badges path="input-button" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-input-button-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          A directive on your button; the icon, the text and the shortcut
          (scKbd) are yours.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            A button, not a field: read as one, pressed with Enter or Space.
            What it opens (a dialog, a palette) does the searching.
          </li>
          <li>
            Its name is its text; icon only, give it sr-only text. Name a
            shortcut&apos;s symbols too (⌘: &quot;Command&quot;).
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-full-width-input-button-demo-container />
        <app-icon-input-button-demo-container />
        <app-rtl-input-button-demo-container />
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
          aria-label="Input Button parts"
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
export default class InputButtonPage {
  protected readonly anatomy = {
    imports: "import { ScInputButton } from '@semantic-components/ui';",
    markup: [
      '<button scInputButton>',
      '  <svg …></svg>',
      '  <span class="flex-1">…</span>',
      '  <kbd scKbd>…</kbd>',
      '</button>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScInputButton',
      selector: 'button[scInputButton]',
      description:
        'A button in the preset\'s input look: muted text, its icon sized; type="button".',
    },
  ];
}
