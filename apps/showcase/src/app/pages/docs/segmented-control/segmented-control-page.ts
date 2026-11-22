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
import { DisabledSegmentedControlDemoContainer } from './demos/disabled-segmented-control-demo-container';
import { FormSegmentedControlDemoContainer } from './demos/form-segmented-control-demo-container';
import { IconsSegmentedControlDemoContainer } from './demos/icons-segmented-control-demo-container';
import { ReadOnlySegmentedControlDemoContainer } from './demos/read-only-segmented-control-demo-container';
import { RtlSegmentedControlDemoContainer } from './demos/rtl-segmented-control-demo-container';
import { SegmentedControlUsageDemoContainer } from './demos/segmented-control-usage-demo-container';
import { VerticalSegmentedControlDemoContainer } from './demos/vertical-segmented-control-demo-container';

@Component({
  selector: 'app-segmented-control-page',
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
    SegmentedControlUsageDemoContainer,
    IconsSegmentedControlDemoContainer,
    VerticalSegmentedControlDemoContainer,
    DisabledSegmentedControlDemoContainer,
    ReadOnlySegmentedControlDemoContainer,
    FormSegmentedControlDemoContainer,
    RtlSegmentedControlDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Segmented Control</h1>
        <p class="text-muted-foreground">
          One value from a short row of buttons — List or Grid, a view, a
          setting — an indicator sliding to the one checked. A radio group, in
          the look of the style&apos;s tabs.
        </p>
        <app-component-badges path="segmented-control" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-segmented-control-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          The indicator first, then an item per option: the indicator sits
          behind the checked one, and slides when another is checked.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>The indicator</h2>
        <p>
          Measured from the checked item, in the control:
          <code scTypeset>--sc-segmented-control-indicator-left</code>,
          <code scTypeset>-top</code>, <code scTypeset>-width</code>,
          <code scTypeset>-height</code> (and <code scTypeset>-right</code>,
          <code scTypeset>-bottom</code>) — again when the items resize. It
          doesn&apos;t slide into its first place (<code scTypeset
            >data-activation-direction="none"</code
          >), then slides, saying which way (<code scTypeset>left</code>,
          <code scTypeset>right</code>, <code scTypeset>up</code>,
          <code scTypeset>down</code>); not with reduced motion. While nothing
          is checked, it has no box.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Keyboard</h2>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Segmented Control keys"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Key</th>
                <th scTableHeaderCell>Does</th>
              </tr>
            </thead>
            <tbody scTableBody>
              <tr scTableRow>
                <td scTableCell><kbd scKbd>Tab</kbd></td>
                <td scTableCell>
                  Into the control — the checked item, or the first — and out
                </td>
              </tr>
              <tr scTableRow>
                <td scTableCell>
                  <kbd scKbd>←</kbd> <kbd scKbd>→</kbd> <kbd scKbd>↑</kbd>
                  <kbd scKbd>↓</kbd>
                </td>
                <td scTableCell>
                  The previous / next item, checked (skipping disabled ones;
                  wrapping, unless <code scTypeset>loop</code> is off).
                  Read-only: focus only
                </td>
              </tr>
              <tr scTableRow>
                <td scTableCell>
                  <kbd scKbd>Home</kbd> / <kbd scKbd>End</kbd>
                </td>
                <td scTableCell>The first / last item, checked</td>
              </tr>
              <tr scTableRow>
                <td scTableCell><kbd scKbd>Space</kbd></td>
                <td scTableCell>Checks the item focused</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            A radio group of radio buttons (<code scTypeset>aria-checked</code
            >), named by its field&apos;s label or
            <code scTypeset>aria-label</code>. Icon-only items need
            <code scTypeset>sr-only</code> text.
          </li>
          <li>The indicator is decorative: hidden from screen readers.</li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-icons-segmented-control-demo-container />
        <app-vertical-segmented-control-demo-container />
        <app-disabled-segmented-control-demo-container />
        <app-read-only-segmented-control-demo-container />
        <app-form-segmented-control-demo-container />
        <app-rtl-segmented-control-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes <code scTypeset>class</code>, merged over its own (cn:
          a later class wins). The look is the style&apos;s (<code scTypeset
            >segmentedControl</code
          >, as its tabs: the bar, a tab, the selected tab&apos;s raised look on
          the indicator).
        </p>
        <app-parts-table label="Segmented Control parts" [parts]="parts" />
        <app-api-table label="ScSegmentedControl inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class SegmentedControlPage {
  private readonly anatomy = {
    imports:
      "import { ScSegmentedControl, ScSegmentedControlIndicator, ScSegmentedControlItem } from '@semantic-components/ui';",
    markup: [
      '<div scSegmentedControl [formField]="form.view">',
      '  <div scSegmentedControlIndicator></div>',
      '  <button scSegmentedControlItem value="list">List</button>',
      '  <button scSegmentedControlItem value="grid">Grid</button>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScSegmentedControl',
      selector: 'div[scSegmentedControl]',
      description:
        'The value: role radiogroup. exportAs scSegmentedControl: focus().',
    },
    {
      name: 'ScSegmentedControlIndicator',
      selector: '[scSegmentedControlIndicator]',
      description:
        'Behind the checked item, sliding to it: its box in CSS variables, data-activation-direction.',
    },
    {
      name: 'ScSegmentedControlItem',
      selector: 'button[scSegmentedControlItem]',
      description:
        'A radio button: value, disabled. data-checked, data-unchecked.',
    },
  ];

  private readonly inputs: ApiInput[] = [
    {
      name: 'value',
      type: 'T | null',
      default: 'null',
      description: 'Two-way, or [formField]. null: none checked.',
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: 'In a row or stacked; the arrows move both ways in each.',
    },
    {
      name: 'loop',
      type: 'boolean',
      default: 'true',
      description: 'The arrows wrap.',
    },
    {
      name: 'disabled, readonly, required, invalid, touched',
      type: 'boolean',
      default: 'false',
      description: 'Bound by [formField].',
    },
  ];
}
