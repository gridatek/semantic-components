import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { KeyboardSelectOnFocusDemoContainer } from './demos/keyboard-select-on-focus-demo-container';
import { SelectOnFocusUsageDemoContainer } from './demos/select-on-focus-usage-demo-container';

@Component({
  selector: 'app-select-on-focus-page',
  imports: [
    PartsTable,
    Anatomy,
    KeyboardSelectOnFocusDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
    SelectOnFocusUsageDemoContainer,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scTypeset>Select On Focus</h1>
        <p class="text-muted-foreground">
          A directive that automatically selects input text on focus.
          Configurable to respond to specific focus origins.
        </p>
        <app-component-badges path="select-on-focus" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-select-on-focus-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          One directive on an input: its text is selected when it gets focus —
          from the keyboard, the mouse, a touch or the program, as you choose.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>How It Works</h2>
        <ul class="text-muted-foreground list-inside list-disc space-y-1">
          <li>
            Uses
            <code>FocusMonitor</code>
            to detect the origin of focus events.
          </li>
          <li>
            When the focus origin matches one of the configured origins and the
            input has a non-empty value, calls
            <code>select()</code>
            to highlight all text.
          </li>
          <li>
            By default, responds to all focus origins (<code>program</code>,
            <code>keyboard</code>, <code>mouse</code>, <code>touch</code>).
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-keyboard-select-on-focus-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p class="text-muted-foreground">A behaviour only, on an input.</p>
        <app-parts-table label="Select On Focus parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class SelectOnFocusPage {
  private readonly anatomy = {
    imports: [
      "import { ScSelectOnFocus } from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<input scSelectOnFocus />',
      '<input scSelectOnFocus="keyboard" />',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScSelectOnFocus',
      selector: 'input[scSelectOnFocus]',
      description:
        "[scSelectOnFocus]: the focus origins that select the text — 'program', 'keyboard', 'mouse', 'touch', one or a list; empty: all of them. Nothing happens while the input is empty.",
    },
  ];
}
