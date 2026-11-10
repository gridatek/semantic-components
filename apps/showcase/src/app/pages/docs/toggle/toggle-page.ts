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
import { DisabledToggleDemoContainer } from './demos/disabled-toggle-demo-container';
import { OutlineToggleDemoContainer } from './demos/outline-toggle-demo-container';
import { RtlToggleDemoContainer } from './demos/rtl-toggle-demo-container';
import { SizesToggleDemoContainer } from './demos/sizes-toggle-demo-container';
import { ToggleUsageDemoContainer } from './demos/toggle-usage-demo-container';
import { ToolbarToggleDemoContainer } from './demos/toolbar-toggle-demo-container';
import { WithTextToggleDemoContainer } from './demos/with-text-toggle-demo-container';

@Component({
  selector: 'app-toggle-page',
  imports: [
    Anatomy,
    ToggleUsageDemoContainer,
    OutlineToggleDemoContainer,
    WithTextToggleDemoContainer,
    SizesToggleDemoContainer,
    DisabledToggleDemoContainer,
    ToolbarToggleDemoContainer,
    RtlToggleDemoContainer,
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
        <h1 scHeading>Toggle</h1>
        <p class="text-muted-foreground">
          A button that stays pressed, in the look of the app&apos;s preset.
        </p>
        <app-component-badges path="toggle" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-toggle-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          A button of yours: its icon and text are yours; [(pressed)] keeps its
          state, aria-pressed says it.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            A native button with aria-pressed: announced as a toggle button,
            pressed or not; Tab reaches it, Space and Enter press it.
          </li>
          <li>
            Its name stays the same as it toggles: its text, or an icon with
            sr-only text.
          </li>
          <li>Disabled: out of the Tab order, dimmed.</li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-outline-toggle-demo-container />
        <app-with-text-toggle-demo-container />
        <app-sizes-toggle-demo-container />
        <app-disabled-toggle-demo-container />
        <app-toolbar-toggle-demo-container />
        <app-rtl-toggle-demo-container />
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
          aria-label="Toggle parts"
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
export default class TogglePage {
  protected readonly anatomy = {
    imports: "import { ScToggle } from '@semantic-components/ui';",
    markup: '<button scToggle [(pressed)]="…">…</button>',
  };

  protected readonly parts = [
    {
      name: 'ScToggle',
      selector: 'button[scToggle]',
      description:
        "A button that stays pressed: pressed (two-way); variant ('default', 'outline'); size ('sm', 'default', 'lg'); disabled. In the preset's toggle look.",
    },
  ];
}
