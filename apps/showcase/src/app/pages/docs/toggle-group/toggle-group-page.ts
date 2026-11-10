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
import { DisabledToggleGroupDemoContainer } from './demos/disabled-toggle-group-demo-container';
import { FontWeightToggleGroupDemoContainer } from './demos/font-weight-toggle-group-demo-container';
import { MultipleToggleGroupDemoContainer } from './demos/multiple-toggle-group-demo-container';
import { OutlineToggleGroupDemoContainer } from './demos/outline-toggle-group-demo-container';
import { RtlToggleGroupDemoContainer } from './demos/rtl-toggle-group-demo-container';
import { SingleToggleGroupDemoContainer } from './demos/single-toggle-group-demo-container';
import { SizesToggleGroupDemoContainer } from './demos/sizes-toggle-group-demo-container';
import { SpacingToggleGroupDemoContainer } from './demos/spacing-toggle-group-demo-container';
import { ToggleGroupUsageDemoContainer } from './demos/toggle-group-usage-demo-container';
import { VerticalToggleGroupDemoContainer } from './demos/vertical-toggle-group-demo-container';

@Component({
  selector: 'app-toggle-group-page',
  imports: [
    Anatomy,
    ToggleGroupUsageDemoContainer,
    OutlineToggleGroupDemoContainer,
    SizesToggleGroupDemoContainer,
    SpacingToggleGroupDemoContainer,
    VerticalToggleGroupDemoContainer,
    DisabledToggleGroupDemoContainer,
    FontWeightToggleGroupDemoContainer,
    SingleToggleGroupDemoContainer,
    MultipleToggleGroupDemoContainer,
    RtlToggleGroupDemoContainer,
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
        <h1 scHeading>Toggle Group</h1>
        <p class="text-muted-foreground">
          Toggles sharing one value: one pressed at a time, or several. In the
          look of the app&apos;s preset.
        </p>
        <app-component-badges path="toggle-group" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-toggle-group-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          A group round your buttons, each with its value; the group holds the
          pressed ones — a [formField] or [(value)], an array. Inside a toolbar,
          use a widget group in the toolbar: it shares the toolbar&apos;s arrow
          keys.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            One Tab stop: the arrow keys move between the items (Left and Right
            mirrored right to left; Up and Down when vertical), Home and End to
            the ends; Space and Enter press one.
          </li>
          <li>
            Each item a button with aria-pressed; its name stays the same as it
            toggles — its text, or an icon with sr-only text.
          </li>
          <li>Name the group: aria-label or aria-labelledby.</li>
          <li>
            The keyboard follows Base UI&apos;s toggle group
            (role=&quot;group&quot;, the CDK&apos;s FocusKeyManager), not
            Angular Aria&apos;s Toolbar: a toolbar is its own component
            (scToolbar), with its widget group (scToolbarWidgetGroup) sharing
            the toolbar&apos;s Tab stop and arrow keys. You choose: a toggle
            group on its own, or a toolbar.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-outline-toggle-group-demo-container />
        <app-sizes-toggle-group-demo-container />
        <app-spacing-toggle-group-demo-container />
        <app-vertical-toggle-group-demo-container />
        <app-disabled-toggle-group-demo-container />
        <app-font-weight-toggle-group-demo-container />
        <app-single-toggle-group-demo-container />
        <app-multiple-toggle-group-demo-container />
        <app-rtl-toggle-group-demo-container />
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
          aria-label="Toggle Group parts"
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
export default class ToggleGroupPage {
  protected readonly anatomy = {
    imports:
      "import { ScToggleGroup, ScToggleGroupItem } from '@semantic-components/ui';",
    markup: [
      '<div scToggleGroup [formField]="…" aria-label="…">',
      '  <button scToggleGroupItem value="…">…</button>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScToggleGroup',
      selector: 'div[scToggleGroup]',
      description:
        'role="group"; value: the pressed items\' values, an array (a [formField], or two-way); multiple; variant, size, spacing (2; 0 joins them) and orientation for its items; loopFocus; disabled.',
    },
    {
      name: 'ScToggleGroupItem',
      selector: 'button[scToggleGroupItem]',
      description:
        "A toggle in the group: value (any type), pressed when the group's value includes it (aria-pressed); disabled. In the preset's toggle look.",
    },
  ];
}
